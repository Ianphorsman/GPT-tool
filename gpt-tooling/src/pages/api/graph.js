import roundRobin from "../../langgraph/workflows/roundRobin"
import generateId from "~/utils/generateId"
import upsert from "~/server/conversations/upsert"

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const SUPABASE_URL = process.env.SUPABASE_URL
export const SUPABASE_API_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export const runtime = 'edge'

export default async function POST(req) {
  const conversationTypeMap = {
    'roundRobin': roundRobin
  }
  try {
    const body = await req.json()
    const {
      messages = [], 
      agents,
      conversationSettings = { maxConversationLength: 10 }
    } = body
    const { conversation_id, recursionLimit = 100, conversationType = 'roundRobin' } = conversationSettings
    const conversationTypeFunction = conversationTypeMap[conversationType]
    const { app, initialState } = await conversationTypeFunction(agents, messages, conversationSettings)

    const messageBuffer = []
    const textEncoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const output of await app.stream(initialState, { recursionLimit })) {
          if (!output?.__end__) {
            const messages = Object.values(output)[0].messages
            const { content, name } = Object.values(messages)[0].lc_kwargs
            const messageObj = { role: 'assistant', content, name, id: generateId() }
            messageBuffer.push(messageObj)
            const strContent = JSON.stringify(messageObj)
            const encodedContent = textEncoder.encode(strContent)
            controller.enqueue(encodedContent)
          } else {
            const { error } = await upsert({ user_id: userId, conversation_id, messages: messageBuffer, token })
            if (error) {
              console.error('Error saving conversation to Supabase:', error);
            }
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