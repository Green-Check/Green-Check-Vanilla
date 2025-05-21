// js/main.js
import { PRODUCTS } from "./data.js";
import { findProductByBarcode, getAlternativesForProduct } from "./utils.js";
import {
    showToast,
    createProductCardHTML,
    createAlternativesHTML,
    showLoading,
    hideLoading,
    barcodeForm,
    barcodeInput,
    productCardContainer,
    alternativesContainer,
    scanButton, // Button to trigger scanner start
    footer,
    currentYearSpan,
    header,
    barcodeFormSection,
    mainNav,
    mobileMenuToggle,
    navMenuLinks,
    scannerContainer, // The overlay element for the scanner view
    cancelScanButton, // Button to stop the scanner
    addIncomeSettingsButton,
} from "./ui.js";
import {
    initNavAnimation,
    initFormHeaderAnimation,
    initFooterAnimation,
    animateProductCardIn,
    animateAlternativesIn,
} from "./animations.js";
import {
    initIncomeProfileModal,
    hasIncomeRange,
    showIncomeModal,
    getIncomeRange,
} from "./userProfile.js";

// Initialize the global functions for userProfile.js
import { initGlobals } from "./userProfile.js";

// Replace these imports:
// import Quagga from "quagga" // Import Quagga
// import gsap from "gsap" // Import GSAP
// import * as lucide from "lucide-static" // Import Lucide

// With these declarations that reference the globally loaded libraries:
const Quagga = window.Quagga;
const gsap = window.gsap;
const lucide = window.lucide;

// --- Scanner State ---
let isScannerActive = false;
// Track multiple detections to confirm accuracy
let detectionHistory = [];
// MODIFIED: Increased required matches to 4 as requested
const REQUIRED_CONSECUTIVE_MATCHES = 4;
const CONFIDENCE_THRESHOLD = 0.45; // Minimum confidence level required (0-1)
const DETECTION_TIMEOUT = 2000; // Clear history after 2 seconds of no detections

// Timer to track gaps between detections
let detectionTimer = null;

// --- Mobile Menu Toggle Logic --- (Remains the same)
function setupMobileMenu() {
    if (mobileMenuToggle && navMenuLinks) {
        mobileMenuToggle.addEventListener("click", () => {
            const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
            mobileMenuToggle.setAttribute("aria-expanded", !isExpanded);
            navMenuLinks.classList.toggle("active");
            // Use a small delay for icon rendering after transition might start
            setTimeout(() => lucide.createIcons(), 50);
        });
    }
}

// --- QuaggaJS Scanner Logic ---

// Clear detection history after a period of no detections
function resetDetectionHistory() {
    detectionHistory = [];
    if (detectionTimer) {
        clearTimeout(detectionTimer);
        detectionTimer = null;
    }
}

// Callback function when QuaggaJS detects a barcode
function onDetected(data) {
    if (!isScannerActive) return; // Prevent processing if scanner was stopped

    const scannedCode = data.codeResult.code;
    const confidence = data.codeResult.confidence;
    const format = data.codeResult.format;

    console.log("Full detection data:", data);
    console.log("CodeResult:", data.codeResult);
    console.log(
        "Barcode detected:",
        scannedCode,
        "Confidence:",
        confidence,
        "Format:",
        format,
    );

    // Reset timer on each detection
    if (detectionTimer) {
        clearTimeout(detectionTimer);
    }

    // Set new timer to clear history if no detections happen for a while
    detectionTimer = setTimeout(resetDetectionHistory, DETECTION_TIMEOUT);

    // Only consider codes that pass basic validation
    if (
        scannedCode &&
        scannedCode.length >= 8 && // Most barcodes are at least 8 digits
        /^\d+$/.test(scannedCode) && // Must contain only digits
        format && // Must have a recognized format
        (confidence === undefined || confidence >= CONFIDENCE_THRESHOLD)
    ) {
        // Allow undefined confidence

        // Add this detection to history
        detectionHistory.push(scannedCode);

        // Count occurrences of this code in recent history
        const occurrences = detectionHistory.filter(
            (code) => code === scannedCode,
        ).length;

        // Keep history to a manageable size
        if (detectionHistory.length > 10) {
            detectionHistory.shift(); // Remove oldest detection
        }

        // Provide visual feedback about detection quality
        if (
            confidence !== undefined &&
            confidence >= CONFIDENCE_THRESHOLD &&
            confidence < 0.65
        ) {
            showToast("Detected barcode, verifying...", "info");
        }

        // Only proceed if we have consecutive matches of the same code
        if (occurrences >= REQUIRED_CONSECUTIVE_MATCHES) {
            console.log(
                `Confirmed barcode ${scannedCode} with ${occurrences} detections`,
            );

            // Important: Stop the scanner BEFORE processing the result
            stopScanner(); // This now completely stops Quagga

            // Flash scanner container to give visual feedback
            scannerContainer.classList.add("detection-success");
            setTimeout(() => {
                scannerContainer.classList.remove("detection-success");
            }, 300);

            if (barcodeInput) {
                barcodeInput.value = scannedCode; // Update the input field
            }

            // Clear detection history
            resetDetectionHistory();

            // Display the product info after a small delay to allow UI feedback
            setTimeout(() => {
                displayProductAndAlternatives(scannedCode);
            }, 300);
        }
    } else {
        console.warn("Invalid or low confidence barcode detection:", {
            code: scannedCode,
            confidence: confidence,
            format: format,
            length: scannedCode?.length,
            isNumeric: /^\d+$/.test(scannedCode),
        });

        // For very low confidence readings, don't even add to history
        if (
            confidence !== undefined &&
            confidence < CONFIDENCE_THRESHOLD * 0.5
        ) {
            return;
        }
    }
}

