import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY
})

export const runtime = 'edge'

export default async function POST(req) {
  const { messages } = await req.json()
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    max_tokens: 50,
    stream: true,
    messages
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}