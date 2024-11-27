import type { Bot, Context } from "npm:grammy";
import type { SupabaseClient } from "npm:@supabase/supabase-js";

const SUPABASE_TABLE_NAME = "users";

function useSubscribeCommand(bot: Bot, supabase: SupabaseClient) {
    bot.command("subscribe", async (ctx: Context) => {
        const userId = ctx.from?.id;
        await supabase.from(SUPABASE_TABLE_NAME).update({ subscribed: true }).eq(
            "user_id",
            userId,
        );
        ctx.reply("You have subscribed to project updates");
    });
}

function useUnsubscribeCommand(bot: Bot, supabase: SupabaseClient) {
    bot.command("unsubscribe", async (ctx: Context) => {
        const userId = ctx.from?.id;
        await supabase.from(SUPABASE_TABLE_NAME).update({ subscribed: false }).eq(
            "user_id",
            userId,
        );
        ctx.reply("You have unsubscribed from project updates");
    });
}

export { useSubscribeCommand, useUnsubscribeCommand };
