// recommendations.js - Hybrid approach for income-based food recommendations

// Import necessary functions, including the MODIFIED calculateAffordabilityScore
import { getIncomeRange, calculateAffordabilityScore, isProductSuitableForIncome } from "./userProfile.js";

// Constants for fine-tuning the recommendation algorithm (remain the same)
const HEALTH_WEIGHT = 0.5; // How much health score matters
const AFFORDABILITY_WEIGHT = 0.35; // How much affordability matters
const VALUE_WEIGHT = 0.15; // How much value for money matters

// --- IMPORTANT SECURITY WARNING ---
// Placeholder API Key - Replace or use secure methods for production
const AI_API_KEY = "YOUR_GEMINI_API_KEY"; // Replace with your actual key or use secure handling

/**
 * Check if a valid API key is available (Simple check - replace placeholder)
 * @returns {Boolean} Whether the API key seems available
 */
export const hasValidGeminiKey = () => {
    // More robust check: Ensure it's not the placeholder and has reasonable length
    return !!AI_API_KEY && AI_API_KEY !== "YOUR_GEMINI_API_KEY" && AI_API_KEY.length > 10;
};

/**
 * Hybrid recommendation system that combines local processing with optional AI
 * @param {Object} scannedProduct - The product that was scanned
 * @param {Array} alternativeProducts - List of all available alternatives
 * @param {Boolean} useAI - Whether to use AI API for enhanced recommendations
 * @returns {Array} Sorted and enhanced alternatives with recommendation metadata
 */
export const getIncomeFriendlyAlternatives = async (scannedProduct, alternativeProducts, useAI = false) => {
    const incomeRange = getIncomeRange() || "medium_low"; // Default if not set

    // 1. Basic Filter: Remove products explicitly marked as unsuitable for the income range in data.js
    const suitableAlternatives = alternativeProducts.filter((product) =>
        isProductSuitableForIncome(product, incomeRange)
    );

    if (suitableAlternatives.length === 0) {
        return []; // No alternatives pass the basic suitability filter
    }

    // 2. Scoring: Calculate scores for each remaining alternative
    const scoredAlternatives = suitableAlternatives.map((alt) => {
        // *** CRITICAL STEP ***: Calculate affordability based on price AND income range
        // This score is now sensitive to income due to changes in userProfile.js
        const affordabilityScore = calculateAffordabilityScore(alt.price, incomeRange);

        // Calculate health improvement relative to the scanned product
        const healthImprovement = Math.min(10, Math.max(0, (alt.healthScore - scannedProduct.healthScore) / 5));

        // Get the pre-defined value rating
        const valueRating = alt.valueRating || 5; // Default to 5 if not provided

        // Combine scores using weights
        // The *influence* of affordabilityScore now varies with income range indirectly
        const combinedScore =
            healthImprovement * HEALTH_WEIGHT +
            affordabilityScore * AFFORDABILITY_WEIGHT +
            valueRating * VALUE_WEIGHT;

        // Generate a basic reason based on scores (can be enhanced by AI later)
        let reason = "";
        if (affordabilityScore >= 8) reason += "Great value for your budget. ";
        else if (affordabilityScore >= 5) reason += "Reasonably priced. "
        if (healthImprovement >= 5) reason += "Significantly healthier. ";
        else if (healthImprovement >= 2) reason += "Healthier choice. ";
        if (valueRating >= 8) reason += "Excellent value rating. ";
        else if (valueRating >= 6) reason += "Good value rating. ";
        const savings = scannedProduct.price - alt.price;
        if (savings > 10) reason += `Saves ~₹${savings.toFixed(0)}. `; // Only mention significant savings

        return {
            ...alt,
            affordabilityScore, // Keep for display/debugging
            healthImprovement, // Keep for display/debugging
            combinedScore, // The final score used for sorting
            isIncomeRecommended: combinedScore >= 5, // Basic flag based on score threshold
            recommendationReason: reason.trim(), // Initial reason
        };
    });

    // 3. Sorting:
    // *** MODIFIED SORTING LOGIC ***
    let sortedAlternatives;
    if (incomeRange === 'high') {
        // For 'high' income, sort strictly by PRICE descending (most expensive first)
        console.log("Sorting alternatives by PRICE DESCENDING for high income range."); // Added log
        sortedAlternatives = scoredAlternatives.sort((a, b) => b.price - a.price);
    } else {
        // For all other income ranges, sort by the COMBINED SCORE descending (higher score is better)
        console.log(`Sorting alternatives by COMBINED SCORE for ${incomeRange} income range.`); // Added log
        sortedAlternatives = scoredAlternatives.sort((a, b) => b.combinedScore - a.combinedScore);
    }
    // *** END OF MODIFIED SORTING LOGIC ***

    // 4. Optional AI Enhancement (Does NOT re-rank, only improves text)
    if (useAI && sortedAlternatives.length > 0 && hasValidGeminiKey()) {
        try {
            console.log("Attempting AI enhancement for descriptions...");
            const enhancedAlternatives = await enhanceWithAI(scannedProduct, sortedAlternatives, incomeRange);
            console.log("AI enhancement applied (or skipped if failed).");
            return enhancedAlternatives; // Return AI-enhanced list
        } catch (error) {
            console.error("AI Enhancement failed, returning basic recommendations:", error);
            // Fall back to non-AI-enhanced but correctly sorted recommendations
            return sortedAlternatives;
        }
    } else {
        // Log why AI wasn't used if applicable
        if (useAI && !hasValidGeminiKey()) {
            console.warn("AI Enhancement skipped: No valid API key found or key is placeholder in recommendations.js");
        } else if (useAI && sortedAlternatives.length === 0) {
            console.warn("AI Enhancement skipped: No suitable alternatives after scoring to enhance.");
        }
        // Return the locally scored and sorted list
        return sortedAlternatives;
    }
};

