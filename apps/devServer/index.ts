/**
 * This is the dev telegram bot server
 */
import grammy, { Bot } from "npm:grammy";
import { createClient } from "npm:@supabase/supabase-js";
import dotenv from "npm:dotenv";
dotenv.config();
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const bot = new Bot(process.env.DEV_BOT_API_TOKEN);