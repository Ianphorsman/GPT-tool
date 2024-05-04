import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents"
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts"

const createAgent = async (llm, tools, systemPrompt) => {
  const prompt = ChatPromptTemplate.fromMessages([
    ["system", systemPrompt],
     new MessagesPlaceholder("messages"),
     new MessagesPlaceholder("agent_scratchpad"),
   ])
  
   const agent = await createOpenAIToolsAgent({ llm, tools, prompt, returnIntermediateSteps: true })
   return AgentExecutor.fromAgentAndTools({ agent, tools, returnOnlyOutputs: false, metadata: { tokenUsage: 'tokenUsage'} })
}

export default createAgent
