import roundRobin from "../../langgraph/workflows/roundRobin"

export const OPENAI_API_KEY = process.env.OPENAI_API_KEY

export const runtime = 'edge'

const conversationTypeMap = {
  'roundRobin': roundRobin
}

export default async function POST(req) {
  try {
    const body = await req.json()
    const { messages, agents, conversationSettings } = body
    const { recursionLimit = 10, conversationType } = conversationSettings
    const conversationTypeFunction = conversationTypeMap[conversationType]
    const { app, initialState } = await conversationTypeFunction(agents, messages, conversationSettings)

    const textEncoder = new TextEncoder()
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const output of await app.stream(initialState, { recursionLimit })) {
          let content = ''
          if (output.agent || output.action) {
            content = (output?.agent ?? output?.action)?.messages[0].lc_kwargs.content
          }
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