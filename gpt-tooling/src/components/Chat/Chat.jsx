import MarkdownRenderer from '../MarkdownRenderer'

const Chat = ({
  messages
}) => {
  
  return (
    <section className="flex self-center w-full overflow-y-scroll" style={{ height: 'calc(100% - 5rem)' }}>
      <div className="w-full">
        {messages.filter(({ role }) => role !== 'system').map(({ content, id, role }) => {
          // const timestamp = new Date(createdAt).toLocaleTimeString()
          const backgroundStyle = role === 'user' ? 'bg-neutral' : 'bg-ghost'
          return (
            <div key={id} className={`w-full flex justify-center ${backgroundStyle}`}>
              <div className="w-full max-w-prose py-3">
                <MarkdownRenderer id={id}>{content}</MarkdownRenderer>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Chat
