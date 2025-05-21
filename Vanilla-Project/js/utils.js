// utils.js
import { PRODUCTS, ALTERNATIVES } from "./data.js"
import { getIncomeRange } from "./userProfile.js"
import { getIncomeFriendlyAlternatives } from "./recommendations.js"

// --- Data Access ---
export const findProductByBarcode = (barcode) => PRODUCTS.find((p) => p.barcode === barcode)

// Enhanced to support income-based filtering
export const getAlternativesForProduct = async (productId, includeIncomeBased = true, useAI = false) => {
    const baseAlternatives = ALTERNATIVES[productId] || []

    if (!includeIncomeBased) {
        return baseAlternatives
    }

    // Get the original product
    const product = PRODUCTS.find((p) => p.id === productId)
    if (!product) {
        return baseAlternatives
    }

    // Get user's income range
    const incomeRange = getIncomeRange()

    // If no income range is set, return basic alternatives
    if (!incomeRange) {
        return baseAlternatives
    }

    try {
        // Use our hybrid recommendation system with optional AI enhancement
        const incomeFriendlyAlternatives = await getIncomeFriendlyAlternatives(product, baseAlternatives, useAI)
        return incomeFriendlyAlternatives
    } catch (error) {
        console.error("Error getting income-based alternatives:", error)
        return baseAlternatives // Fallback to basic alternatives
    }
}

// --- Style/Class Helpers ---
export const getStatusBadgeClass = (status) => {
    switch (status) {
        case "healthy":
            return "badge-healthy"
        case "moderate":
            return "badge-moderate"
        case "unhealthy":
            return "badge-unhealthy"
        default:
            return ""
    }
}
export const getStatusIcon = (status) => {
    switch (status) {
        case "healthy":
            return `check-circle-2` // Filled check
        case "moderate":
            return `alert-triangle`
        case "unhealthy":
            return `alert-octagon` // Different alert
        default:
            return "info"
    }
}
export const getHealthScoreClass = (score) => {
    if (score >= 70) return "health-score-green"
    if (score >= 40) return "health-score-yellow" // Adjusted threshold
    return "health-score-red"
}
export const getScoreBarClass = (status) => {
    switch (status) {
        case "healthy":
            return "healthy"
        case "moderate":
            return "moderate"
        case "unhealthy":
            return "unhealthy"
        default:
            return ""
    }
}
export const getSuitabilityText = (status) => {
    switch (status) {
        case "healthy":
            return "Great choice for regular eating!"
        case "moderate":
            return "Enjoy in moderation."
        case "unhealthy":
            return "Consider swapping for a healthier option."
        default:
            return ""
    }
}

// --- Price Formatting Helper ---
export const formatPrice = (price) => {
    return `₹${price.toFixed(0)}`
}

// --- Affordability Score to Text Helper ---
export const getAffordabilityText = (score) => {
    if (score >= 8) return "Very affordable"
    if (score >= 6) return "Affordable"
    if (score >= 4) return "Moderately priced"
    if (score >= 2) return "Somewhat expensive"
    return "Expensive"
}

// --- Comparison Helper ---
export const getComparisonHighlights = (originalProduct, alternativeProduct) => {
    if (!originalProduct || !alternativeProduct) return []

    const highlights = []
    const scoreDiff = alternativeProduct.healthScore - originalProduct.healthScore

    // Income suitability highlight
    const incomeRange = getIncomeRange()
    if (incomeRange && alternativeProduct.isIncomeRecommended) {
        highlights.push({ icon: "piggy-bank", text: "Budget-friendly choice", type: "positive" })
    }

    // Price comparison
    if (originalProduct.price > alternativeProduct.price) {
        const savings = originalProduct.price - alternativeProduct.price
        highlights.push({
            icon: "trending-down",
            text: `Save ₹${savings.toFixed(0)}`,
            type: "positive",
        })
    }

    // Basic comparison based on score difference
    if (scoreDiff > 15) {
        highlights.push({ icon: "trending-up", text: `Score +${scoreDiff}`, type: "positive" })
    } else if (scoreDiff > 5) {
        highlights.push({ icon: "arrow-up-circle", text: `Score +${scoreDiff}`, type: "positive" })
    }

    // Add generic positive points based on the alternative being "healthy"
    if (alternativeProduct.healthStatus === "healthy") {
        if (originalProduct.healthStatus !== "healthy") {
            highlights.push({ icon: "leaf", text: "More Natural", type: "positive" })
            // Add more specific simulated highlights if the original was unhealthy
            if (originalProduct.healthStatus === "unhealthy") {
                highlights.push({ icon: "minus-circle", text: "Less Sugar (Est.)", type: "positive" })
                highlights.push({ icon: "plus-circle", text: "More Fiber (Est.)", type: "positive" })
            }
        }
    }

    // Limit to max 3 highlights for brevity
    return highlights.slice(0, 3)
}
