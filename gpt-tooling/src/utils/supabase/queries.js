export async function fetchAllConversations({ supabase, user_id }) {
  if (!user_id) {
    return { error: 'User ID is required' }
  }

  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('user_id', user_id)
      .is('archived_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data
  } catch (err) {
    return { error: err.message }
  }
}

export async function fetchAllAgentsInConversation({ supabase, conversation_id }) {
  if (!conversation_id) {
    return { error: 'Conversation ID is required' }
  }

  try {
    const { data, error } = await supabase
      .from('conversation_agents')
      .select(`
        agent_id,
        agents (
          *,
          system_prompts (
            id,
            title,
            prompt_text
          )
        )
      `)
      .eq('conversation_id', conversation_id)

    if (error) throw error

    return data
  } catch (err) {
    return { error: err.message }
  }
}

export async function fetchAllMessagesInConversation({ supabase, conversation_id }) {
  if (!conversation_id) {
    return { error: 'Conversation ID is required' }
  }

  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversation_id)
      .order('created_at', { ascending: true })

    if (error) throw error

    return data
  } catch (err) {
    return { error: err.message }
  }
}
