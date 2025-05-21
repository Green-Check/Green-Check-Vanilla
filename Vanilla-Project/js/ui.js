// js/ui.js
import {
    getStatusBadgeClass,
    getStatusIcon,
    getHealthScoreClass,
    getScoreBarClass,
    getSuitabilityText,
    getComparisonHighlights,
    formatPrice,
    getAffordabilityText,
} from "./utils.js"
import { getIncomeRange, getIncomeBracket, showIncomeModal } from "./userProfile.js"
import { hasValidGeminiKey } from "./recommendations.js"
const lucide = window.lucide
const Toastify = window.Toastify

// --- DOM Elements ---
export const barcodeForm = document.getElementById("barcode-form")
export const barcodeInput = document.getElementById("barcode-input")
export const productCardContainer = document.getElementById("product-card-container")
export const alternativesContainer = document.getElementById("alternatives-container")
export const exampleButtonsContainer = document.getElementById("example-buttons")
export const scanButton = document.getElementById("scan-button")
export const formContainer = document.getElementById("barcode-form-container")
export const barcodeFormSection = document.getElementById("barcode-form-section")
export const loadingIndicator = document.getElementById("loading-indicator")
export const mainNav = document.getElementById("main-nav")
export const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
export const navMenuLinks = document.getElementById("nav-menu-links")

// --- NEW Scanner DOM Elements ---
export const scannerContainer = document.getElementById("scanner-container")
export const scannerVideo = document.getElementById("scanner-video")
export const cancelScanButton = document.getElementById("cancel-scan-button")
export const footer = document.getElementById("footer")
export const currentYearSpan = document.getElementById("current-year")
export const header = document.getElementById("header")

// Add income settings button to the action buttons section
export const addIncomeSettingsButton = () => {
    // Check if action buttons container exists
    const actionButtons = document.querySelector(".action-buttons")
    if (!actionButtons || document.getElementById("income-settings-button")) {
        return // Already exists or no container
    }

    const incomeRange = getIncomeRange()
    const incomeBracket = incomeRange ? getIncomeBracket(incomeRange) : null

    const buttonHTML = `
          <button id="income-settings-button" class="kawaii-button income-button highlighted-button">
              <i data-lucide="wallet"></i>
              ${incomeBracket ? `${incomeBracket.range}` : "Set Income Range"}
              ${!incomeRange ? '<span class="notification-dot"></span>' : ""}
          </button>
      `

    // Insert the income button at the beginning of action buttons
    actionButtons.insertAdjacentHTML("afterbegin", buttonHTML)

    // Initialize the icon
    if (typeof lucide !== "undefined") {
        lucide.createIcons()
    }

    // Add event listener
    document.getElementById("income-settings-button").addEventListener("click", () => {
        showIncomeModal()
    })
}

// --- Toast Notification --- (Remains the same)
export const showToast = (message, type = "info") => {
    const background =
        type === "success"
            ? "linear-gradient(to right, #34d399, #4ade80)"
            : type === "error"
                ? "linear-gradient(to right, #f87171, #fb923c)"
                : type === "info"
                    ? "linear-gradient(to right, #60a5fa, #38bdf8)"
                    : "linear-gradient(to right, #a8a29e, #78716c)"

    Toastify({
        text: message,
        duration: 3500,
        close: true,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
        style: {
            background: background,
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            fontFamily: "'Poppins', sans-serif",
            fontSize: "1rem",
            fontWeight: "500",
            padding: "14px 20px",
            textAlign: "center",
            maxWidth: "400px",
            margin: "0 auto 20px auto",
        },
        offset: { y: 30 },
    }).showToast()
}

