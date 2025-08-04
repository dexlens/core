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
    getSentiment,
    initChartScanEventListeners,
    initUI,
    loadAnalysisFromHistory,
    handleFile,
    hideLoader,
    hideError,
    initTheme,
    loadHistoryItems,
    loadScript,
    resetAnalyzer, 
    toggleHistoryPanel,
    resetPreview,
    standardizeChartData,
    toggleTheme,
    saveToHistory,
    showError, 
    showLoader,
    showPreview,
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
        getSentiment, // Puts the getSentiment function in the window.dexlens.chartscan.getSentiment
        initChartScanEventListeners, // Puts the initChartScanEventListeners function in the window.dexlens.chartscan.initChartScanEventListeners
        initUI, // Puts the initUI function in the window.dexlens.chartscan.initUI
        loadAnalysisFromHistory, // Puts the loadAnalysisFromHistory function in the window.dexlens.chartscan.loadAnalysisFromHistory
        handleFile, // Puts the handleFile function in the window.dexlens.chartscan.handleFile
        hideLoader, // Puts the hideLoader function in the window.dexlens.chartscan.hideLoader
        hideError, // Puts the hideError function in the window.dexlens.chartscan.hideError
        initTheme, // Puts the initTheme function in the window.dexlens.chartscan.initTheme
        loadHistoryItems, // Puts the loadHistoryItems function in the window.dexlens.chartscan.loadHistoryItems
        loadScript, // Puts the loadScript function in the window.dexlens.chartscan.loadScript
        resetAnalyzer, // Puts the resetAnalyzer function in the window.dexlens.chartscan.resetAnalyzer
        toggleHistoryPanel, // Puts the toggleHistoryPanel function in the window.dexlens.chartscan.toggleHistoryPanel
        resetPreview, // Puts the resetPreview function in the window.dexlens.chartscan.resetPreview
        standardizeChartData, // Puts the standardizeChartData function in the window.dexlens.chartscan.standardizeChartData
        toggleTheme, // Puts the toggleTheme function in the window.dexlens.chartscan.toggleTheme
        saveToHistory, // Puts the saveToHistory function in the window.dexlens.chartscan.saveToHistory
        showError, // Puts the showError function in the window.dexlens.chartscan.showError
        showLoader, // Puts the showLoader function in the window.dexlens.chartscan.showLoader
        showPreview, // Puts the showPreview function in the window.dexlens.chartscan.showPreview
    }
}