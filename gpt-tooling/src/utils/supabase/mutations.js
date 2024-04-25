import { v4 as uuidv4 } from 'uuid'

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

export async function linkAgentWithConversation({ supabase, agent_id, conversation_id }) {
  try {
    const { data, error } = await supabase
      .from('agents')
      .upsert({ id: agent_id, conversation_id })
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (err) {
    return { error: err.message }
  }
}