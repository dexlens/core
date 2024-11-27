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

useStartCommand(bot, supabase, {
    DEXL_CHANNEL_ID,
});

bot.start();