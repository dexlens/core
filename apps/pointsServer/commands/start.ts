/**
 * Move consts elsewhere but keep them here for now
 * This code is a bit messy, code it up later, but it's nice for now.
 * Move fast!
 * TODO: new try catch
 */
import dotenv from "npm:dotenv";
dotenv.config();
import { nanoid } from "npm:nanoid";
import type { Bot, Context } from "npm:grammy";
import type { SupabaseClient } from "npm:@supabase/supabase-js";
/**
 * Constants
 */
const SUPABASE_TABLE_NAME = "users";

function useStartCommand(bot: Bot, supabase: SupabaseClient, options: any) {
    bot.command("start", async (ctx: Context) => {
        const {
            userId,
            username,
            first_name,
            language_code,
            is_bot,
            is_premium,
        } = ctx.from;
        if (!username) {
            return ctx.reply("Please set a username in your telegram settings to continue");
        }
        const { data: existingUser, error: fetchError } = await supabase
            .from(SUPABASE_TABLE_NAME)
            .select("*")
            .eq("user_id", userId)
            .single();

        if (fetchError && fetchError.code !== "PGRST116") {
            // Handle unexpected error
            console.error("Error fetching user:", fetchError.message);
            return ctx.reply("Something went wrong! Please try again later.");
        }

        // Handle referral code
        const referralCode = ctx.match; // Referral code from /start <referral_code>
        if (referralCode && !existingUser) {
            const { data: referrer, error: referrerError } = await supabase
                .from(SUPABASE_TABLE_NAME)
                .select("*")
                .eq("referral_code", referralCode)
                .single();

            if (referrerError) {
                console.error("Error fetching referrer:", referrerError.message);
                return ctx.reply("Something went wrong! Please try again later.");
            }

            if (referrer) {
                // Update referrer's referrals and points
                await supabase
                    .from(SUPABASE_TABLE_NAME)
                    .update({
                        referrals: referrer.referrals + 1,
                        points: referrer.points + numberOfPointsForReferral,
                    })
                    .eq("id", referrer.id);

                bot.api.sendMessage(options.DEXL_CHANNEL_ID, `${referrer.username} has successfully referred ${username}`);
            }
        }

        if (existingUser) {
            // TODO: Use useDedent here from @dexlens/core
            return ctx.reply(
                `You are already signed up! \n\nYour referral link below: \n` +
                `https://t.me/${ctx.me.username}?start=${existingUser.referral_code} \n\n` +
                `Your points: ${existingUser.points}\n` +
                `Number of referrals: ${existingUser.referrals}\n\n` +
                `You earn ${numberOfPointsForReferral} points for each referral \n` +
                `You can /start to see the start message again \n` +
                `You can /info to see info about this bot \n` +
                `You can /claim ${numberOfPointsForClaim} points once every 24 hours \n` +
                `You can /board to see the leaderboard \n` +
                `You can /stats to see your stats \n` +
                `You can /subscribe to project updates \n` +
                `You can /unsubscribe to stop receiving project updates`
            );
        }

        // Register new user
        const newReferralCode = nanoid(6); // Generate unique referral code
        const { error: insertError } = await supabase.from("users").insert([
            {
                user_id: userId,
                username: username,
                referral_code: newReferralCode,
                referrals: 0,
                points: 0,
                last_claim: new Date("1970-01-01").toLocaleString(),
                first_name: first_name,
                language_code: language_code,
                is_bot: is_bot,
                is_premium: is_premium,
            },
        ]);

        if (insertError) {
            console.error("Error inserting user:", insertError.message);
            return ctx.reply("Could not complete sign-up. Please try again later.");
        }
        // TODO: Use useDedent here from @dexlens/core
        ctx.reply(
            `Welcome, ${username}! \n\nYour referral link below: \n` +
            `https://t.me/${ctx.me.username}?start=${newReferralCode}\n\n` +
            `You can earn ${numberOfPointsForReferral} points for each referral \n` +
            `You can /start to see the start message again \n` +
            `You can /info to see info about this bot \n` +
            `You can /claim ${numberOfPointsForClaim} points once every 24 hours \n` +
            `You can /board to see the leaderboard \n` +
            `You can /stats to see your stats \n` +
            `You can /subscribe to project updates \n` +
            `You can /unsubscribe to stop receiving project updates`
        );
    });
}

export { useStartCommand };