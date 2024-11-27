import type { Bot, Context } from "npm:grammy";
import type { SupabaseClient } from "npm:@supabase/supabase-js";

const numberOfPointsForClaim = 3;

function useClaimCommand(bot: Bot, supabase: SupabaseClient, options: any) {
    bot.command("claim", async (ctx: Context) => {
        if (ctx.chat?.type !== "private") {
            return ctx.reply("This command can only be used in private chats");
        }
        const userId = ctx.from?.id;
        const numberOfPoints = numberOfPointsForClaim;

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("user_id", userId)
            .single();

        if (error) {
            return ctx.reply("Error fetching user data. Please try again.");
        }

        const lastClaim = user.last_claim ? new Date(user.last_claim) : new Date(0);
        const timeSinceLastClaim = Date.now() - lastClaim.getTime();
        const hoursRemaining = 24 - (timeSinceLastClaim / (1000 * 60 * 60));

        if (timeSinceLastClaim < 24 * 60 * 60 * 1000) {
            const numberOfHoursUntilNextClaim = Math.ceil(hoursRemaining);
            return ctx.reply(
                `You can claim again in ${numberOfHoursUntilNextClaim} hours`,
            );
        }

        // Update user points and last_claim timestamp
        const { error: updateError } = await supabase
            .from("users")
            .update({
                points: user.points + numberOfPoints,
                last_claim: new Date().toISOString(),
            })
            .eq("user_id", userId);

        if (updateError) {
            console.error("Error updating points:", updateError.message);
            return ctx.reply("Error updating points. Please try again.");
        }

        ctx.reply(
            `You have claimed ${numberOfPoints} points! Come back in 24 hours to claim again.`,
        );
        bot.api.sendMessage(options.channelId, `${user.username} has successfully claimed points, you should too!`);
    });
}

export { useClaimCommand };