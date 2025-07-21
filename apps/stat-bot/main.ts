import {
  bot,
  session,
  FileAdapter,
  initBotCommands,
} from "@dexlens/telegram-sdk";
import { logs } from "@dexlens/logger";
import { MenuMiddleware, menu } from "@dexlens/menus";
const menuMiddleware = new MenuMiddleware('/', menu);
import { conversations, createConversation, greeting, channelAnnouncement, addLabel } from "@dexlens/conversations";

logs.info("Starting stat bot");

// @ts-ignore
bot.use(session<{ userIsPremium: boolean }>({
  initial: () => ({
    userIsPremium: false,
  }),
  storage: new FileAdapter()
}));

bot.use(conversations());
bot.use(createConversation(greeting));
bot.use(createConversation(channelAnnouncement));
bot.use(createConversation(addLabel));
bot.use(menuMiddleware.middleware());
initBotCommands(bot);

bot.start();