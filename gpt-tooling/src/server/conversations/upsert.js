import { v4 as uuidv4 } from 'uuid';
import getBatchTimestamps from "../../utils/getBatchTimestamps"
import supabaseServer from '../../utils/supabase/supabaseApiRouteClient'

export default async function upsert({ user_id, conversation_id, messages, req }) {
  if (!user_id) {
    return { error: 'You must be signed in to send a message', status: 400 }
  }

  if (!conversation_id) {
    conversation_id = uuidv4()
  }

  const baseTimestamp = new Date()
  const timestamps = getBatchTimestamps(baseTimestamp, messages.length)
  const batch = messages.map((message, index) => ({
    ...message,
    user_id,
    conversation_id,
    created_at: timestamps[index]
  }))

  const supabase = supabaseServer(req)

  try {
    const { error } = await supabase
      .from('conversations')
      .upsert({ id: conversation_id, user_id })
      .single()

    if (error) throw error

    const { error: messageError } = await supabase
      .from('messages')
      .insert(batch)

    if (messageError) throw messageError

    return { status: 201, data: "Conversation and messages upserted successfully" }
  } catch (err) {
    return { status: 500, error: err.message }
  }
}
