import { StreamingTextResponse } from "ai"
import roundRobin from "../../langgraph/workflows/roundRobin"

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const runtime = 'edge'

const dummyAgents = [
  { name: 'numbers', temperature: 1, systemPrompt: 'You always respond with only a single random number between 1 and 1000' },
  { name: 'words', temperature: 1, systemPrompt: 'You always respond with only a single random english word. Do not surround it in quotes' }
]

export default async function POST(req) {
  const conversationTypeMap = {
    'roundRobin': roundRobin
  }
  try {
    const body = await req.json()
    const { messages = []/*, agents*/, conversationSettings = { maxConversationLength: 10 } } = body
    const { recursionLimit = 100, conversationType = 'roundRobin' } = conversationSettings
    const conversationTypeFunction = conversationTypeMap[conversationType]
    const { app, initialState } = await conversationTypeFunction(dummyAgents, messages, conversationSettings)

    const textEncoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const output of await app.stream(initialState, { recursionLimit })) {
          const messages = Object.values(output)[0].messages
          const content = JSON.stringify(Object.values(messages)[0].lc_kwargs)
          const encodedContent = textEncoder.encode(content)
          controller.enqueue(encodedContent);
        }
        controller.close();
      }
    })

    return new StreamingTextResponse(readableStream)
  } catch (error) {
    console.error(error)
  }
}