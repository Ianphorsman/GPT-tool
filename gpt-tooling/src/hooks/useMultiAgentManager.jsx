import { useReducer } from 'react'

export const initialAgentState = {
  name: '',
  initials: '',
  id: null,
  model: 'gpt-3.5-turbo',
  customInstructions: '',
  maxMessageLength: 1000,
  maxResponses: 10,
  responsesLeft: 10,
  temperature: 1
}

const initialState = {
  agents: {
    1: {
      ...initialAgentState,
      name: 'agent1',
      initials: 'A1',
      id: 1
    }
  },
  activeAgent: 1
}

const multiAgentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MODEL':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            model: action.model
          }
        }
      }
    case 'SET_CUSTOM_INSTRUCTIONS':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            customInstructions: action.customInstructions
          }
        }
      }
    case 'SET_MAX_MESSAGE_LENGTH':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            maxMessageLength: action.maxMessageLength
          }
        }
      }
    case 'SET_MAX_RESPONSES':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            maxResponses: action.maxResponses
          }
        }
      }
    case 'SET_RESPONSES_LEFT':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            responsesLeft: action.responsesLeft
          }
        }
      }
    case 'SET_TEMPERATURE':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            temperature: action.temperature
          }
        }
      }
    case 'ADD_AGENT':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: action.agent
        }
      }
    case 'REMOVE_AGENT':
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [action.id]: _, ...agents } = state.agents
      return {
        ...state,
        agents
      }
    case 'SET_ACTIVE_AGENT':
      return {
        ...state,
        activeAgent: action.id
      }
    default:
      return state
  }
}

const useMultiAgentManager = () => {
  const [state, dispatch] = useReducer(multiAgentReducer, initialState)

  const setModel = (id, model) => {
    dispatch({ type: 'SET_MODEL', id, model })
  }

  const setCustomInstructions = (id, customInstructions) => {
    dispatch({ type: 'SET_CUSTOM_INSTRUCTIONS', id, customInstructions })
  }

  const setMaxMessageLength = (id, maxMessageLength) => {
    dispatch({ type: 'SET_MAX_MESSAGE_LENGTH', id, maxMessageLength })
  }

  const setMaxResponses = (id, maxResponses) => {
    dispatch({ type: 'SET_MAX_RESPONSES', id, maxResponses })
  }

  const setResponsesLeft = (id, responsesLeft) => {
    dispatch({ type: 'SET_RESPONSES_LEFT', id, responsesLeft })
  }

  const setTemperature = (id, temperature) => {
    dispatch({ type: 'SET_TEMPERATURE', id, temperature })
  }

  const addAgent = (id, agent) => {
    dispatch({ type: 'ADD_AGENT', id, agent })
  }

  const removeAgent = (id) => {
    dispatch({ type: 'REMOVE_AGENT', id })
  }

  const setActiveAgent = (id) => {
    dispatch({ type: 'SET_ACTIVE_AGENT', id })
  }

  return {
    agents: state.agents,
    setModel,
    setCustomInstructions,
    setMaxMessageLength,
    setMaxResponses,
    setResponsesLeft,
    setTemperature,
    addAgent,
    removeAgent,
    setActiveAgent,
    activeAgent: state.agents[state.activeAgent]
  }
}

export default useMultiAgentManager
