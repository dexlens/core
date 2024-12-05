import type { Bot, Context } from "npm:grammy";
import type { SupabaseClient } from "npm:@supabase/supabase-js";

function useGiftCommand(bot: Bot, supabase: SupabaseClient, options: any) {
    bot.command("gift", async (ctx: Context) => {
        if (ctx.chat?.id !== options.channelId) {
            return ctx.reply("This command can only be used in the DEXL Protocol channel");
        }
        const args = ctx.match.split(' ');
        const username = args[0] ? args[0].replace('@', '') : null;
        if (username === ctx.from.username) {
            return ctx.reply("You can't send points to yourself");
        }
        const points = parseInt(args[1]);
        // points can be blank or 0
        if (!points || points === 0) {
            return ctx.reply("You need to specify the number of points you want to gift");
        }

        const { data: giftingUser, error: giftingUserError } = await supabase.from("users").select("*").eq("username", ctx.from.username).single();
        if (!giftingUser || giftingUserError) {
            // there is no user with that username
            return ctx.reply("You do not have a profile");
        }
        if (giftingUser.points < points) {
            return ctx.reply("You do not have enough points");
        }

        // check if the gifted user exists
        const { data: giftedUser, error: giftedUserError } = await supabase.from("users").select("*").eq("username", username).single();
        if (!giftedUser || giftedUserError) { // if giftedUser is null or there is an error
            return ctx.reply("The user you are trying to gift points to does not have a profile");
        }
        // update gifted user points
        await supabase.from("users").update({ points: giftedUser.points + points }).eq("username", username);
        // update gifter points
        await supabase.from("users").update({ points: giftingUser.points - points }).eq("username", ctx.from.username);
        // make the response in tempalteString
        // ctx.reply(`${username} has been gifted ${points} points by ${ctx.from.username}`);
        // TODO: Refactor this into module
        const videoUrls = [
            "https://github.com/dexlens/cdn/raw/refs/heads/main/VID_20241128_160934_489.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/1564743423408.mp4", 
            "https://github.com/dexlens/cdn/raw/refs/heads/main/legend.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/fafo-findout.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/50cent-laughing.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/nahh-nah.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/thumbs-thumbs-up-kid.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/good-morning.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/gordon.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/drops-mic.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/shaggy-scooby-doo.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/noice-nice.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/stare-awkward.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/cristiano-ronaldo-portugal.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/shia-la-beouf-fire.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/peaky-blinders-no-fighting.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/xd-programming.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/cat-computer.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/im-tired-developer-cat-gif.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/god-coding.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/programming.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/developer-client.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/front.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/bugs-video-games.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/rugged-crypto-rugged.mp4",
            "https://github.com/dexlens/cdn/raw/refs/heads/main/weekend-bugs.mp4"
        ];

        const randomVideoUrl = videoUrls[Math.floor(Math.random() * videoUrls.length)];

        ctx.replyWithVideo(randomVideoUrl, {
            caption: `@${username} has been gifted ${points} points by @${ctx.from.username}`,
        });
    });
}

export { useGiftCommand };