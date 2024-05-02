// Language Agent Tree Search
import { StateGraph, END } from "@langchain/langgraph"
import { ChatOpenAI } from "@langchain/openai"
import { AIMessage } from "@langchain/core/messages"
import dummyTool from "../tools/dummyTool"
import convertMessagesToLangChainMessages from "../utils/convertMessagesToLangChainMessages"
import createAgent from "../utils/createAgent"
import treeNode from "../nodes/treeNode"

const agentNode = async ({ state, agent, name, id }, config) => {
  const result = await agent.invoke(state, config)
  return {
    messages: [
      new AIMessage({ content: result.output, name, id })
    ],
    responsesLeft: state.responsesLeft - 1
  }
}

const lats = async (agents, messages = [], conversationSettings = {}) => {
  const { maxConversationLength = 10 } = conversationSettings
  const tools = [dummyTool]
  const [agent] = agents
  const createStartNode = async (agent) => {
    const { temperature, customInstructions, name, maxMessageLength, id/*, tools*/ } = agent
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
  }
  const startNode = await createStartNode(agent)


  const treeState = {}

  const workflow = new StateGraph({
    channels: treeState
  })

  workflow.addNode('start', startNode)
}
