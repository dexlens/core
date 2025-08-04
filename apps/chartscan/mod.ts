/**
 * Chart Scan Bundler
 * Copyright 2025 DexLens 
 */
import { 
    GEMINI_API_KEY
 } from "@dexlens/chartscan";

(window as any).dexlens = {
    chartscan: {
        GEMINI_API_KEY // Puts the API key in the window.dexlens.chartscan.GEMINI_API_KEY
    }
}