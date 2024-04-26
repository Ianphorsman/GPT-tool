import { StateGraph, END } from "@langchain/langgraph"
import { ChatOpenAI } from "@langchain/openai"
import { AIMessage } from "@langchain/core/messages"
import dummyTool from "../tools/dummyTool"
import convertMessagesToLangChainMessages from "../utils/convertMessagesToLangChainMessages"
import createAgent from "../utils/createAgent"

const agentNode = async ({ state, agent, name, id }, config) => {
  const result = await agent.invoke(state, config)
  return {
    messages: [
      new AIMessage({ content: result.output, name, id })
    ],
    responsesLeft: state.responsesLeft - 1
  }
}

const roundRobin = async (agents, messages = [], conversationSettings = {}) => {
  const { maxConversationLength = 10 } = conversationSettings
  const tools = [dummyTool]
  const agentNodes = await Promise.all(agents.map(async ({ temperature, customInstructions, name, maxMessageLength, id/*, tools*/ }) => {
    const model = new ChatOpenAI({
      temperature: temperature / 100,
      streaming: true,
      maxTokens: maxMessageLength
    })
    const agent = await createAgent(model, tools, customInstructions.promptText || '')
    return async (state, config) => await agentNode({
      state,
      agent,
      name,
      id
    }, config)
  }))
  const agentState = {
    messages: {
      value: (x, y) => x.concat(y),
      default: () => [],
    },
    responsesLeft: maxConversationLength || 10
  }
  const shouldContinue = (state) => {
    const { responsesLeft } = state;
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
    responsesLeft: maxConversationLength || 10
  }
  return { app, initialState }
}

/*
for await (const output of await app.stream(initialState, { recursionLimit })) {
  console.log("output", output)
  console.log("-----\n");
}
*/

export default roundRobin
