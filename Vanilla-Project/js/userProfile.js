// userProfile.js - Handles user profile management including income information

const USER_PROFILE_KEY = "greencheck_user_profile"

// Income brackets
export const INCOME_BRACKETS = [
    { id: "low", range: "₹10,000-25,000", label: "₹10,000-25,000 per month" },
    { id: "medium_low", range: "₹25,000-50,000", label: "₹25,000-50,000 per month" },
    { id: "medium_high", range: "₹50,000-100,000", label: "₹50,000-100,000 per month" },
    { id: "high", range: "₹100,000+", label: "Above ₹100,000 per month" },
]

// Save user income to local storage
export const saveUserIncome = (incomeRange) => {
    const profile = getUserProfile() || {}
    profile.incomeRange = incomeRange
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))

    // Update the UI immediately after saving (important!)
    updateIncomeButtonUI(incomeRange);

    return profile
}

// Get the entire user profile object
export const getUserProfile = () => {
    const profileData = localStorage.getItem(USER_PROFILE_KEY)
    return profileData ? JSON.parse(profileData) : null
}

// Get just the income range from the user profile
export const getIncomeRange = () => {
    const profile = getUserProfile()
    return profile && profile.incomeRange ? profile.incomeRange : null
}

// Check if user has set their income range
export const hasIncomeRange = () => {
    return getIncomeRange() !== null
}

// Get income bracket from range id
export const getIncomeBracket = (incomeId) => {
    return INCOME_BRACKETS.find((bracket) => bracket.id === incomeId)
}

/**
 * Calculate affordability score (0-10) for a product based on income range.
 * MODIFIED: Adjusted thresholds significantly for higher income ranges to make
 * affordability less of a limiting factor, allowing health/value to dominate ranking.
 */
export const calculateAffordabilityScore = (productPrice, userIncomeRange) => {
    // Define income-to-affordability mappings with different thresholds
    const incomeThresholds = {
        // Stricter thresholds for lower income
        low: { maxPrice: 50, idealPrice: 20 },
        medium_low: { maxPrice: 100, idealPrice: 40 },
        // More lenient thresholds for higher income
        medium_high: { maxPrice: 250, idealPrice: 100 }, // Increased max/ideal
        high: { maxPrice: 600, idealPrice: 200 },  // Significantly increased max/ideal
    }

    const threshold = incomeThresholds[userIncomeRange]
    if (!threshold) return 5 // Default middle score if range is unknown

    if (productPrice <= threshold.idealPrice) {
        return 10 // Perfect affordability for this bracket
    } else if (productPrice > threshold.maxPrice) {
        return 0 // Still unaffordable if above the max for this bracket
    } else {
        // Linear interpolation between ideal and max FOR THIS BRACKET
        // A wider gap between ideal/max for high income means scores decrease slower
        const score = 10 * (1 - (productPrice - threshold.idealPrice) / (threshold.maxPrice - threshold.idealPrice))
        // Ensure score is between 0 and 10
        return Math.max(0, Math.min(10, score));
    }
}

// Check if a product is suitable for the user's income (uses pre-defined suitability from data.js)
export const isProductSuitableForIncome = (product, userIncomeRange) => {
    if (!product || !userIncomeRange) return true // Default to suitable if info is missing

    // This check remains based on the hardcoded `incomeSuitability` array in data.js
    // It acts as a basic filter before scoring happens.
    return product.incomeSuitability && product.incomeSuitability.includes(userIncomeRange)
}

// Initialize the income profile modal (to be called on app startup)
export const initIncomeProfileModal = () => {
    // Create modal only if it doesn't exist yet
    if (!document.getElementById("income-profile-modal")) {
        createIncomeProfileModal()
    }
}

// Create the income profile modal UI
const createIncomeProfileModal = () => {
    const modalHTML = `
        <div id="income-profile-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i data-lucide="wallet"></i> Set Your Income Range</h2>
                    <button id="close-income-modal" class="close-button">×</button>
                </div>
                <div class="modal-body">
                    <p>To get personalized food recommendations that fit your budget, please select your income range.</p>
                    <p class="privacy-note"><i data-lucide="shield"></i> This information is stored only on your device and never shared.</p>

                    <div class="income-brackets">
                        ${INCOME_BRACKETS.map(
        (bracket) => `
                            <div class="income-option">
                                <input type="radio" name="income-bracket" id="${bracket.id}" value="${bracket.id}">
                                <label for="${bracket.id}">${bracket.label}</label>
                            </div>
                        `,
    ).join("")}
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="save-income" class="kawaii-button primary gradient-button">Save & Continue</button>
                </div>
            </div>
        </div>
    `

    // Append modal to body
    const modalContainer = document.createElement("div")
    modalContainer.innerHTML = modalHTML
    document.body.appendChild(modalContainer.firstElementChild)

    // Initialize Lucide icons
    if (typeof lucide !== "undefined") {
        lucide.createIcons()
    }

    // Add event listeners
    document.getElementById("close-income-modal").addEventListener("click", hideIncomeModal)
    document.getElementById("save-income").addEventListener("click", saveIncomeFromModal)

    // Pre-select income if already set
    const currentIncome = getIncomeRange()
    if (currentIncome) {
        const radioBtn = document.getElementById(currentIncome)
        if (radioBtn) radioBtn.checked = true
    }
}

