import { Pinecone } from 'npm:@pinecone-database/pinecone';

async function preparePinecone(config: any) {
    const pinecone = new Pinecone({
        apiKey: config.pineconeApiKey,
    });
    const index = pinecone.index('dexlens');
    // Voyage AI config
    const voyageApiKey = config.voyageApiKey;
    const voyageBaseUrl = 'https://api.voyageai.com/v1';
    // Rate limiting
    const lastRequestTime = 0;
    const minRequestInterval = 2000;
    const maxRetries = 3;
    // return the prepared Pinecone config
    return { 
        index,
        voyageApiKey,
        voyageBaseUrl,
        lastRequestTime,
        minRequestInterval,
        maxRetries
    }
}

export {
    preparePinecone
}