// Optional: Provide visual feedback during scanning
function onProcessed(result) {
    const drawingCanvas = document.querySelector(
        "#scanner-container canvas.drawingBuffer",
    );
    if (drawingCanvas) {
        const ctx = drawingCanvas.getContext("2d");
        if (result) {
            if (result.boxes) {
                ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

                // Draw scanning area indicator
                ctx.strokeStyle = "#32CD32"; // Lime green for the scan area
                ctx.lineWidth = 2;

                const scanArea = {
                    top: drawingCanvas.height * 0.2,
                    bottom: drawingCanvas.height * 0.8,
                    left: drawingCanvas.width * 0.1,
                    right: drawingCanvas.width * 0.9,
                };

                ctx.beginPath();
                ctx.moveTo(scanArea.left, scanArea.top);
                ctx.lineTo(scanArea.right, scanArea.top);
                ctx.lineTo(scanArea.right, scanArea.bottom);
                ctx.lineTo(scanArea.left, scanArea.bottom);
                ctx.lineTo(scanArea.left, scanArea.top);
                ctx.stroke();
            }
        }
    }
}

// Function to initialize and start the QuaggaJS scanner
function startScanner() {
    // If already active, don't start again
    if (isScannerActive) {
        console.log("Scanner is already active.");
        return;
    }

    // Check for UI elements
    if (!scannerContainer || !cancelScanButton) {
        console.error("Scanner UI elements not found.");
        showToast("Scanner UI failed to load.", "error");
        return;
    }

    // Check for camera support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast("Camera access is not supported by your browser.", "error");
        console.error("getUserMedia not supported.");
        return;
    }

    // Check if Quagga is loaded
    if (typeof Quagga === "undefined") {
        showToast("Barcode scanning library (QuaggaJS) failed to load.", "error");
        console.error("QuaggaJS is not loaded.");
        return;
    }

    // First ensure previous instances are fully stopped
    try {
        if (typeof Quagga !== "undefined" && Quagga.initialized) {
            console.log(
                "Stopping any existing Quagga instance before starting new one...",
            );
            Quagga.stop();
        }
    } catch (e) {
        console.warn("Error while trying to stop existing Quagga instance:", e);
        // Continue anyway, as we'll re-initialize
    }

    console.log("Attempting to start Quagga scanner...");
    // showToast("Starting camera...", "info");

    // Reset detection history when starting scanner
    resetDetectionHistory();

    // Make scanner overlay visible
    scannerContainer.classList.add("active");
    isScannerActive = true;
    // Ensure icons (like cancel button icon) are rendered if they weren't visible
    lucide.createIcons();

    // Clean up any existing scanner elements before initializing
    const existingVideoElements = scannerContainer.querySelectorAll("video");
    const existingCanvasElements = scannerContainer.querySelectorAll("canvas");

    existingVideoElements.forEach((video) => {
        if (video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
            video.srcObject = null;
        }
        video.remove();
    });

    existingCanvasElements.forEach((canvas) => canvas.remove());

    Quagga.init(
        {
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: scannerContainer, // Quagga will inject video/canvas here
                // constraints: {
                //     width: { min: 640, ideal: 1280, max: 1920 },
                //     height: { min: 480, ideal: 720, max: 1080 },
                //     facingMode: "environment", // Use the back camera
                //     aspectRatio: { min: 1, max: 2 },
                // },

                constraints: {
                    // Re-introduce width/height hints favoring landscape
                    width: { min: 640, ideal: 1280, max: 1920 },
                    height: { min: 480, ideal: 720, max: 1080 },
                    facingMode: "environment", // Use the back camera
                    // Keep the aspectRatio hint as well
                    aspectRatio: { ideal: 1.7777777778 } // 16/9 as a decimal might be more robust
                },
                area: {
                    // Define scanning area (percentage of view)
                    top: "20%",
                    right: "10%",
                    left: "10%",
                    bottom: "20%",
                },
                singleChannel: false, // Use false for potentially better color processing
            },
            decoder: {
                readers: [
                    // Specify types of barcodes to detect
                    "ean_reader",
                    "ean_8_reader",
                    "upc_reader",
                    "upc_e_reader",
                    "code_128_reader",
                    "code_39_reader",
                    "codabar_reader",
                ],
                debug: {
                    drawBoundingBox: true,
                    showFrequency: false,
                    drawScanline: true,
                    showPattern: false,
                },
                multiple: false, // Only process one barcode at a time
            },
            locate: true, // Enable localization (finding barcode region)
            locator: {
                patchSize: "medium", // "x-small", "small", "medium", "large", "x-large"
                halfSample: true, // Use half-resolution images for localization (faster)
            },
            numOfWorkers: navigator.hardwareConcurrency
                ? Math.min(navigator.hardwareConcurrency, 4)
                : 2, // Limit to 4 workers max
            frequency: 10, // Process frames frequently to improve detection chances
        },
        (err) => {
            if (err) {
                console.error("Quagga initialization failed:", err);
                // Provide more specific error messages
                if (
                    err.name === "NotAllowedError" ||
                    err.toString().includes("Permission denied")
                ) {
                    showToast(
                        "Camera access denied. Please allow camera permissions.",
                        "error",
                    );
                } else if (
                    err.name === "NotFoundError" ||
                    err.name === "DevicesNotFoundError"
                ) {
                    showToast("No suitable camera found.", "error");
                } else if (
                    err.name === "NotReadableError" ||
                    err.name === "TrackStartError"
                ) {
                    showToast(
                        "Camera is already in use or cannot be accessed.",
                        "error",
                    );
                } else {
                    showToast(
                        `Error initializing scanner: ${err.message || err}`,
                        "error",
                    );
                }
                // Set state back to inactive and clean up UI
                isScannerActive = false;
                scannerContainer.classList.remove("active");
                return;
            }
            console.log("Quagga initialization finished. Ready to start scanning.");
            Quagga.start(); // Start the scanning process
            // showToast("Point camera at a barcode.", "info"); // Inform user

            // Attach the detection listener *after* successful initialization
            Quagga.onDetected(onDetected);

            // Add visual feedback during processing
            Quagga.onProcessed(onProcessed);
        },
    );
}

