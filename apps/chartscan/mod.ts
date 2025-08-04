/**
 * Chart Scan Bundler
 * Copyright 2025 DexLens 
 */
import { 
    GEMINI_API_KEY, 
    addStructuredData,
    analyzeImage, 
    clearAnalysisHistory,
    displayResults,
    fileToBase64,
    generatePDF, 
    getCurrentAnalysisData,
    getHistoryItems,
    getSentiment
 } from "@dexlens/chartscan";

(window as any).dexlens = {
    chartscan: {
        GEMINI_API_KEY, // Puts the API key in the window.dexlens.chartscan.GEMINI_API_KEY
        addStructuredData, // Puts the addStructuredData function in the window.dexlens.chartscan.addStructuredData
        analyzeImage, // Puts the analyzeImage function in the window.dexlens.chartscan.analyzeImage
        clearAnalysisHistory, // Puts the clearAnalysisHistory function in the window.dexlens.chartscan.clearAnalysisHistory
        displayResults, // Puts the displayResults function in the window.dexlens.chartscan.displayResults
        fileToBase64, // Puts the fileToBase64 function in the window.dexlens.chartscan.fileToBase64
        generatePDF, // Puts the generatePDF function in the window.dexlens.chartscan.generatePDF
        getCurrentAnalysisData, // Puts the getCurrentAnalysisData function in the window.dexlens.chartscan.getCurrentAnalysisData
        getHistoryItems, // Puts the getHistoryItems function in the window.dexlens.chartscan.getHistoryItems
        getSentiment // Puts the getSentiment function in the window.dexlens.chartscan.getSentiment
    }
}