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

  return {
    model,
    setModel,
    customInstructions,
    setCustomInstructions
  }
}

export default useAgent
