// pages/api/conversations/archive.js
import supabaseServer from '../../../server/supabaseClient'

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const { conversationId } = req.body

        if (!conversationId) {
            return res.status(400).json({ error: 'Conversation ID is required' })
        }

        try {
            const { data, error } = await supabaseServer
                .from('conversations')
                .update({ archived_at: new Date() })
                .eq('id', conversationId)

            if (error) throw error

            return res.status(200).json({ message: 'Conversation archived successfully', data })
        } catch (err) {
            return res.status(500).json({ error: err.message })
        }
    } else {
        res.setHeader('Allow', ['PUT'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}
