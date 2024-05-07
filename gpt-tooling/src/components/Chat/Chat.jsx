import MarkdownRenderer from '../MarkdownRenderer'
import { AGENT_COLORS } from '~/constants'

const Chat = ({
  messages,
  agents
}) => {
  
  return (
    <section className="flex self-center w-full overflow-y-scroll" style={{ height: 'calc(100% - 5rem)', maxHeight: 'calc(100vh - 5rem)' }}>
      <div className="w-full">
        {messages.filter(({ role }) => role !== 'system').map(({ content, id, role, generated_by }) => {
          const backgroundStyle = role === 'user' ? 'bg-neutral' : 'bg-ghost'
          const agentColor = AGENT_COLORS[Object.keys(agents).indexOf(generated_by) % AGENT_COLORS.length] || backgroundStyle

          return (
            <div key={id} className={`w-full flex justify-center relative ${agentColor}`}>
              {/*<div className="self-center absolute left-6 prose-sm">{agents[generated_by]?.name}</div>*/}
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
