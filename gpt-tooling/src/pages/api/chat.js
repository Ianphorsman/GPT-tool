import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
})

export const runtime = 'edge'

export default async function POST(req) {
  const { messages, model, max_tokens = 500, temperature } = await req.json()
  const response = await openai.chat.completions.create({
    model,
    max_tokens,
    temperature,
    stream: true,
    messages
  })
  console.log('__RES', messages)
  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}