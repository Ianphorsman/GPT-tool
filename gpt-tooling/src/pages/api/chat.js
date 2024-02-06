import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
})

export const runtime = 'edge'

export default async function POST(req) {
  const { messages, model } = await req.json()
  console.log('model', model)
  const response = await openai.chat.completions.create({
    model,
    max_tokens: 500,
    stream: true,
    messages
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}