import { createOpenAI } from 'npm:@ai-sdk/openai'
import { streamText } from 'npm:ai'
import { createStreamableValue } from 'npm:ai/rsc'
import dedent from 'npm:dedent'
import dotenv from 'npm:dotenv'
dotenv.config()

/**
 * @description Optimize a prompt using OpenAI
 * @param {Object} params
 * @param {string} params.apiKey
 * @param {string} params.model
 * @param {string} params.prompt
 * @returns {Promise<{output: string}>}
 * @example
 * const { output } = await betterPrompt({
 *  apiKey: process.env.OPENAI_API_KEY,
 *  model: "gpt-4o-mini",
 *  prompt: "Hello, how are you?"
 * })
 */
export async function betterPrompt({
  apiKey,
  model,
  prompt,
}: {
  apiKey: string
  model: string
  prompt: string
}) {
  const stream = createStreamableValue('')
  try {
    const openai = createOpenAI({
      apiKey,
      baseURL: process.env.PUBLIC_API_URL + '/v1',
    })

    ;(async () => {
      try {
        const { textStream } = await streamText({
          model: openai(model),
         prompt: dedent`
        I want you to improve the user prompt that is wrapped in \`<make_better_prompt>\` tags.

        IMPORTANT: Only respond with the improved prompt and nothing else!

        <make_better_prompt>
          ${prompt}
        </make_better_prompt>
         `
        });
        for await (const delta of textStream) {
          stream.update(delta)
        }
        stream.done()
      } catch (e: any) {
        logger.error(e)
        stream.error(e.responseBody)
      }
    })()
  } catch (error) {
    console.error(error)
  }
  return { output: stream.value }
}