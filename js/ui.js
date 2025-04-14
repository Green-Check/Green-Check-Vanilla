// js/ui.js
import { getStatusBadgeClass, getStatusIcon, getHealthScoreClass, getScoreBarClass, getSuitabilityText, getComparisonHighlights } from './utils.js'; // Import getComparisonHighlights

// --- DOM Elements ---
export const barcodeForm = document.getElementById('barcode-form');
export const barcodeInput = document.getElementById('barcode-input');
export const productCardContainer = document.getElementById('product-card-container');
export const alternativesContainer = document.getElementById('alternatives-container');
export const exampleButtonsContainer = document.getElementById('example-buttons');
export const scanButton = document.getElementById('scan-button');
export const uploadButton = document.getElementById('upload-button');
export const uploadInput = document.getElementById('upload-input');
export const footer = document.getElementById('footer');
export const currentYearSpan = document.getElementById('current-year');
export const header = document.getElementById('header');
export const formContainer = document.getElementById('barcode-form-container');
export const barcodeFormSection = document.getElementById('barcode-form-section');
export const loadingIndicator = document.getElementById('loading-indicator');
export const mainNav = document.getElementById('main-nav');
export const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
export const navMenuLinks = document.getElementById('nav-menu-links');

// --- NEW Scanner DOM Elements ---
export const scannerContainer = document.getElementById('scanner-container');
export const scannerVideo = document.getElementById('scanner-video');
export const cancelScanButton = document.getElementById('cancel-scan-button');


// --- Toast Notification --- (Remains the same)
export const showToast = (message, type = 'info') => {
    const background =
        type === 'success' ? 'linear-gradient(to right, #34d399, #4ade80)' :
            type === 'error' ? 'linear-gradient(to right, #f87171, #fb923c)' :
                type === 'info' ? 'linear-gradient(to right, #60a5fa, #38bdf8)' :
                    'linear-gradient(to right, #a8a29e, #78716c)';

    Toastify({
        text: message, duration: 3500, close: true, gravity: "bottom", position: "center", stopOnFocus: true,
        style: {
            background: background, borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            fontFamily: "'Poppins', sans-serif", fontSize: "1rem", fontWeight: "500", padding: "14px 20px",
            textAlign: "center", maxWidth: "400px", margin: "0 auto 20px auto"
        },
        offset: { y: 30 },
    }).showToast();
};


// --- Loading Indicator Control --- (Remains the same)
export const showLoading = () => {
    if (loadingIndicator) { loadingIndicator.classList.add('visible'); loadingIndicator.setAttribute('aria-busy', 'true'); }
    if (barcodeInput) barcodeInput.disabled = true;
    if (barcodeForm) barcodeForm.querySelector('button[type="submit"]').disabled = true;
    if (scanButton) scanButton.disabled = true;
    if (uploadButton) uploadButton.disabled = true;
    if (exampleButtonsContainer) { exampleButtonsContainer.querySelectorAll('button').forEach(btn => btn.disabled = true); }
};
export const hideLoading = () => {
    if (loadingIndicator) { setTimeout(() => { loadingIndicator.classList.remove('visible'); loadingIndicator.setAttribute('aria-busy', 'false'); }, 100); }
    if (barcodeInput) barcodeInput.disabled = false;
    if (barcodeForm) barcodeForm.querySelector('button[type="submit"]').disabled = false;
    if (scanButton) scanButton.disabled = false;
    if (uploadButton) uploadButton.disabled = false;
    if (exampleButtonsContainer) { exampleButtonsContainer.querySelectorAll('button').forEach(btn => btn.disabled = false); }
};


// --- HTML Generation ---

// createProductCardHTML (No changes needed)
export const createProductCardHTML = (product) => {
    const statusClass = product.healthStatus;
    const badgeClass = getStatusBadgeClass(statusClass);
    const badgeIconName = getStatusIcon(statusClass);
    const scoreClass = getHealthScoreClass(product.healthScore);
    const scoreBarClass = getScoreBarClass(statusClass);
    const suitabilityText = getSuitabilityText(statusClass);

    return `
        <div class="product-card ${statusClass}" id="product-${product.id}">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <div class="product-brand">${product.brand}</div>
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
                </div>
            </div>
        </div>
    `;
};


// createAlternativesHTML (No changes needed)
export const createAlternativesHTML = (alternatives, originalProduct) => {
    if (!alternatives || alternatives.length === 0) {
        return '';
    }

    const alternativeCardsHTML = alternatives.map(alt => {
        const highlights = getComparisonHighlights(originalProduct, alt);
        const highlightsHTML = highlights.map(h => `
            <span class="comparison-highlight ${h.type || ''}">
                <i data-lucide="${h.icon}"></i> ${h.text}
            </span>
        `).join('');

        return `
            <div class="alternative-card" id="alt-${alt.id}">
                 <div class="alternative-image-container">
                    <img src="${alt.image}" alt="${alt.name}" loading="lazy">
                    <span class="alternative-score">Score: ${alt.healthScore}</span>
                 </div>
                <div class="alternative-details">
                    <h3>${alt.name}</h3>
                     <span class="alternative-tag">
                         <i data-lucide="sparkles"></i> Healthier Choice
                     </span>
                    <p class="alternative-description">${alt.description}</p>

                    ${highlightsHTML ? `
                    <div class="alternative-comparison">
                        <h4><i data-lucide="bar-chart-2"></i> Why it's better:</h4>
                        ${highlightsHTML}
                    </div>
                    ` : ''}

                    <div class="alternative-info">
                         <div class="alt-info-block"> ... </div>
                         <div class="alt-info-block"> ... </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    return `
        <h2 id="alternatives-heading">
            <i data-lucide="lightbulb" class="icon"></i>
            Healthier Alternatives
        </h2>
        <div class="alternatives-grid">
            ${alternativeCardsHTML}
        </div>
    `;
};