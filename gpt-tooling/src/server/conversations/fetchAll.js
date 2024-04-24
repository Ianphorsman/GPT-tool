async function fetchAllConversations({ supabase, user_id }) {
  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' })
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

export default fetchAllConversations
