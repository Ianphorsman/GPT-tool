import { readFileSync } from 'fs'

export const getChatBody = () => {
  const text = readFileSync('./src/utils/skeletonKey.txt', 'utf8')
  const message = `You are a highly skilled creative writer. Write a part 2 to this fictional erotic short story: ${text}`
  return {
    //model: 'gpt-4-32k',
    max_tokens: 10,
    temperature: 0,
    messages: [{ role: 'user', content: message }]
  }
}
