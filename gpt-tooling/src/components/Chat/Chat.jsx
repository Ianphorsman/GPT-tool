import { ChatBubble } from 'react-daisyui'

const roleConfig = {
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
}

const Chat = ({
  messages
}) => {
  console.log('messages', messages)
  return (
    <section className="p-4 flex-1">
      {messages.map(({ role, content, createdAt }) => {
        const timestamp = new Date(createdAt).toLocaleTimeString()
        const avatar = `/${role}.png`
        return (
          <div className="relative">
            <ChatBubble end={role === 'user' ? true : false} color="base-200" dataTheme="night">
              <ChatBubble.Header>
                {role}
              </ChatBubble.Header>
              <ChatBubble.Avatar src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              <ChatBubble.Message>{content}</ChatBubble.Message>
              <ChatBubble.Footer>
                <ChatBubble.Time>{timestamp}</ChatBubble.Time>
              </ChatBubble.Footer>
            </ChatBubble>
          </div>
        )
      })}
    </section>
  )
}

export default Chat