// Show the income profile modal
export const showIncomeModal = () => {
    let modal = document.getElementById("income-profile-modal")
    if (!modal) {
        createIncomeProfileModal()
        modal = document.getElementById("income-profile-modal"); // Re-fetch after creation
    }

    // Pre-select current income range when opening
    const currentIncome = getIncomeRange();
    if (currentIncome) {
        const radioBtn = document.getElementById(currentIncome);
        if (radioBtn) radioBtn.checked = true;
        else {
            // If current income exists but no matching button, uncheck all
            const allRadios = document.querySelectorAll('input[name="income-bracket"]');
            allRadios.forEach(radio => radio.checked = false);
        }
    } else {
        // If no income set, uncheck all
        const allRadios = document.querySelectorAll('input[name="income-bracket"]');
        allRadios.forEach(radio => radio.checked = false);
    }


    modal.style.display = "block"
    // Add keyboard escape functionality
    document.addEventListener("keydown", handleEscapeKeyForModal)
}

// Hide the income profile modal
export const hideIncomeModal = () => {
    const modal = document.getElementById("income-profile-modal")
    if (modal) modal.style.display = "none"
    // Remove keyboard listener
    document.removeEventListener("keydown", handleEscapeKeyForModal)
}

// Handle escape key press for the modal
const handleEscapeKeyForModal = (e) => {
    if (e.key === "Escape") {
        hideIncomeModal()
    }
}

// Function to update the income button UI
const updateIncomeButtonUI = (incomeRange) => {
    const incomeButton = document.getElementById("income-settings-button");
    if (incomeButton) {
        const incomeBracket = getIncomeBracket(incomeRange);
        if (incomeBracket) {
            incomeButton.innerHTML = `<i data-lucide="wallet"></i> ${incomeBracket.range}`;
            incomeButton.classList.remove('highlighted-button'); // Remove highlight after setting
            const notificationDot = incomeButton.querySelector('.notification-dot');
            if (notificationDot) notificationDot.remove(); // Remove dot
        } else {
            // Handle case where incomeRange is somehow invalid or unset
            incomeButton.innerHTML = `<i data-lucide="wallet"></i> Set Income Range <span class="notification-dot"></span>`;
            incomeButton.classList.add('highlighted-button');
        }
        // Re-initialize the icon
        if (typeof lucide !== "undefined") {
            lucide.createIcons();
        }
        // Add visual feedback
        incomeButton.classList.add("update-flash");
        setTimeout(() => {
            incomeButton.classList.remove("update-flash");
        }, 1500);
    }
};


// Save income from the modal form
const saveIncomeFromModal = () => {
    const selectedOption = document.querySelector('input[name="income-bracket"]:checked')
    if (selectedOption) {
        const incomeRange = selectedOption.value
        saveUserIncome(incomeRange) // This now calls updateIncomeButtonUI
        hideIncomeModal()

        // Show success toast if function exists
        if (typeof showToast === "function") {
            showToast("Income range saved successfully!", "success")
        }

        // No need to manually update button here, saveUserIncome handles it


        // Refresh recommendations if already viewing a product
        const productCardContainer = document.getElementById("product-card-container")
        if (productCardContainer && productCardContainer.querySelector(".product-card")) {
            // Trigger a refresh of the current product view
            const currentBarcodeInput = document.getElementById("barcode-input")
            // Check if displayProductAndAlternatives exists globally or via import
            if (currentBarcodeInput && currentBarcodeInput.value && typeof window.displayProductAndAlternatives === "function") {
                // Use window scope explicitly if it's globally attached
                window.displayProductAndAlternatives(currentBarcodeInput.value);
            } else if (typeof displayProductAndAlternatives === "function") {
                // Use imported function if available
                displayProductAndAlternatives(currentBarcodeInput.value)
            } else {
                console.warn("displayProductAndAlternatives function not available to refresh view.")
            }
        }
    } else {
        // Show error toast if function exists
        if (typeof showToast === "function") {
            showToast("Please select an income range", "error")
        }
    }
}

// --- Globals ---
// These might be needed if ui.js or other modules directly call functions here
// For now, keep dependency low. If needed, re-introduce initGlobals.

// Ensure Lucide is available globally or passed correctly
const lucide = window.lucide;
let showToast; // Assumed to be available via initGlobals or similar mechanism later
let displayProductAndAlternatives; // Assumed to be available later

// Function to initialize dependent functions (called from main.js)
export const initGlobals = (toastFn, displayFn) => {
    showToast = toastFn;
    displayProductAndAlternatives = displayFn; // Store the reference
};