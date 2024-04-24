import React from 'react'

const SideNavigationDesktop = ({ conversations, fetchAllAgentsInConversation }) => {

  return (
    <section className="w-80 p-4 text-center">
      <h2>Conversations</h2>
      <ul>
        {conversations.map((conversation, index) => (
          <li key={index} className="p-2">
            <button onClick={() => fetchAllAgentsInConversation(conversation.id)}>
              {conversation.id}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SideNavigationDesktop