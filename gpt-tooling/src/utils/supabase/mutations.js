import { v4 as uuidv4 } from 'uuid'
import getBatchTimestamps from "../getBatchTimestamps"

export async function upsertAgentWithSystemPrompt({ supabase, system_prompt_id, user_id, agent_id, title, prompt_text, agent }) {
  if (!system_prompt_id) {
    system_prompt_id = uuidv4()
  }

  if (!agent_id) {
    agent_id = uuidv4()
  }

  try {
    const { data, error } = await supabase.rpc('transactional_upsert', {
      system_prompt: { id: system_prompt_id, user_id, title, prompt_text },
      agent: { id: agent_id, user_id, system_prompt_id, ...agent }
    })

    if (error) throw error

    return { success: true, data }
  } catch (err) {
    return { error: err.message }
  }
}

export async function linkAgentsWithConversation({ supabase, conversation_id, agents }) {
  try {
    const batch = agents.map(({ id }) => ({
      agent_id: id,
      conversation_id
    }))
    const { data, error } = await supabase
      .from('conversation_agents')
      .upsert(batch, { returning: 'minimal' })

      if (error) return { error: error.message }

    return { success: true, data }
  } catch (err) {
    return { error: err.message }
  }
}

export async function upsertConversation({ supabase, conversation_id, user_id, title, description, messages, agents }) {
  if (!conversation_id) {
    conversation_id = uuidv4()

    if (!title) {
      title = messages[0].content.substr(0, 25)
    }
  }

  const baseTimestamp = new Date()
  const timestamps = getBatchTimestamps(baseTimestamp, messages.length)
  const batch = messages.map(({ content, role, id }, index) => ({
    content,
    user_id,
    conversation_id,
    role,
    generated_by: id,
    created_at: timestamps[index]
  })).filter(({ content }) => content)

  try {
    const { data, error } = await supabase
      .from('conversations')
      .upsert({ id: conversation_id, user_id, title, description })
      .single()

    if (error) return { error: error.message }

    const { errorLinkAgents } = await linkAgentsWithConversation({ supabase, conversation_id, agents })

    if (errorLinkAgents) return { error: errorLinkAgents.message }

    const { error: messageError } = await supabase
      .from('messages')
      .insert(batch)

    if (messageError) return { error: messageError.message }

    return { success: true, data }
  } catch (err) {
    return { error: err.message }
  }
}

export async function deleteConversation({ supabase, conversation_id }) {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .delete()
      .eq('id', conversation_id)

    if (error) throw error

    return { success: true, data }
  } catch (err) {
    return { error: err.message }
  }
}

export async function deleteMessage({ supabase, message_id }) {
  try {
    const { data, error } = await supabase
      .from('messages')
      .delete()
      .eq('id', message_id)

    if (error) throw error

    return { success: true, data }
  } catch (err) {
    return { error: err.message }
  }
}

export async function deleteAgent({ supabase, agent_id }) {
  try {
    const { data, error } = await supabase
      .from('agents')
      .delete()
      .eq('id', agent_id)

    if (error) throw error

    return { success: true, data }
  } catch (err) {
    return { error: err.message }
  }
}
