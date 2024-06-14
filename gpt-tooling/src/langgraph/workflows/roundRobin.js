import { StateGraph, END } from "@langchain/langgraph"
import { ChatOpenAI } from "@langchain/openai"
import { SystemMessage } from "@langchain/core/messages"
import { RunnableLambda } from "@langchain/core/runnables"
import dummyTool from "../tools/dummyTool"
import convertMessagesToLangChainMessages from "../utils/convertMessagesToLangChainMessages"

const agentNode = async ({ state, llm, name, customInstructions, maxContextWindow, id }, config) => {
  const totalTokens = state.messages[state.messages.length - 1]?.response_metadata?.estimatedTokenUsage?.totalTokens ?? 0
  const maxTokens = Math.min(1000, Math.abs(maxContextWindow - totalTokens))
  const model = llm({ maxTokens })
  const result = await model.invoke([new SystemMessage({ content: customInstructions.promptText, name }), ...state.messages], config)
  result.generated_by = id
  return {
    messages: [result],
    responsesLeft: state.responsesLeft - 1
  }
}

const roundRobin = async (agents, messages = [], conversationSettings = {}) => {
  const { maxConversationLength = 20 } = conversationSettings
  const tools = [dummyTool]
  const agentNodes = await Promise.all(agents.map(async ({ temperature, customInstructions, name, maxMessageLength, maxContextWindow, id, model/*, tools*/ }) => {
    const llm = ({ maxTokens }) => {
      return new ChatOpenAI({
        temperature: temperature / 100,
        maxTokens: Math.min(maxTokens, maxMessageLength),
        model: model || 'gpt-3.5-turbo-0613',
        streaming: true,
        name
      })
    }

    const callModel = async (state, config) => await agentNode({
      state,
      llm,
      name,
      id,
      customInstructions,
      maxContextWindow: maxContextWindow || 4096
    }, config)
    return new RunnableLambda({ func: callModel })
  }))
  const agentState = {
    messages: {
      value: (x, y) => {
        const newMessages = x.concat(y)
        if (newMessages.length === 1) {
          return newMessages
        }
        const lastMessageObj = y.find(({ response_metadata }) => response_metadata.estimatedTokenUsage.totalTokens !== undefined)
        const { totalTokens } = lastMessageObj?.response_metadata?.estimatedTokenUsage || {}
        const tokenThreshold = 4096

        if (totalTokens < tokenThreshold) {
          return newMessages
        }
        // console.log('Threshold exceeded', totalTokens, tokenThreshold, x.length)
        let sliceIndex = 0
        let tokensToRemove = totalTokens - tokenThreshold
        // let tokensRemoved = 0

        while (tokensToRemove >= 0) {
          sliceIndex += 1
          const nextTokenUsage = newMessages[sliceIndex].response_metadata.estimatedTokenUsage.totalTokens
          tokensToRemove -= nextTokenUsage
          // tokensRemoved += nextTokenUsage
        }

        const ret = newMessages.slice(sliceIndex)
        // not sure if this will be necessary in the future
        /*.map((message, idx) => ({
          ...message,
          response_metadata: {
            ...message.response_metadata,
            estimatedTokenUsage: {
              ...message.response_metadata.estimatedTokenUsage,
              totalTokens: message.response_metadata.estimatedTokenUsage.totalTokens - tokensRemoved - (idx * 4)
            }
          }
        }))*/
        // console.log('RET', ret.length)
        return ret
      },
      default: () => [],
    },
    responsesLeft: maxConversationLength || 30
  }
  const shouldContinue = (state) => {
    const { responsesLeft } = state
    if (responsesLeft <= 0) {
      return "end"
    }
    return "continue"
  }
  const workflow = new StateGraph({
    channels: agentState
  })
  agentNodes.forEach((node, index) => {
    workflow.addNode(`agent${index + 1}`, node)
  })

  workflow.addEdge("__start__", `agent1`)
  agentNodes.forEach((_, index) => {
    const nextNode = index + 1 === agentNodes.length ? 1 : index + 2
    workflow.addConditionalEdges(`agent${index + 1}`, shouldContinue, { continue: `agent${nextNode}`, end: END })
  })
  const app = workflow.compile()
  const initialState = {
    messages: convertMessagesToLangChainMessages(messages),
    responsesLeft: maxConversationLength || 30
  }
  return { app, initialState }
}

export default roundRobin
