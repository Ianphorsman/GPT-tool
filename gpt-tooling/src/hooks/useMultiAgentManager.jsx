import { useState, useMemo } from 'react'

const useMultiAgentManager = ({

}) => {
  const [agents, setAgents] = useState([])
  const callbacks = useMemo(
    () => ({
      addAgent: (agent) => {
        setAgents(prev => [...prev, agent])
      },
      removeAgent: (agent) => {
        setAgents(prev => prev.filter(a => a !== agent))
      }
    }),
    []
  )
  return {
    agents,
    ...callbacks
  }
}

export default useMultiAgentManager