// Function to stop the QuaggaJS scanner
function stopScanner() {
    // If already not active, just ensure UI is hidden
    if (!isScannerActive) {
        if (scannerContainer) scannerContainer.classList.remove("active");
        return;
    }

    console.log("Stopping Quagga scanner...");
    isScannerActive = false; // Set flag immediately

    // Clear detection history
    resetDetectionHistory();

    if (typeof Quagga !== "undefined") {
        try {
            // Remove listener first to prevent any more detections
            Quagga.offDetected(onDetected);
            // If you have other event handlers, remove them too
            Quagga.offProcessed(onProcessed);

            // Stop the scanner library
            if (Quagga.initialized) {
                Quagga.stop();
                console.log("Quagga stopped successfully.");
            }
        } catch (e) {
            console.error("Error during Quagga stop/listener removal:", e);
        }
    }

    // Hide the scanner UI overlay
    if (scannerContainer) {
        scannerContainer.classList.remove("active");

        // Clean up any remaining video/canvas elements
        const videoElements = scannerContainer.querySelectorAll("video");
        const canvasElements = scannerContainer.querySelectorAll("canvas");

        videoElements.forEach((video) => {
            if (video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
                video.srcObject = null;
            }
            video.remove();
        });

        canvasElements.forEach((canvas) => canvas.remove());

        // Force a reflow to ensure cleanup is complete
        scannerContainer.offsetHeight;
    }

    hideLoading();
    console.log("Scanner stopped and UI hidden completely.");
}

