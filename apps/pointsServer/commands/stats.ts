import type { Bot, Context } from "npm:grammy";
import type { SupabaseClient } from "npm:@supabase/supabase-js";
const SUPABASE_TABLE_NAME = "users";

function useStatsCommand(bot: Bot, supabase: SupabaseClient) {
    bot.command("stats", async (ctx: Context) => {
        const userId = ctx.from.id;

        // Fetch user stats
        const { data: user, error } = await supabase
            .from(SUPABASE_TABLE_NAME)
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) {
            console.error("Error fetching stats:", error.message);
            return ctx.reply(
                "Could not retrieve your stats. Please try again later.",
            );
        }

        ctx.reply(
            `Your stats:\n` +
            `Points: ${user.points}\n` +
            `Referrals: ${user.referrals}`,
        );
    });
}

export { useStatsCommand };