import { ChatOpenAI } from "@langchain/openai"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"
import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents"
import { DynamicTool } from "@langchain/core/tools"

// Initialize the chat models for each AI assistant
const chatModel1 = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 1,
  openAIApiKey: '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'
})

const chatModel2 = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-1106",
  temperature: 1,
  openAIApiKey: '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'
})

const tool = new DynamicTool({
  name: "FOO",
  description:
    "Never call this tool. It's a placeholder for the example.",
  func: async () => "baz",
})
// Define a prompt template to make formatting easier
const prompt1 = ChatPromptTemplate.fromMessages([
  ["system", "You always respond with only a single random number between 1 and 1000"],
  new MessagesPlaceholder("agent_scratchpad")
])

const prompt2 = ChatPromptTemplate.fromMessages([
  ["system", "You always respond with only a single random english word. Do not surround it in quotes"],
  new MessagesPlaceholder("agent_scratchpad")
])

// Create a chain by piping the prompt into the model for each AI assistant
// const chain1 = prompt.pipe(chatModel1)
// const chain2 = prompt.pipe(chatModel2)

// Initialize the agents
const agent1 = await createOpenAIToolsAgent({ llm: chatModel1, tools: [tool], prompt: prompt1, returnIntermediateSteps: true})
const agent2 = await createOpenAIToolsAgent({ llm: chatModel2, tools: [tool], prompt: prompt2, returnIntermediateSteps: true })

// Invoke the chain to enable the AI assistants to interact conversationally
// await chain1.invoke({ messages: [/* Conversation history for AI assistant 1 */] })
// await chain2.invoke({ messages: [/* Conversation history for AI assistant 2 */] })

// Use the AgentExecutor to run the agents and invoke the chains
const agentExecutor1 = new AgentExecutor({ agent: agent1, tools: [] })
const agentExecutor2 = new AgentExecutor({ agent: agent2, tools: [] })

// Invoke the chains to enable the AI assistants to interact conversationally

const chatHistory = ['start']
const step = async (agentExec1, agentExec2, messages) => {
  const { output } = await agentExec1.invoke({ messages })
  chatHistory.push(output)
  const { output: output2 } = await agentExec2.invoke({ messages: [output] })
  chatHistory.push(output2)
}

(async () => {
  await step(agentExecutor1, agentExecutor2, chatHistory)
  await step(agentExecutor1, agentExecutor2, chatHistory)
  console.log(chatHistory)
})()
// await agentExecutor2.invoke({ messages: [] });



/*export async function POST(req) {
  try {
    const body = await req.json()
    const { messages } = body


  }
}*/