// --- Main Display Logic (Updated to support async alternatives) ---
const displayProductAndAlternatives = async (barcode) => {
    productCardContainer.innerHTML = "";
    alternativesContainer.innerHTML = "";
    productCardContainer.classList.remove("visible");
    alternativesContainer.classList.remove("visible");
    hideLoading(); // Ensure previous loading is hidden
    showLoading(); // Show loading for product fetch simulation

    // Simulate fetching data
    setTimeout(async () => {
        const product = findProductByBarcode(barcode);
        hideLoading(); // Hide loading after fake fetch

        if (product) {
            productCardContainer.innerHTML = createProductCardHTML(product);
            lucide.createIcons();
            productCardContainer.classList.add("visible");
            animateProductCardIn(productCardContainer);

            setTimeout(() => {
                const cardElement = document.getElementById(`product-${product.id}`);
                if (cardElement) {
                    cardElement.scrollIntoView({ behavior: "smooth", block: "center" }); // Adjust scroll position
                }
            }, 200); // Delay slightly after animation starts

            try {
                // First show AI processing animation
                alternativesContainer.innerHTML = `
                    <div class="ai-processing-container">
                        <div class="ai-processing-title">
                            <i data-lucide="cpu"></i> Processing with AI
                        </div>
                        <p>Finding the healthiest alternatives tailored to your budget...</p>
                        
                        <div class="ai-processing-animation">
                            <div class="ai-pulse"></div>
                            <div class="processing-path"></div>
                            <div class="progress-dot"></div>
                            
                            <div class="product-icon">
                                <i data-lucide="shopping-basket" size="24"></i>
                            </div>
                            
                            <div class="ai-factory">
                                <i data-lucide="sparkles" size="36" color="white"></i>
                            </div>
                            
                            <div class="recommendation-icons">
                                <div class="recommendation-icon">
                                    <i data-lucide="apple" size="24"></i>
                                </div>
                                <div class="recommendation-icon">
                                    <i data-lucide="banana" size="24"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                lucide.createIcons();
                alternativesContainer.classList.add("visible");

                // Get alternatives with income-based recommendations
                // Pass the user's income range to ensure proper filtering
                const incomeRange = getIncomeRange();
                const alternatives = await getAlternativesForProduct(
                    product.id,
                    true,
                    true,
                );

                // After a short delay to show the animation, display the actual alternatives
                setTimeout(() => {
                    if (alternatives.length > 0) {
                        alternativesContainer.innerHTML = createAlternativesHTML(
                            alternatives,
                            product,
                        );
                        lucide.createIcons();
                        alternativesContainer.classList.add("visible");
                        animateAlternativesIn(alternativesContainer);
                    } else {
                        alternativesContainer.innerHTML = `
                            <div class="card-style error-message">
                                <p>No suitable alternatives found. Try a different product or adjust your income range.</p>
                            </div>
                        `;
                    }
                }, 2500); // Show animation for 2.5 seconds
            } catch (error) {
                console.error("Error getting alternatives:", error);
                showToast("Failed to load alternatives, please try again", "error");
                alternativesContainer.innerHTML = "";
            }
        } else {
            productCardContainer.innerHTML = `<div class="card-style error-message"><p>Oops! Barcode "<strong style="color: var(--primary-darker);">${barcode}</strong>" not found in our database.</p><p>Please check the number or try another product.</p></div>`;
            productCardContainer.classList.add("visible");
            gsap.fromTo(
                productCardContainer.firstElementChild,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            );
            alternativesContainer.innerHTML = "";
            alternativesContainer.classList.remove("visible");
            showToast(`Product not found: ${barcode}`, "error");
        }
    }, 500); // Slightly longer simulation delay for perceived fetch

    // Make displayProductAndAlternatives available globally
    window.displayProductAndAlternatives = displayProductAndAlternatives;
};

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Add income settings button to action buttons
    addIncomeSettingsButton();

    // Add tooltip for income button
    const incomeButton = document.getElementById("income-settings-button");
    if (incomeButton) {
        // Create tooltip element
        const tooltip = document.createElement("div");
        tooltip.className = "income-tooltip";
        tooltip.textContent =
            "Set your income range to get personalized budget-friendly recommendations!";
        document.body.appendChild(tooltip);

        // Show tooltip on hover
        incomeButton.addEventListener("mouseenter", (e) => {
            const buttonRect = incomeButton.getBoundingClientRect();
            tooltip.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
            tooltip.style.top = `${buttonRect.bottom + 10}px`;
            tooltip.classList.add("visible");
        });

        // Hide tooltip when not hovering
        incomeButton.addEventListener("mouseleave", () => {
            tooltip.classList.remove("visible");
        });
    }

    // Main Barcode Form
    if (barcodeForm) {
        barcodeForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const barcode = barcodeInput?.value.trim();
            if (barcode) {
                displayProductAndAlternatives(barcode);
            } else {
                showToast("Please enter a valid barcode", "warning");
            }
        });
    }

    // Example Product Buttons
    const exampleButtonsDiv = document.getElementById("example-buttons");
    if (exampleButtonsDiv) {
        const exampleProducts = PRODUCTS.slice(0, 3); // Use first 3 products as examples
        const exampleButtonsHTML = exampleProducts
            .map((product) => {
                return `<button class="example-button kawaii-pill" data-barcode="${product.barcode}">${product.name}</button>`;
            })
            .join("");

        exampleButtonsDiv.innerHTML = exampleButtonsHTML;

        // Add click handlers to each example button
        const buttons = exampleButtonsDiv.querySelectorAll(".example-button");
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const barcode = button.getAttribute("data-barcode");
                if (barcode) {
                    if (barcodeInput) barcodeInput.value = barcode;
                    displayProductAndAlternatives(barcode);
                }
            });
        });
    }

    // Scanner Button
    if (scanButton) {
        scanButton.addEventListener("click", () => {
            // Make sure any ongoing scanner processes are fully stopped first
            if (isScannerActive) {
                stopScanner();
                // Small delay to ensure resources are released before starting again
                setTimeout(startScanner, 300);
            } else {
                startScanner();
            }
        });
    }

    // Cancel Scan Button
    if (cancelScanButton) {
        cancelScanButton.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent any default behavior
            e.stopPropagation(); // Stop event bubbling
            console.log("Cancel scan button clicked");
            if (isScannerActive) {
                // Only stop if scanner is actually active
                stopScanner();
                // Ensure UI is properly reset
                if (scannerContainer) {
                    scannerContainer.classList.remove("active");
                }
                // Clear any existing barcode input
                if (barcodeInput) {
                    barcodeInput.value = "";
                }
            }
        });
    }

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// --- Initial Setup (DOMContentLoaded) ---
document.addEventListener("DOMContentLoaded", () => {
    // Initialize global references
    initGlobals(showToast, displayProductAndAlternatives);

    // Initialize animations
    if (mainNav) initNavAnimation(mainNav);
    if (barcodeFormSection && header)
        initFormHeaderAnimation(barcodeFormSection, header);
    if (footer) initFooterAnimation(footer);

    lucide.createIcons(); // Initial icon render

    if (currentYearSpan)
        currentYearSpan.textContent = new Date().getFullYear(); // Set footer year

    // Initialize income profile modal
    initIncomeProfileModal();

    // Setup all event listeners
    setupEventListeners();
    setupMobileMenu(); // Setup mobile menu toggle

    if (barcodeInput) {
        barcodeInput.value = "";
    } // Clear input on load

    // Show income modal on first visit or if not set
    setTimeout(() => {
        if (!hasIncomeRange()) {
            // Highlight the income button with a pulse animation
            const incomeButton = document.getElementById("income-settings-button");
            if (incomeButton) {
                // Make sure it has the highlighted class
                incomeButton.classList.add("highlighted-button");

                // Show an enhanced toast with a call to action
                if (typeof showToast === "function") {
                    showToast(
                        "Set your income range for personalized budget-friendly recommendations!",
                        "info",
                    );
                }

                // After a short delay, show the income modal
                setTimeout(() => {
                    showIncomeModal();
                }, 1000);
            }
        }
    }, 1000);

    // Stop scanner if page becomes hidden (good practice)
    document.addEventListener("visibilitychange", () => {
        if (document.hidden && isScannerActive) {
            console.log("Page hidden, stopping scanner.");
            stopScanner();
        }
    });

    // Let animations handle initial visibility via adding the 'visible' class
});