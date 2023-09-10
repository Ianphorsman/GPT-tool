import { useState, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'

const mockConversation = [
  { role: 'system', content: 'you are a senior software engineer', id: 'uuid' },
  { role: 'user', content: 'foo bar', id: 'uuid2' },
  { role: 'assistant', content: 'foo bar', id: 'uuid3' }
]

const useConversationState = () => {
  
}

export default useConversationState