// --- Loading Indicator Control --- (Remains the same)
export const showLoading = () => {
    if (loadingIndicator) {
        loadingIndicator.classList.add("visible")
        loadingIndicator.setAttribute("aria-busy", "true")
    }
    if (barcodeInput) barcodeInput.disabled = true
    if (barcodeForm) barcodeForm.querySelector('button[type="submit"]').disabled = true
    if (scanButton) scanButton.disabled = true
    if (exampleButtonsContainer) {
        exampleButtonsContainer.querySelectorAll("button").forEach((btn) => (btn.disabled = true))
    }
    const incomeButton = document.getElementById("income-settings-button")
    if (incomeButton) incomeButton.disabled = true
}
export const hideLoading = () => {
    if (loadingIndicator) {
        setTimeout(() => {
            loadingIndicator.classList.remove("visible")
            loadingIndicator.setAttribute("aria-busy", "false")
        }, 100)
    }
    if (barcodeInput) barcodeInput.disabled = false
    if (barcodeForm) barcodeForm.querySelector('button[type="submit"]').disabled = false
    if (scanButton) scanButton.disabled = false
    if (exampleButtonsContainer) {
        exampleButtonsContainer.querySelectorAll("button").forEach((btn) => (btn.disabled = false))
    }
    const incomeButton = document.getElementById("income-settings-button")
    if (incomeButton) incomeButton.disabled = false
}

// --- HTML Generation ---

// Updated createProductCardHTML with improved structure and styling
export const createProductCardHTML = (product) => {
    const statusClass = product.healthStatus
    const badgeClass = getStatusBadgeClass(statusClass)
    const badgeIconName = getStatusIcon(statusClass)
    const scoreClass = getHealthScoreClass(product.healthScore)
    const scoreBarClass = getScoreBarClass(statusClass)
    const suitabilityText = getSuitabilityText(statusClass)
    const formattedPrice = formatPrice(product.price)
    const incomeRange = getIncomeRange()
    const incomeSuitable = incomeRange && product.incomeSuitability && product.incomeSuitability.includes(incomeRange)

    return `
          <div class="product-card ${statusClass} ${incomeSuitable ? "income-suitable" : ""}" id="product-${product.id}">
              <div class="product-image-container">
                  <img src="${product.image}" alt="${product.name}" loading="lazy">
                  <div class="product-brand">${product.brand}</div>
                  <div class="product-price">${formattedPrice}</div>
              </div>
              <div class="product-details">
                  <div class="product-header">
                      <div class="product-title-badge">
                           <span class="kawaii-badge ${badgeClass}">
                              <i data-lucide="${badgeIconName}"></i> ${product.healthStatus}
                           </span>
                          <h2>${product.name}</h2>
                      </div>
                      <div class="product-meta">
                          <p>Barcode: ${product.barcode}</p>
                          <p><i data-lucide="refresh-cw" class="icon"></i> Info as of: ${product.lastUpdated}</p>
                      </div>
                  </div>
  
                  <p class="product-description">${product.description}</p>
  
                  <div class="health-score-bar-container">
                      <div class="label">
                          <span>Health Score</span>
                          <span class="score-value ${scoreClass}">${product.healthScore}/100</span>
                      </div>
                      <div class="score-bar-bg">
                          <div class="score-bar-fg ${scoreBarClass}" style="width: 0%;" data-score="${product.healthScore}"></div>
                      </div>
                      <p class="product-suitability">${suitabilityText}</p>
                  </div>
  
                  <div class="product-stats">
                      <div class="stat-block">
                          <h3><i data-lucide="flame" class="icon"></i> Calories</h3>
                          <span class="value">${product.calories}</span>
                          <p class="unit">${product.servingSize}</p>
                      </div>
                      <div class="stat-block">
                           <h3><i data-lucide="gauge" class="icon"></i> Nutrients</h3>
                          <div class="nutrient-list">
                              <div><span>Carbs</span> <span>${product.nutrients.carbs}g</span></div>
                              <div><span>Protein</span> <span>${product.nutrients.protein}g</span></div>
                              <div><span>Fat</span> <span>${product.nutrients.fat}g</span></div>
                          </div>
                      </div>
                  </div>
  
                  <div class="product-info-sections">
                      <div class="info-section">
                          <div class="header"><i data-lucide="clipboard-list" class="icon"></i><h3>Ingredients</h3></div>
                          <p>${product.ingredients.join(", ")}</p>
                      </div>
                      <div class="info-section allergens">
                           <div class="header"><i data-lucide="alert-triangle" class="icon"></i><h3>Allergens</h3></div>
                          <p>${product.allergens}</p>
                      </div>
                      <div class="info-section pricing">
                           <div class="header"><i data-lucide="tag" class="icon"></i><h3>Price Information</h3></div>
                           <div class="price-details">
                              <div><span>Price:</span> <span>${formattedPrice}</span></div>
                              <div><span>Per Serving:</span> <span>${formatPrice(product.pricePerServing)}</span></div>
                              <div><span>Value Rating:</span> <span>${product.valueRating}/10</span></div>
                              ${incomeSuitable
            ? `<div class="income-suitable-tag"><i data-lucide="check"></i> Suitable for your income range</div>`
            : ""
        }
                           </div>
                      </div>
                  </div>
              </div>
          </div>
      `
}

