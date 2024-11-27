import type { Bot, Context } from "npm:grammy";

const numberOfPointsForReferral = 10;
const numberOfPointsForClaim = 3;

function useInfoCommand(bot: Bot) {
    bot.command("info", (ctx: Context) => {
        ctx.reply(
            `This Bot is for early users of the DEXL Protocol to farm points \n\n` +
            `- Subscribe to project updates from the bot \n` +
            `- For each referral you get ${numberOfPointsForReferral} points \n` +
            `- You can claim ${numberOfPointsForClaim} points once every 24 hours`,
        );
    });
}

export { useInfoCommand };
