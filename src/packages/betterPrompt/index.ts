import { createOpenAI } from 'npm:@ai-sdk/openai'
import { generateText } from 'npm:ai'
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
  try {
    const openai = createOpenAI({
      apiKey,
      baseURL: process.env.PUBLIC_API_URL + '/v1',
    })

    ;(async () => {
      try {
        const { text } = await generateText({
          model: openai(model),
          prompt: dedent`
        I want you to improve the user prompt that is wrapped in \`<make_better_prompt>\` tags.

        IMPORTANT: Only respond with the improved prompt and nothing else!

        <make_better_prompt>
          ${prompt}
        </make_better_prompt>
         `
        })
        return text
      } catch (e: any) {
        console.error(e)
        return e.message
      }
    })()
  } catch (error) {
    console.error(error)
  }
  return { output: stream.value }
}