// Updated createAlternativesHTML to include income-based recommendations
export const createAlternativesHTML = (alternatives, originalProduct) => {
    if (!alternatives || alternatives.length === 0) {
        return ""
    }

    const incomeRange = getIncomeRange()
    const incomeBracket = incomeRange ? getIncomeBracket(incomeRange) : null

    // Add income range information if available
    const incomeRangeHTML = incomeBracket
        ? `
          <div class="income-range-info">
              <p><i data-lucide="wallet"></i> Showing alternatives suitable for ${incomeBracket.label}</p>
          </div>
      `
        : ""

    // Information about AI API status
    let aiEnhancementHTML = ""

    if (hasValidGeminiKey()) {
        // API is available - show enhancement message
        aiEnhancementHTML = `
              <div class="income-range-info" style="background-color: var(--primary-light); border: 1px solid var(--primary); margin-top: 1rem;">
                  <p><i data-lucide="cpu"></i> Enhanced with AI for personalized recommendations</p>
              </div>
          `
    } else {
        // API is unavailable - show info message with instructions
        aiEnhancementHTML = `
              <div class="income-range-info" style="background-color: lightgreen; border: 1px solid #ffb74d; margin-top: 1rem;">
                  <p><i data-lucide="info"></i> Here are your recommendations </p>
              </div>
          `
    }

    const alternativeCardsHTML = alternatives
        .map((alt) => {
            const highlights = getComparisonHighlights(originalProduct, alt)
            const highlightsHTML = highlights
                .map(
                    (h) => `
              <span class="comparison-highlight ${h.type || ""}">
                  <i data-lucide="${h.icon}"></i> ${h.text}
              </span>
          `,
                )
                .join("")

            // Income recommendation section
            const incomeRecommendationHTML = alt.isIncomeRecommended
                ? `
              <div class="income-recommendation">
                  <span class="income-badge">
                      <i data-lucide="piggy-bank"></i> Great for your budget
                  </span>
                  <p>${alt.recommendationReason}</p>
                  ${alt.budgetInsight ? `<p class="budget-insight"><i data-lucide="trending-up"></i> ${alt.budgetInsight}</p>` : ""}
                  
                  <div class="affordability-meter">
                      <span class="affordability-label">${getAffordabilityText(alt.affordabilityScore)}</span>
                      <div class="affordability-bar">
                          <div class="affordability-fill" style="width: ${alt.affordabilityScore * 10}%;"></div>
                      </div>
                  </div>
              </div>
          `
                : ""

            return `
              <div class="alternative-card ${alt.isIncomeRecommended ? "income-recommended" : ""}" id="alt-${alt.id}">
                   <div class="alternative-image-container">
                      <img src="${alt.image}" alt="${alt.name}" loading="lazy">
                      <span class="alternative-score">Score: ${alt.healthScore}</span>
                      <span class="alternative-price">${formatPrice(alt.price)}</span>
                   </div>
                  <div class="alternative-details">
                      <h3>${alt.name}</h3>
                       <span class="alternative-tag">
                           <i data-lucide="sparkles"></i> Healthier Choice
                       </span>
                      <p class="alternative-description">${alt.description}</p>
  
                      ${highlightsHTML
                    ? `
                      <div class="alternative-comparison">
                          <h4><i data-lucide="bar-chart-2"></i> Why it's better:</h4>
                          ${highlightsHTML}
                      </div>
                      `
                    : ""
                }
  
                      ${incomeRecommendationHTML}
                  </div>
              </div>
          `
        })
        .join("")

    return `
          <h2 id="alternatives-heading">
              <i data-lucide="lightbulb" class="icon"></i>
              Healthier Alternatives
          </h2>
          ${incomeRangeHTML}
          ${aiEnhancementHTML}
          <div class="alternatives-grid">
              ${alternativeCardsHTML}
          </div>
      `
}
