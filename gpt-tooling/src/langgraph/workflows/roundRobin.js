import { StateGraph, END } from "@langchain/langgraph"
import { ChatOpenAI } from "@langchain/openai"
import { HumanMessage } from "@langchain/core/messages"
import dummyTool from "../tools/dummyTool"
import convertMessagesToLangChainMessages from "../utils/convertMessagesToLangChainMessages"
import createAgent from "../utils/createAgent"

const agentNode = async ({ state, agent, name }, config) => {
  const result = await agent.invoke(state, config)
  return {
    messages: [
      new HumanMessage({ content: result.output, name })
    ],
    responsesLeft: state.responsesLeft - 1
  }
}

const roundRobin = async (agents, messages = [], conversationSettings = {}) => {
  const { maxConversationLength = 10 } = conversationSettings
  const tools = [dummyTool]
  const agentNodes = agents.map(({ temperature, systemPrompt, name/*, tools*/ }) => {
    const model = new ChatOpenAI({ temperature, streaming: true })
    const agent = await createAgent(model, tools, systemPrompt)
    return async (state, config) => await agentNode({
      state,
      agent,
      name
    }, config)
  })
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
    const nextNode = index + 2 === agentNodes.length ? 1 : index + 2
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
