import { setupBot } from "@dexlens/premium-bot";
import { TEST_TELEGRAM_BOT_TOKEN } from "@dexlens/secrets";
import { logs } from "@dexlens/logger";
logs.info("Starting telegram premium bot");
const bot = setupBot(TEST_TELEGRAM_BOT_TOKEN);

bot.command("start", async (ctx) => {
    await ctx.reply("Hello, world!");
});

bot.start();