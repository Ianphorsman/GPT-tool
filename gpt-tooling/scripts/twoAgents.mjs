import { StateGraph, END } from "@langchain/langgraph"
import { ChatOpenAI } from "@langchain/openai"
import { HumanMessage } from "@langchain/core/messages"
import { DynamicTool } from "@langchain/core/tools"
import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"

const createAgent = async (llm, tools, systemPrompt) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
     new MessagesPlaceholder("messages"),
     new MessagesPlaceholder("agent_scratchpad"),
   ])
   const agent = await createOpenAIToolsAgent({ llm, tools, prompt })
   return new AgentExecutor({ agent, tools })
}

const agentNode = async ({ state, agent, name }, config) => {
  const result = await agent.invoke(state, config)
  return {
    messages: [
      new HumanMessage({ content: result.output, name })
    ],
    responsesLeft: state.responsesLeft - 1
  }
}

const dummyTool = new DynamicTool({
  name: "FOO",
  description:
    "Never call this tool. It's a placeholder for the example.",
  func: async () => "baz",
})
const tools = [dummyTool]

const model1 = new ChatOpenAI({ temperature: 1, streaming: true })
const model2 = new ChatOpenAI({ temperature: 1, streaming: true })

const agent1 = await createAgent(model1, tools, "You always respond with only a single random number between 1 and 1000")
const agent2 = await createAgent(model2, tools, "You always respond with only a single random english word. Do not surround it in quotes")

const agent1Node = async (state, config) => await agentNode({
  state,
  agent: agent1,
  name: "agent1"
}, config)

const agent2Node = async (state, config) => await agentNode({
  state,
  agent: agent2,
  name: "agent2"
}, config)

const agentState = {
  messages: {
    value: (x, y) => x.concat(y),
    default: () => [],
  },
  responsesLeft: 10
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

workflow.addNode("agent1", agent1Node)
workflow.addNode("agent2", agent2Node)

workflow.setEntryPoint("agent1")

workflow.addConditionalEdges("agent1", shouldContinue, { continue: "agent2", end: END })
workflow.addConditionalEdges("agent2", shouldContinue, { continue: "agent1", end: END })

const app = workflow.compile()

const initialState = {
  messages: [],
  responsesLeft: 10
}

for await (const output of await app.stream(initialState, { recursionLimit: 100 })) {
  console.log("output", output)
  console.log("-----\n");
}