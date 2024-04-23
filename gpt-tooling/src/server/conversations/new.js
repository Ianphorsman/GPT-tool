// pages/api/conversations/new.js
import supabaseServer from '../supabaseClient'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { user_id, title, description } = req.body

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    try {
      const timestamp = new Date()
      const { data, error } = await supabaseServer
        .from('conversations')
        .insert([
          { user_id, title, description, created_at: timestamp, updated_at: timestamp }
        ])

      if (error) throw error

      return res.status(201).json(data)
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
