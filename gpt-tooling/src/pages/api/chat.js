import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import supabaseClient from '~/utils/supabase/supabaseApiRouteClient'
import { upsertConversation } from '~/utils/supabase/mutations'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export const runtime = 'edge'

export default async function POST(req) {
  const supabase = supabaseClient(req)
  const { messages, model, max_tokens = 500, temperature, userId } = await req.json()

  const sanitizedMessages = messages.map(m => ({ role: m.role, content: m.content }))

  const response = await openai.chat.completions.create({
    model,
    max_tokens,
    temperature,
    stream: true,
    messages: sanitizedMessages
  })

  const stream = OpenAIStream(response, {
    onFinal: async (data) => {
      upsertConversation({
        supabase,
        user_id: userId,
        conversation_id: data.conversation_id,
        messages: [...sanitizedMessages, { content: data }]
      })
    }
  })

  return new StreamingTextResponse(stream)
}