import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import upsert from '~/server/conversations/upsert'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export default async function POST(req) {
  const token = await getToken({ template: "supabase" })
  supabase.auth.setAuth(token)
  console.log('TOKEN', userId, token)
  const { messages, model, max_tokens = 500, temperature } = await req.json()
  const response = await openai.chat.completions.create({
    model,
    max_tokens,
    temperature,
    stream: true,
    messages
  })

  const stream = OpenAIStream(response, {
    onFinal: (data) => {
      console.log('Final', data)
      upsert({
        user_id: userId,
        conversation_id: data.conversation_id,
        messages: data.messages
      })
    },
    
  })

  return new StreamingTextResponse(stream)
}