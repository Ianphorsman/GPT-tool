// pages/api/conversations/index.js
import supabaseServer from '../supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { user_id } = req.query

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    try {
      const { data, error } = await supabaseServer
        .from('conversations')
        .select('*')
        .eq('user_id', user_id)
        .is('archived_at', null)
        .order('created_at', { ascending: false })

      if (error) throw error

      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
