import { bot } from "@dexlens/telegram-sdk";
import { shortenAddress } from "@dexlens/utils";

bot.command("start", (ctx) => {
  const address = "0x1234567890123456789012345678901234567890";
  const shortAddress = shortenAddress(address);
  ctx.reply(`Hello, ${shortAddress}!`);
});

bot.start();