import { Configuration, OpenAIApi } from "openai"
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function handler (
  req,
  res
) {
  const { text } = JSON.parse(req.body)
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text
    })
    const embedding = response.data.data?.[0]?.embedding ?? []
    return res.status(200).send({
      embedding
    })
  } catch (e) {
    console.log('error', e)
    return res.status(500).send()
  }
}