/**
 * Enhance recommendations with AI API (Function remains the same - no changes needed here)
 * @param {Object} scannedProduct - Original product
 * @param {Array} alternatives - Locally processed alternatives
 * @param {String} incomeRange - User's income range
 * @returns {Array} Enhanced alternatives with better descriptions
 */
const enhanceWithAI = async (scannedProduct, alternatives, incomeRange) => {
    if (!hasValidGeminiKey()) {
        console.warn("Attempted AI enhancement but API key is invalid or placeholder.");
        return alternatives; // Don't proceed without a key
    }

    const topAlternatives = alternatives.slice(0, 3); // Limit for efficiency/cost

    // Check if there are any alternatives to enhance
    if (topAlternatives.length === 0) {
        console.log("No alternatives provided to enhanceWithAI.");
        return alternatives; // Return the empty or original list
    }

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: `
                Enhance the recommendations for alternative food products based on the following criteria:

                USER'S INCOME RANGE: ${incomeRange}

                SCANNED PRODUCT:
                ${JSON.stringify(
                            {
                                name: scannedProduct.name,
                                description: scannedProduct.description,
                                price: scannedProduct.price,
                                healthScore: scannedProduct.healthScore,
                                category: scannedProduct.category,
                                healthStatus: scannedProduct.healthStatus,
                            },
                            null,
                            2,
                        )}

                TOP ALTERNATIVES (ALREADY RANKED BY PRICE DESC FOR HIGH INCOME, SCORE DESC OTHERWISE):
                ${JSON.stringify(
                            topAlternatives.map((alt) => ({
                                id: alt.id, // Make sure ID is included
                                name: alt.name,
                                description: alt.description,
                                price: alt.price,
                                healthScore: alt.healthScore,
                                healthStatus: alt.healthStatus,
                                currentReason: alt.recommendationReason, // Give context
                            })),
                            null,
                            2,
                        )}

                For each alternative provided above, return:
                1. enhancedReason: A concise (1-2 sentence) personalized reason highlighting why this specific alternative is a good swap for the scanned product, considering the user's ${incomeRange} income and the alternative's ranking. If sorting by price (high income), acknowledge the price point. Mention key health benefits if significantly different. Focus on positive aspects.
                2. budgetInsight: A short, specific, actionable budget-related insight (e.g., "Top-tier price, premium choice", "Mid-range price, solid value", "Most affordable option"). Be direct based on its price ranking.

                Return ONLY JSON in this exact format (no extra text, explanations, or markdown):
                {
                  "enhancedRecommendations": [
                    {
                      "id": "product_id_here",
                      "enhancedReason": "Your concise personalized reason here.",
                      "budgetInsight": "Your specific budget insight here."
                    }
                  ]
                }
                Make sure the 'id' field in the response matches the 'id' of the alternatives provided. Include an entry for each alternative sent.
                `, // Updated prompt slightly for AI context
                    },
                ],
            },
        ],
        // Add safety settings (adjust thresholds as needed)
        "safetySettings": [
            { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
            { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
            { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" },
            { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE" }
        ]
    };

    try {
        console.log("Sending request to AI API...");
        const response = await fetch(
            // Ensure the model name is correct (e.g., gemini-1.5-flash-latest or gemini-pro)
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${AI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            },
        );

        const responseBody = await response.text(); // Get raw response text first

        if (!response.ok) {
            console.error("AI API Error Response Status:", response.status);
            console.error("AI API Error Response Body:", responseBody);
            try {
                const errorJson = JSON.parse(responseBody);
                if (errorJson.error && errorJson.error.message) {
                    // Check for specific API key errors
                    if (errorJson.error.message.includes("API key not valid")) {
                        console.error("AI API Key is invalid. Please check recommendations.js");
                        throw new Error(`API error: Invalid API Key`);
                    }
                    // Check for billing issues
                    if (errorJson.error.message.includes("billing account")) {
                        console.error("AI API Billing issue. Please check your Google Cloud Project billing status.");
                        throw new Error(`API error: Billing issue`);
                    }
                    throw new Error(`API error: ${response.status} - ${errorJson.error.message}`);
                }
            } catch (e) { /* Ignore if body wasn't JSON */ }
            throw new Error(`API error: ${response.status}`); // Generic fallback
        }

        // If response is OK, parse the JSON
        const data = JSON.parse(responseBody);
        // console.log("Raw AI Response Data:", JSON.stringify(data, null, 2)); // Debug log

        // Defensive coding: Check response structure before accessing parts
        if (!data.candidates || !Array.isArray(data.candidates) || data.candidates.length === 0) {
            if (data.promptFeedback && data.promptFeedback.blockReason) {
                console.error("AI Request Blocked:", data.promptFeedback.blockReason, data.promptFeedback.safetyRatings);
                throw new Error(`AI request blocked due to safety settings (${data.promptFeedback.blockReason}).`);
            }
            console.error("Unexpected AI response structure: 'candidates' array missing or empty.", data);
            throw new Error("AI response missing 'candidates'.");
        }
        const candidate = data.candidates[0];
        if (!candidate.content || !candidate.content.parts || !Array.isArray(candidate.content.parts) || candidate.content.parts.length === 0) {
            console.error("Unexpected AI response structure: 'content.parts' missing or empty.", data);
            throw new Error("AI response missing 'content.parts'.");
        }
        const responsePart = candidate.content.parts[0];
        if (!responsePart.text) {
            console.error("Unexpected AI response structure: 'text' field missing in part.", data);
            throw new Error("AI response missing 'text'.");
        }

        const responseText = responsePart.text;
        // console.log("AI Response Text:", responseText); // Debug log

        // Parse the JSON *within* the response text
        let jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/); // Look for markdown code block
        let enhancedData;
        if (jsonMatch && jsonMatch[1]) {
            try {
                enhancedData = JSON.parse(jsonMatch[1]);
            } catch (parseError) {
                console.error("Failed to parse JSON within markdown block:", parseError, "\nContent:", jsonMatch[1]);
                throw new Error("Could not parse JSON from AI markdown response");
            }
        } else {
            try {
                enhancedData = JSON.parse(responseText); // Try parsing directly
            } catch (parseError) {
                console.error("Failed to parse AI responseText directly as JSON:", parseError, "\nContent:", responseText);
                throw new Error("Could not parse JSON directly from AI response text");
            }
        }

        // Validate the structure of the parsed JSON
        if (!enhancedData || !Array.isArray(enhancedData.enhancedRecommendations)) {
            console.error("Parsed AI JSON data is missing 'enhancedRecommendations' array:", enhancedData);
            throw new Error("Parsed AI JSON data structure is incorrect.");
        }

        // Merge the AI enhancements with our original alternatives
        return alternatives.map((alt) => {
            const enhancement = enhancedData.enhancedRecommendations.find((rec) => rec.id === alt.id);
            if (enhancement) {
                // console.log(`Enhancing alternative ID: ${alt.id}`); // Debug log
                return {
                    ...alt,
                    // Use enhanced reason/insight if available, otherwise keep original
                    recommendationReason: enhancement.enhancedReason || alt.recommendationReason,
                    budgetInsight: enhancement.budgetInsight || null, // Store budget insight separately
                };
            }
            return alt; // Return unchanged if no enhancement found
        });

    } catch (error) {
        console.error("Error during AI API call or processing:", error.message);
        // Return original alternatives if API call fails or parsing fails
        return alternatives;
    }
};