import { ChatOpenAI } from "@langchain/openai"
import { convertToOpenAIFunction } from "@langchain/core/utils/function_calling"

const createOpenAIModel = (tools, modelOpts = {}) => {
  const model = new ChatOpenAI({
    temperature: 0,
    streaming: true,
    ...modelOpts
  })

  const toolsAsOpenAIFunctions = tools.map((tool) =>
    convertToOpenAIFunction(tool)
  )
  return model.bind({
    functions: toolsAsOpenAIFunctions,
  })
}

export default createOpenAIModel
