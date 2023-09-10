import { useState } from 'react'
import useAbilitiesState from './useAbilitiesState'

const models = {
  'gpt-4': 'gpt-4', 
  'gpt-4-0314': 'gpt-4-0314', 
  'gpt-4-32k': 'gpt-4-32k',
  'gpt-4-32k-0314': 'gpt-4-32k-0314',
  'gpt-3.5-turbo': 'gpt-3.5-turbo',
  'gpt-3.5-turbo-0301': 'gpt-3.5-turbo-0301'
}

const useAgent = ({
  model = 'gpt-3.5-turbo-0301',
  systemMessage,
  abilities = {
    hasLongTermMemory: false
  },
  plugins
}) => {
  const [model, setModel] = useState('')
  const [systemMessage, setSystemMessage] = useState('')
  const abilities = useAbilitiesState(abilities)

  return {}
}

export default useAgent
