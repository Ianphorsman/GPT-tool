const createCallModelFunc = (model) => {
  const callModel = async (
    state,
    config
  ) => {
    const { messages, responsesLeft } = state
    const response = await model.invoke(messages, config)
    // We return a list, because this will get added to the existing list
    return {
      messages: [response],
      responsesLeft: responsesLeft - 1
    }
  }
  return callModel
}

export default createCallModelFunc
