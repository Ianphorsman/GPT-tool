import roundRobin from "../../langgraph/workflows/roundRobin"
import generateId from "~/utils/generateId"
import getBatchTimestamps from "~/utils/getBatchTimestamps"

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const SUPABASE_URL = process.env.SUPABASE_URL
export const SUPABASE_API_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

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
            const baseTimestamp = new Date();
            const timestamps = getBatchTimestamps(baseTimestamp, messageBuffer.length);
            const batch = messageBuffer.map((message, index) => ({
              ...message,
              created_at: timestamps[index]
            }))

            const { error } = await supabase
              .from('conversations')
              .insert(batch)
            
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