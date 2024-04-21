import roundRobin from "../../langgraph/workflows/roundRobin"
import generateId from "~/utils/generateId"

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const runtime = 'edge'

export default async function POST(req) {
  const conversationTypeMap = {
    'roundRobin': roundRobin
  }
  try {
    const body = await req.json()
    const { messages = [], agents, conversationSettings = { maxConversationLength: 10 } } = body
    const { recursionLimit = 100, conversationType = 'roundRobin' } = conversationSettings
    const conversationTypeFunction = conversationTypeMap[conversationType]
    const { app, initialState } = await conversationTypeFunction(agents, messages, conversationSettings)

    const textEncoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const output of await app.stream(initialState, { recursionLimit })) {
          if (!output?.__end__) {
            const messages = Object.values(output)[0].messages
            const { content, name } = Object.values(messages)[0].lc_kwargs
            const strContent = JSON.stringify({ role: 'assistant', content, name, id: generateId() })
            const encodedContent = textEncoder.encode(strContent)
            controller.enqueue(encodedContent)
          }
        }
        controller.close()
      }
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Transfer-Encoding': 'chunked'
      }
    })
    //return new StreamingTextResponse(readableStream)
  } catch (error) {
    console.error(error)
  }
}