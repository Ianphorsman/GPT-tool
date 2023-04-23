import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { v4 as uuidv4 } from 'uuid'
import Message from '../Message'
import Prompter from '../Prompter'

const Conversation = () => {
  const [conversation, setConversation] = useState([])
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
            //setMessage(prev => `${prev}${parsed.choices[0].delta.content}`)
          } catch (e) {
            console.log('Error parsing JSON: ' + e,'Chunk: ', nextChunk);
          }
        }
        /*if (nextChunk.includes('DONE')) {
          setConversation(prev => [...prev, { role: 'assistant', content: message, id: uuidv4() }])
        }*/
      }
    }
  }

  const conversationSectionStyles = clsx(
    'flex',
    'flex-col',
    'h-full',
    'justify-between',
    'pb-2'
  )
  
  return (
    <section className={conversationSectionStyles}>
      <div>
        {conversation.map(({ role, content, id }) => {
          return (
            <Message key={id}>{content}</Message>
          )
        })}
        <Message isStreaming={false}>{message}</Message>
      </div>
      <Prompter
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={streamMessage}
      />
    </section>
  )
}

export default Conversation
