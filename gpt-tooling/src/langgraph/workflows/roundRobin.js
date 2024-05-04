import { StateGraph, END } from "@langchain/langgraph"
import { ChatOpenAI } from "@langchain/openai"
import { SystemMessage } from "@langchain/core/messages"
import { RunnableLambda } from "@langchain/core/runnables"
import dummyTool from "../tools/dummyTool"
import convertMessagesToLangChainMessages from "../utils/convertMessagesToLangChainMessages"

const agentNode = async ({ state, llm, name, id, customInstructions }, config) => {
  const result = await llm.invoke([new SystemMessage({ content: customInstructions.promptText, name }), ...state.messages], config)
  const { totalTokens, completionTokens, promptTokens } = result?.response_metadata?.estimatedTokenUsage
  const systemTokens = state.completionTokens.length === 0 ? promptTokens : state.systemTokens
  return {
    messages: [result],
    systemTokens,
    completionTokens: [...state.completionTokens, completionTokens],
    totalTokens,
    responsesLeft: state.responsesLeft - 1
  }
}

const roundRobin = async (agents, messages = [], conversationSettings = {}) => {
  const { maxConversationLength = 10 } = conversationSettings
  const tools = [dummyTool]
  const agentNodes = await Promise.all(agents.map(async ({ temperature, customInstructions, name, maxMessageLength, id, model/*, tools*/ }) => {
    const llm = new ChatOpenAI({
      temperature: temperature / 100,
      maxTokens: maxMessageLength,
      model: model || 'gpt-3.5-turbo',
      streaming: true
    })

    const callModel = async (state, config) => await agentNode({
      state,
      llm,
      name,
      id,
      customInstructions
    }, config)
    return new RunnableLambda({ func: callModel })
  }))
  const agentState = {
    messages: {
      value: (x, y) => x.concat(y),
      default: () => [],
    },
    systemTokens: 0,
    totalTokens: 0,
    completionTokens: [],
    responsesLeft: maxConversationLength || 10
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
  workflow.setEntryPoint(`agent1`)
  agentNodes.forEach((_, index) => {
    const nextNode = index + 1 === agentNodes.length ? 1 : index + 2
    workflow.addConditionalEdges(`agent${index + 1}`, shouldContinue, { continue: `agent${nextNode}`, end: END })
  })
  const app = workflow.compile()
  const initialState = {
    messages: convertMessagesToLangChainMessages(messages),
    systemTokens: 0,
    completionTokens: [],
    totalTokens: 0,
    responsesLeft: maxConversationLength || 10
  }
  return { app, initialState }
}

export default roundRobin
