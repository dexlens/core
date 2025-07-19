import { bot } from "@dexlens/telegram-sdk";
import { 
  conversations, 
  createConversation, 
  greeting 
} from "@dexlens/conversations";
import { logger } from "@dexlens/logger";

const logs = new logger("stat-bot");

bot.use(conversations());
bot.use(createConversation(greeting));

bot.command("start", async (ctx) => {
  logs.info("Starting conversation");
  await ctx.conversation.enter("greeting");
});

bot.start();