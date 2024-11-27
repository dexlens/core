import type { Bot, Context } from "npm:grammy";
import type { SupabaseClient } from "npm:@supabase/supabase-js";
import { maskUsername } from "@dexlens/core";
/**
 * Constants
 */
const SUPABASE_TABLE_NAME = "users";

function useBoardCommand(bot: Bot, supabase: SupabaseClient) {
    bot.command("board", async (ctx: Context) => {
        const { data, error } = await supabase.from(SUPABASE_TABLE_NAME).select("*").order(
            "points",
            { ascending: false },
        ).limit(20);

        if (error) {
            console.error(error);
            return ctx.reply("An error occurred while fetching the leaderboard");
        }

        ctx.reply(
            `Leaderboard: (Top 20)\n${data?.map((user) => `${maskUsername(user.username)}: ${user.points} points`).join(
                "\n",
            )
            }`,
        );
    });
}

export { useBoardCommand };
