import { FunctionMessage } from "@langchain/core/messages"

const createCallToolFunc = () => {
  const callTool = async (
    state,
    config
  ) => {
    const action = _getAction(state)
    // We call the tool_executor and get back a response
    const response = await toolExecutor.invoke(action, config)
    // We use the response to create a FunctionMessage
    const functionMessage = new FunctionMessage({
      content: response,
      name: action.tool,
    })
    // We return a list, because this will get added to the existing list
    return { messages: [functionMessage], responsesLeft: state.responsesLeft }
  }
  return callTool
}

export default createCallToolFunc
