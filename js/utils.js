// utils.js
import { PRODUCTS, ALTERNATIVES } from './data.js';

// --- Data Access ---
export const findProductByBarcode = (barcode) => PRODUCTS.find(p => p.barcode === barcode);
export const getAlternativesForProduct = (productId) => ALTERNATIVES[productId] || [];

// --- Style/Class Helpers ---
export const getStatusBadgeClass = (status) => {
    switch (status) {
        case "healthy": return "badge-healthy";
        case "moderate": return "badge-moderate";
        case "unhealthy": return "badge-unhealthy";
        default: return "";
    }
};
export const getStatusIcon = (status) => {
    switch (status) {
        case "healthy": return `check-circle-2`; // Filled check
        case "moderate": return `alert-triangle`;
        case "unhealthy": return `alert-octagon`; // Different alert
        default: return "info";
    }
};
export const getHealthScoreClass = (score) => {
    if (score >= 70) return "health-score-green";
    if (score >= 40) return "health-score-yellow"; // Adjusted threshold
    return "health-score-red";
};
export const getScoreBarClass = (status) => {
    switch (status) {
        case "healthy": return "healthy";
        case "moderate": return "moderate";
        case "unhealthy": return "unhealthy";
        default: return "";
    }
};
export const getSuitabilityText = (status) => {
    switch (status) {
        case "healthy": return "Great choice for regular eating!";
        case "moderate": return "Enjoy in moderation.";
        case "unhealthy": return "Consider swapping for a healthier option.";
        default: return "";
    }
};


// --- *** NEW: Creative Comparison Helper *** ---
export const getComparisonHighlights = (originalProduct, alternativeProduct) => {
    if (!originalProduct || !alternativeProduct) return [];

    const highlights = [];
    const scoreDiff = alternativeProduct.healthScore - originalProduct.healthScore;

    // Basic comparison based on score difference (Simulated)
    if (scoreDiff > 15) {
        highlights.push({ icon: 'trending-up', text: `Score +${scoreDiff}`, type: 'positive' });
    } else if (scoreDiff > 5) {
        highlights.push({ icon: 'arrow-up-circle', text: `Score +${scoreDiff}`, type: 'positive' });
    }

    // Add generic positive points based on the alternative being "healthy" (Simulated)
    // In a real app, compare actual nutrient values (sugar, fiber, fat etc.)
    if (alternativeProduct.healthStatus === 'healthy') {
        if (originalProduct.healthStatus !== 'healthy') {
            highlights.push({ icon: 'leaf', text: 'More Natural', type: 'positive' });
            // Add more specific simulated highlights if the original was unhealthy
            if (originalProduct.healthStatus === 'unhealthy') {
                highlights.push({ icon: 'minus-circle', text: 'Less Sugar (Est.)', type: 'positive' }); // Example
                highlights.push({ icon: 'plus-circle', text: 'More Fiber (Est.)', type: 'positive' }); // Example
            }
        }
        if (originalProduct.calories > alternativeProduct.calories) { // Example calorie check
            // highlights.push({ icon: 'flame', text: 'Lower Calories (Est.)', type: 'positive'});
        }

    }

    // Limit to max 2-3 highlights for brevity
    return highlights.slice(0, 3);
};