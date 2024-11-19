import { getDatabaseEmbedding } from "@dexlens/core";

export async function queryDatabaseIndex(text: string, filter: any, results: number = 10, options: any) {
    const vector = await getDatabaseEmbedding(text, 0, options);
    try {
        const response = await options.index.namespace("").query({
            topK: results,
            vector: vector,
            includeValues: true,
            includeMetadata: true,
            filter: filter
        });
        return response;
    } catch (error) {
        throw error;
    }
}