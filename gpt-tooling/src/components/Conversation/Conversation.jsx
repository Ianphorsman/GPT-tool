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
      // loop forever until the read is done, or the abort controller is triggered
      let incrementalText = '';
      let parsedFirstPacket = false;
      let sentFirstParagraph = false;
      while (true) {
        const { value, done } = await reader.read();

        if (done) break;

        incrementalText += decoder.decode(value, { stream: true });

        // there may be a JSON object at the beginning of the message, which contains the model name (streaming workaround)
        if (!parsedFirstPacket && incrementalText.startsWith('{')) {
          const endOfJson = incrementalText.indexOf('}');
          if (endOfJson > 0) {
            const json = incrementalText.substring(0, endOfJson + 1);
            incrementalText = incrementalText.substring(endOfJson + 1);
            try {
              const parsed = JSON.parse(json);
              setMessage(parsed);
              console.log('chunk', parsed);
              parsedFirstPacket = true;
            } catch (e) {
              // error parsing JSON, ignore
              console.log('Error parsing JSON: ' + e);
            }
          }
        }
        // if the first paragraph (after the first packet) is complete, call the callback
        if (parsedFirstPacket /*&& onFirstParagraph && !sentFirstParagraph*/) {
          let cutPoint = incrementalText.lastIndexOf('\n');
          if (cutPoint < 0)
            cutPoint = incrementalText.lastIndexOf('. ');
          if (cutPoint > 100 && cutPoint < 400) {
            const firstParagraph = incrementalText.substring(0, cutPoint);
            //onFirstParagraph(firstParagraph);
            sentFirstParagraph = true;
          }
          setMessage(incrementalText);
          console.log('parsed inc', incrementalText)
        }
      }
    }
  }

  
  return (
    <section>
      <Button onClick={streamMessage}>Chat</Button>
      <Message>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris dapibus suscipit tellus sit amet semper. Ut euismod ipsum lectus, vel maximus nisi lacinia in. Curabitur nec elit a elit dignissim hendrerit vel non urna. Fusce dictum eleifend nulla, in bibendum libero semper a. Praesent nec augue commodo, iaculis diam id, venenatis arcu. Quisque congue, velit ut lobortis iaculis, urna augue convallis lorem, nec luctus massa tellus vel ex. Donec sit amet lorem sit amet sapien sodales pulvinar. Sed vel ex ut massa gravida imperdiet eget at risus. Suspendisse nec libero nulla.</Message>
      <Message>{message}</Message>
    </section>
  )
}

export default Conversation
