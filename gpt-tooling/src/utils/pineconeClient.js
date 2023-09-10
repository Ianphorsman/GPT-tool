import { PineconeClient } from "@pinecone-database/pinecone";

// gpt-memory
export const getPineconeClient = () => {
  const pinecone = new PineconeClient();
  (async () => await pinecone.init({
    environment: 'asia-northeast1-gcp',
    apiKey: process.env.PINECONE_API_KEY
  }))()
  return pinecone
}