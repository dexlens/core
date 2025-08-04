/**
 * Chart Scan Bundler
 * Copyright 2025 DexLens 
 */
import { 
    GEMINI_API_KEY, 
    addStructuredData,
    analyzeImage, 
    clearAnalysisHistory,
    displayResults
 } from "@dexlens/chartscan";

(window as any).dexlens = {
    chartscan: {
        GEMINI_API_KEY, // Puts the API key in the window.dexlens.chartscan.GEMINI_API_KEY
        addStructuredData, // Puts the addStructuredData function in the window.dexlens.chartscan.addStructuredData
        analyzeImage, // Puts the analyzeImage function in the window.dexlens.chartscan.analyzeImage
        clearAnalysisHistory, // Puts the clearAnalysisHistory function in the window.dexlens.chartscan.clearAnalysisHistory
        displayResults // Puts the displayResults function in the window.dexlens.chartscan.displayResults
    }
}