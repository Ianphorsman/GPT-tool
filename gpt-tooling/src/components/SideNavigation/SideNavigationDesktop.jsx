import React from 'react'
import mapAgents from '~/utils/mapAgents'

const SideNavigationDesktop = ({
  conversations,
  fetchAllAgentsInConversation,
  fetchAllMessagesInConversation,
  setMessages,
  setAgents,
  supabase
}) => {

  const handleConversationClick = async (conversation_id) => {
    const [agents, messages] = await Promise.allSettled([
      fetchAllAgentsInConversation({ supabase, conversation_id }),
      fetchAllMessagesInConversation({ supabase, conversation_id })
    ])
    if (agents.value.length > 0) {
      setAgents(mapAgents(agents.value))
    }
    setMessages(messages.value)
  }

  return (
    <section className="w-80 p-4 text-center">
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation, index) => (
          <li key={index} className="p-2">
            <button onClick={() => handleConversationClick(conversation.id)}>
              {conversation.title || 'Untitled'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SideNavigationDesktop