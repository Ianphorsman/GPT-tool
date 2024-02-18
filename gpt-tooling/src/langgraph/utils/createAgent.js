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

export default createAgent
