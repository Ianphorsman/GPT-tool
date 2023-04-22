import { useState } from 'react'
import clsx from 'clsx'
import Message from '../Message'
import Button from '../Button/Button'
import Prompter from '../Prompter'

const Conversation = () => {
  const [message, setMessage] = useState('')
  const [prompt, setPrompt] = useState('')
  const streamMessage = async () => {
    const response = await fetch('/api/openai/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({
        stream: true,
        messages: [{ role: 'user', content: prompt }]
      })
    })
    if (response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const nextChunk = decoder.decode(value, { stream: true });
        console.log('nextChunk', nextChunk)
        if (nextChunk.startsWith('{')) {
          try {
            const parsed = JSON.parse(nextChunk)
            setMessage(prev => `${prev}${parsed.choices[0].delta.content}`)
          } catch (e) {
            console.log('Error parsing JSON: ' + e);
          }
        }
      }
    }
  }

  const conversationSectionStyles = clsx(
    'flex',
    'flex-col',
    'h-full',
    'justify-between'
  )
  
  return (
    <section className={conversationSectionStyles}>
      <Message>{message}</Message>
      <Prompter onChange={(e) => setPrompt(e.target.value)} onSubmit={streamMessage} />
    </section>
  )
}

export default Conversation
