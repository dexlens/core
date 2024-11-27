import grammy, { Bot } from "npm:grammy";
import { createClient } from "npm:@supabase/supabase-js";
import dotenv from "npm:dotenv";
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const DEXL_CHANNEL_ID = process.env.DEXL_CHANNEL_ID as string;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const bot = new Bot(process.env.DEV_BOT_API_TOKEN);
import { useStartCommand } from "./commands/start.ts";
import { useStatsCommand } from "./commands/stats.ts";
import { useBoardCommand } from "./commands/board.ts";
import { useSubscribeCommand, useUnsubscribeCommand } from "./commands/subscribe.ts";
import { useInfoCommand } from "./commands/info.ts";
import { useGiftCommand } from "./commands/gift.ts";
import { useClaimCommand } from "./commands/claim.ts";

/**
 * /start command
 * example: /start <referral_code>
 */
useStartCommand(bot, supabase, {
    DEXL_CHANNEL_ID,
});

/**
 * /stats command
 * example: /stats
 */
useStatsCommand(bot, supabase);

/**
 * /board command
 * example: /board
 */
useBoardCommand(bot, supabase);

/**
 * /subscribe command
 * description: subscribe to project updates
 * example: /subscribe
 */
useSubscribeCommand(bot, supabase);

/**
 * /unsubscribe command
 * description: unsubscribe from project updates
 * example: /unsubscribe
 */
useUnsubscribeCommand(bot, supabase);

/**
 * /info command
 * description: info about the bot
 * example: /info
 */
useInfoCommand(bot);

/**
 * /gift command
 * description: gift points to a user
 * example: /gift <username> <number of points>
 */
useGiftCommand(bot, supabase, { DEXL_CHANNEL_ID });

/**
 * /claim command
 * description: claim points
 * example: /claim
 */
useClaimCommand(bot, supabase, { DEXL_CHANNEL_ID });

bot.start();
