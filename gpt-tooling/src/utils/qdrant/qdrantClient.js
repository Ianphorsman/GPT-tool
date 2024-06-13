import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
    url: 'https://f224262d-9bdc-4b07-b390-ea62a7f27c7d.us-east4-0.gcp.cloud.qdrant.io:6333',
    apiKey: process.env.QDRANT_API_KEY
});

export default client;