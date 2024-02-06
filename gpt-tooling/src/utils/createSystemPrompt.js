const createSystemPrompt = (content) => {
  if (!content) return
  return {
    role: 'system',
    content
  }
}

export default createSystemPrompt
