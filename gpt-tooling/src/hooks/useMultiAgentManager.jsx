import { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

const initialAgentId = uuidv4()
const initialSystemPromptId = uuidv4()

export const initialAgentState = {
  name: '',
  initials: '',
  id: initialAgentId,
  model: 'gpt-3.5-turbo',
  customInstructions: {
    promptText: '',
    id: initialSystemPromptId
  },
  maxMessageLength: 1000,
  maxResponses: 10,
  responsesLeft: 10,
  temperature: 100,
  autoRespondTo: []
}

const initialState = {
  agents: {
    [initialAgentId]: {
      ...initialAgentState,
      name: 'Agent1',
      initials: 'A1'
    }
  },
  activeAgent: initialAgentId,
  conversationType: 'chat'
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
            customInstructions: {
              promptText: action.customInstructions
            }
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
      const id = uuidv4()
      return {
        ...state,
        agents: {
          ...state.agents,
          [id]: {
            ...initialAgentState,
            ...action.agent,
            id,
            customInstructions: {
              ...action.agent.customInstructions,
              id: uuidv4()
            }
          }
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
    case 'WILL_AUTO_RESPOND_TO_AGENT':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            autoRespondTo: [...state.agents[action.id].autoRespondTo, action.autoRespondTo]
          }
        }
      }
    case 'CANNOT_AUTO_RESPOND_TO_AGENT':
      return {
        ...state,
        agents: {
          ...state.agents,
          [action.id]: {
            ...state.agents[action.id],
            autoRespondTo: state.agents[action.id].autoRespondTo.filter((agent) => agent !== action.autoRespondTo)
          }
        }
      }
    case 'SET_CONVERSATION_TYPE':
      return {
        ...state,
        conversationType: action.conversationType
      }
    case 'SET_AGENT':
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [state.activeAgent]: __, ...rest } = state.agents
      return {
        ...state,
        agents: {
          ...rest,
          [action.id]: action.agent
        },
        activeAgent: action.id
      }
    case 'SET_AGENTS':
      return {
        ...state,
        agents: action.agents,
        activeAgent: Object.keys(action.agents)[0]
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

  const setWillAutoRespondToAgent = (id, autoRespondTo) => {
    dispatch({ type: 'WILL_AUTO_RESPOND_TO_AGENT', id, autoRespondTo })
  }

  const setCannotAutoRespondToAgent = (id, autoRespondTo) => {
    dispatch({ type: 'CANNOT_AUTO_RESPOND_TO_AGENT', id, autoRespondTo })
  }

  const setConversationType = (conversationType) => {
    dispatch({ type: 'SET_CONVERSATION_TYPE', conversationType })
  }

  const setAgent = (id, agent) => {
    dispatch({ type: 'SET_AGENT', id, agent })
  }

  const setAgents = (agents) => {
    dispatch({ type: 'SET_AGENTS', agents })
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
    setWillAutoRespondToAgent,
    setCannotAutoRespondToAgent,
    activeAgent: state.agents[state.activeAgent],
    conversationType: state.conversationType,
    setConversationType,
    setAgent,
    setAgents
  }
}

export default useMultiAgentManager
