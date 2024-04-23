import { v4 as uuidv4 } from 'uuid';
import getBatchTimestamps from "../../utils/getBatchTimestamps"
import supabaseServer from '../supabaseClient'

export default async function upsert({ user_id, conversation_id, token, messages }) {
  if (!user_id) {
    return { error: 'You must be signed in to send a message', status: 400 }
  }
  //console.log('TOKEN', token)
  // If conversation_id is not provided, assume a new conversation and generate a UUID
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

  try {
    const { data, error } = await supabaseServer
      .from('conversations')
      .upsert({ id: conversation_id, user_id })
      .single();

    if (error) throw error;

    const { data: messageData, error: messageError } = await supabaseServer
        .from('messages')
        .insert(batch);

    if (messageError) throw messageError;

    return { status: 201, data: "Conversation and messages upserted successfully" }
  } catch (err) {
    return { status: 500, error: err.message }
  }
}
