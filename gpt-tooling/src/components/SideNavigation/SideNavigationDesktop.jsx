import React from 'react'
import SearchDropdownFinder from '../SearchDropdownFinder'
import mapAgents from '~/utils/mapAgents'
import { searchMessages } from '~/utils/supabase/queries'

const SideNavigationDesktop = ({
  conversations,
  fetchAllAgentsInConversation,
  fetchAllMessagesInConversation,
  setMessages,
  setAgents,
  supabase,
  userId
}) => {

  const handleConversationClick = async ({ supabase, id: conversation_id }) => {
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
    <section className="w-80 p-4 flex flex-col">
      <h2 className="pl-3">Conversations</h2>
      <SearchDropdownFinder
        userId={userId}
        onSearch={searchMessages}
        onSelect={handleConversationClick}
        inputStyles="my-2"
        placeholder="Search messages..."
      />
      <ul className="overflow-y-scroll flex-1">
        {conversations.map((conversation, index) => (
          <li key={index} className="p-2 pl-3">
            <button onClick={() => handleConversationClick({ supabase, id: conversation.id})}>
              {conversation.title || 'Untitled'}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SideNavigationDesktop