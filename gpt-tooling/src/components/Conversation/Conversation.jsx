import { useState } from 'react'
import clsx from 'clsx'
import Message from '../Message'
import Button from '../Button/Button'

const Conversation = () => {
  const [message, setMessage] = useState('')
  const streamMessage = async () => {
    const response = await fetch('/api/openai/chat/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({ stream: true })
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

  
  return (
    <section>
      <Button onClick={streamMessage}>Chat</Button>
      <Message>{message}</Message>
    </section>
  )
}

export default Conversation
