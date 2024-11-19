import axios from 'npm:axios';

export async function getDatabaseEmbedding(text: string, retryCount: number = 0, options: any) {
    try {
        const now = Date.now();
        const timeSinceLastRequest = now - options.lastRequestTime;
        if (timeSinceLastRequest < options.minRequestInterval) {
            await new Promise(resolve => 
                setTimeout(resolve, options.minRequestInterval - timeSinceLastRequest)
            );
        }
        const response = await axios.post(
            `${options.voyageBaseUrl}/embeddings`,
            {
                input: [text],
                model: 'voyage-large-2'
            },
            {
                headers: {
                    'Authorization': `Bearer ${options.voyageApiKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        options.lastRequestTime = Date.now();
        return response.data.data[0].embedding;
    } catch (error: any) {
        if (error.response?.status === 429 && retryCount < options.maxRetries) {
            const delay = 2000 * Math.pow(2, retryCount);
            await new Promise(resolve => setTimeout(resolve, delay));
            return getDatabaseEmbedding(text, retryCount + 1, options);
        }
        throw error;
    }
}