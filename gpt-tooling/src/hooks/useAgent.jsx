/* eslint-disable */
import { useState } from 'react'

const useAgent = ({
  name = '',
  id = '',
  defaultModel = 'gpt-3.5-turbo',
  systemMessage = ''
}) => {
  const [model, setModel] = useState(defaultModel)
  const [customInstructions, setCustomInstructions] = useState(systemMessage)
  const [maxMessageLength, setMaxMessageLength] = useState(1000)
  const [maxResponses, setMaxResponses] = useState(10)
  const [responsesLeft, setResponsesLeft] = useState(10)

  return {
    model,
    setModel,
    customInstructions,
    setCustomInstructions,
    maxMessageLength,
    setMaxMessageLength,
    maxResponses,
    setMaxResponses,
    responsesLeft,
    setResponsesLeft
  }
}

export default useAgent
