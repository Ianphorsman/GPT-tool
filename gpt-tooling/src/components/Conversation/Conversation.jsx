import { useState } from 'react'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import Message from '../Message'
import Prompter from '../Prompter'

const Conversation = () => {
  const [conversation, setConversation] = useState([])
  const [message, setMessage] = useState('')
  const [prompt, setPrompt] = useState('')

  const streamMessage = async () => {
    const abortController = new AbortController()

    const response = await fetch('/api/openai/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({
        stream: true,
        messages: [{ role: 'user', content: prompt }]
      }),
      signal: abortController.signal
    })

    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      setConversation((prev) => [
        ...prev,
        (message.length > 0 && { role: 'assistant', content: message, id: uuidv4() }),
        { role: 'user', content: prompt, id: uuidv4() },
      ], () => setMessage(''))
      let assistantMessage = ''
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const nextChunk = decoder.decode(value, { stream: true });
        if (nextChunk.startsWith('{')) {
          try {
            const parsed = JSON.parse(nextChunk)
            assistantMessage += parsed.choices[0].delta.content
            setMessage(assistantMessage)
          } catch (e) {
            console.log('Error parsing JSON: ' + e,'Chunk: ', nextChunk);
          }
        }
      }
    }
  }

  const conversationSectionStyles = clsx(
    'flex',
    'flex-col',
    'h-full',
    'justify-between',
    'pb-2',
    'flex-grow'
  )

  const roleStyleMap = {
    assistant: 'bg-transparent',
    user: 'bg-slate-800',
    system: 'bg-indigo-900'
  }
  
  return (
    <section className={conversationSectionStyles}>
      <div>
        {conversation.filter(Boolean).map(({ role, content, id }) => {
          return (
            <Message key={id} bgColor={roleStyleMap[role]}>{content}</Message>
          )
        })}
        <Message isStreaming={false} bgColor="bg-transparent">{message}</Message>
      </div>
      <div>
        <Prompter
          onChange={(e) => setPrompt(e.target.value)}
          onSubmit={streamMessage}
        />
      </div>
    </section>
  )
}

export default Conversation
