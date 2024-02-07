import { ChatBubble } from 'react-daisyui'

/* const roleConfig = {
  user: {
    avatar: '/user.png',
    end: true,
    letters: 'U'
  },
  assistant: {
    avatar: '/assistant.png',
    end: false,
    letters: 'A'
  }
} */

const Chat = ({
  messages
}) => {
  
  return (
    <section className="p-4 flex self-center w-full max-w-prose overflow-y-scroll" style={{ height: 'calc(80vh - 1rem)' }}>
      <div className="max-w-prose w-full">
        {messages.filter(({ role }) => role !== 'system').map(({ role, content, createdAt, id }) => {
          const timestamp = new Date(createdAt).toLocaleTimeString()
          return (
            <div className="relative" key={id}>
              <ChatBubble end={role === 'user' ? true : false}>
                <ChatBubble.Header>
                  {role}
                </ChatBubble.Header>
                <ChatBubble.Message>{content}</ChatBubble.Message>
                <ChatBubble.Footer>
                  <ChatBubble.Time>{timestamp}</ChatBubble.Time>
                </ChatBubble.Footer>
              </ChatBubble>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Chat
