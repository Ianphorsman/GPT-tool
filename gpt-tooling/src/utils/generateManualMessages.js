

const generateManualMessages = async (e, payload, setMessagesFunc, setIsLoadingFunc) => {
  e.preventDefault()
  setIsLoadingFunc(true)
  const response = await fetch("/api/graph", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Experimental-Stream-Data": true,
      "Accepts": "text/event-stream"
    },
    body: JSON.stringify({
      model: activeAgent.model,
      temperature: activeAgent.temperature / 100,
      max_tokens: Number(activeAgent.maxMessageLength),
      messages: [{ role: 'user', content: input }],
      agents,
      ...payload.options.body
    }),
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  // This data is a ReadableStream
  const data = response.body
  if (!data) {
    return
  }

  const reader = data.getReader()
  const decoder = new TextDecoder()

  let done = false
  while (!done) {
    const { value, done: doneReading } = await reader.read()
    done = doneReading
    const chunkValue = decoder.decode(value)
    let parsedValue
    try {
      parsedValue = JSON.parse(chunkValue)
      setMessagesFunc(messages => [
        ...(messages ?? []),
        parsedValue
      ])
    } catch (e) {
      console.error('Error parsing', e)
    }
  }
  setIsLoadingFunc(false)
}

export default generateManualMessages
