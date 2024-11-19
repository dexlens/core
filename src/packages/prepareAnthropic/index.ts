import Anthropic from 'npm:@anthropic-ai/sdk';
const apiKey = process.env.ANTHROPIC_API_KEY;

/**
 * Prepare Anthropic AI client
 * @returns Anthropic 
 */
function prepareAnthropic() {
    const anthropic = new Anthropic({
        apiKey: apiKey,
    });
    return anthropic;
}

export {
    prepareAnthropic
}