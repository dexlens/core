import { 
    getDatabaseEmbedding,
    queryDatabaseIndex
 } from "@dexlens/core";

/**
 * TODO: Optimize this function
 * Learn from a tweet and store in Pinecone
 * @param tweet 
 * @param options 
 * @returns
 */
export async function consumeTweetAndLearn(tweet: any, options: any) {
    try {
        const embedding = await getDatabaseEmbedding(tweet.account_handle + " : " + tweet.content, 0, {});
        const matches = await queryDatabaseIndex(tweet.content, { content: { '$eq': tweet.content }}, 10, {});

        if (matches.matches.length > 0) {
            console.log(`Tweet already exists in index: ${tweet.content}`);
            return;
        }
        await options.index.upsert([{
            id: `tweet-${tweet.timestamp}-${tweet.account_handle}`,
            values: embedding,
            metadata: {
                content: tweet.content,
                account_handle: tweet.account_handle,
                timestamp: tweet.timestamp,
                likes: tweet.engagement_metrics.likes,
                retweets: tweet.engagement_metrics.retweets
            }
        }]);
        console.log(`Embedded and stored tweet by ${tweet.account_handle}`);
        return tweet;
    } catch (error) {
        throw error;
    }
}