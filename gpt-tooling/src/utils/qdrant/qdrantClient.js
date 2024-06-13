import { QdrantClient } from '@qdrant/js-client-rest';

const client = new QdrantClient({
    url: 'https://f224262d-9bdc-4b07-b390-ea62a7f27c7d.us-east4-0.gcp.cloud.qdrant.io:6333',
    apiKey: 'Fl_GTLRBKkfMEUIvelVarpy0OUemYcj_pge2IZFZiTRIM9pA9XTDcw',
});

export default client;