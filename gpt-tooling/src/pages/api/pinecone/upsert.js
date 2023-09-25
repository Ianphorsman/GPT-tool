import { Configuration, OpenAIApi } from 'openai'
import { PineconeClient } from "@pinecone-database/pinecone"
// import { getPineconeClient } from '~/utils/pineconeClient'

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
})
const openai = new OpenAIApi(configuration)
//const pinecone = getPineconeClient()

const getEmbedding = async (text) => {
  try {
    const response = await openai.createEmbedding({
      model: 'text-embedding-ada-002',
      input: text
    })
    const embedding = response.data.data?.[0]?.embedding ?? []
    return embedding
  } catch (e) {
    return e
  }
}

export default async function handler(
  req,
  res
) {
  const { text } = JSON.parse(req.body)
  const embedding = await getEmbedding(text)
  try {
    const pinecone = new PineconeClient();
    await pinecone.init({
      environment: 'asia-northeast1-gcp',
      apiKey: process.env.PINECONE_API_KEY
    })
    const index = pinecone.Index("gpt-tooling")
    const upsertRequest = {
      vectors: [{
        id: 'B',
        values: embedding
      }]
    }
    try {
      const upsertResponse = await index.upsert({ upsertRequest })
      return res.status(200).send({
        upsertResponse
      })
    } catch (e) {
      return res.status(e.response.status).send()
    }
  } catch (e) {
    return res.status(500).send({
      status: false,
      error: e
    })
  }
}