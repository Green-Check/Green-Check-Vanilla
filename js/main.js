// js/main.js
import { PRODUCTS } from './data.js';
import { findProductByBarcode, getAlternativesForProduct } from './utils.js';
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
    exampleButtonsContainer,
    scanButton, // Button to trigger scanner start
    uploadButton,
    uploadInput,
    footer,
    currentYearSpan,
    header,
    formContainer,
    barcodeFormSection,
    loadingIndicator,
    mainNav,
    mobileMenuToggle,
    navMenuLinks,
    scannerContainer, // The overlay element for the scanner view
    cancelScanButton // Button to stop the scanner
} from './ui.js';
import {
    initNavAnimation,
    initFormHeaderAnimation,
    initFooterAnimation,
    animateProductCardIn,
    animateAlternativesIn
} from './animations.js';

// --- Scanner State ---
let isScannerActive = false;
// No need for videoStream variable if Quagga manages the stream internally via target

// --- Mobile Menu Toggle Logic --- (Remains the same)
function setupMobileMenu() {
    if (mobileMenuToggle && navMenuLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenuLinks.classList.toggle('active');
            // Use a small delay for icon rendering after transition might start
            setTimeout(() => lucide.createIcons(), 50);
        });
    }
}

// --- QuaggaJS Scanner Logic ---

// Callback function when QuaggaJS detects a barcode
function onDetected(data) {
    if (!isScannerActive) return; // Prevent processing if scanner was stopped

    const scannedCode = data.codeResult.code;
    console.log("Barcode detected:", scannedCode);

    // Basic validation (e.g., ignore very short codes potentially from misreads)
    if (scannedCode && scannedCode.length > 3) {
        // Important: Stop the scanner BEFORE processing the result
        // to prevent additional scans while processing
        stopScanner(); // This now completely stops Quagga

        showToast(`Barcode detected: ${scannedCode}`, "success");

        if (barcodeInput) {
            barcodeInput.value = scannedCode; // Update the input field
        }
        displayProductAndAlternatives(scannedCode); // Display the product info
    } else {
        console.warn("Potentially invalid code detected or detection too quick after stop:", scannedCode);
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
    if (typeof Quagga === 'undefined') {
        showToast("Barcode scanning library (QuaggaJS) failed to load.", "error");
        console.error("QuaggaJS is not loaded.");
        return;
    }

    // First ensure previous instances are fully stopped
    try {
        if (typeof Quagga !== 'undefined' && Quagga.initialized) {
            console.log("Stopping any existing Quagga instance before starting new one...");
            Quagga.stop();
        }
    } catch (e) {
        console.warn("Error while trying to stop existing Quagga instance:", e);
        // Continue anyway, as we'll re-initialize
    }

    console.log("Attempting to start Quagga scanner...");
    showToast("Starting camera...", "info");

    // Make scanner overlay visible
    scannerContainer.classList.add('active');
    isScannerActive = true;
    // Ensure icons (like cancel button icon) are rendered if they weren't visible
    lucide.createIcons();

    // Clean up any existing scanner elements before initializing
    const existingVideoElements = scannerContainer.querySelectorAll('video');
    const existingCanvasElements = scannerContainer.querySelectorAll('canvas');

    existingVideoElements.forEach(video => {
        if (video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
        }
        video.remove();
    });

    existingCanvasElements.forEach(canvas => canvas.remove());

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerContainer, // Quagga will inject video/canvas here
            constraints: {
                width: { min: 640, ideal: 1280, max: 1920 },
                height: { min: 480, ideal: 720, max: 1080 },
                facingMode: "environment" // Use the back camera
            },
            area: { // Optional: Define scanning area (percentage of view)
                top: "20%", right: "10%", left: "10%", bottom: "20%"
            },
            singleChannel: false // Use false for potentially better color processing
        },
        decoder: {
            readers: [ // Specify types of barcodes to detect
                "ean_reader",
                "ean_8_reader",
                "upc_reader",
                "upc_e_reader",
                "code_128_reader",
                "code_39_reader",
                "codabar_reader"
                // Add other readers if needed: "i2of5_reader", "code_93_reader", etc.
            ],
            debug: { // Optional: draw bounding boxes, etc.
                drawBoundingBox: true,
                showFrequency: false,
                drawScanline: true,
                showPattern: false
            }
        },
        locate: true, // Enable localization (finding barcode region)
        locator: {
            patchSize: "medium", // "x-small", "small", "medium", "large", "x-large"
            halfSample: true // Use half-resolution images for localization (faster)
        },
        numOfWorkers: navigator.hardwareConcurrency || 4, // Use available CPU cores (0 = main thread only)
        frequency: 10, // Target scans per second (adjust based on performance)

    }, function (err) {
        if (err) {
            console.error("Quagga initialization failed:", err);
            // Provide more specific error messages
            if (err.name === 'NotAllowedError' || err.toString().includes('Permission denied')) {
                showToast("Camera access denied. Please allow camera permissions.", "error");
            } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
                showToast("No suitable camera found.", "error");
            } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
                showToast("Camera is already in use or cannot be accessed.", "error");
            } else {
                showToast(`Error initializing scanner: ${err.message || err}`, "error");
            }
            // Set state back to inactive and clean up UI
            isScannerActive = false;
            scannerContainer.classList.remove('active');
            return;
        }
        console.log("Quagga initialization finished. Ready to start scanning.");
        Quagga.start(); // Start the scanning process
        showToast("Point camera at a barcode.", "info"); // Inform user

        // Attach the detection listener *after* successful initialization
        Quagga.onDetected(onDetected);

        // Optional: Visual feedback during processing (draws boxes, etc.)
        // Quagga.onProcessed(onProcessed); // You can define an onProcessed function if needed
    });
}

// Function to stop the QuaggaJS scanner
function stopScanner() {
    // If already not active, just ensure UI is hidden
    if (!isScannerActive) {
        if (scannerContainer) scannerContainer.classList.remove('active');
        return;
    }

    console.log("Stopping Quagga scanner...");
    isScannerActive = false; // Set flag immediately

    if (typeof Quagga !== 'undefined') {
        try {
            // Remove listener first to prevent any more detections
            Quagga.offDetected(onDetected);
            // If you have other event handlers, remove them too
            // Quagga.offProcessed(onProcessed);

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
        scannerContainer.classList.remove('active');

        // Clean up any remaining video/canvas elements
        const videoElements = scannerContainer.querySelectorAll('video');
        const canvasElements = scannerContainer.querySelectorAll('canvas');

        videoElements.forEach(video => {
            if (video.srcObject) {
                const tracks = video.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                video.srcObject = null;
            }
            video.remove();
        });

        canvasElements.forEach(canvas => canvas.remove());
    }

    hideLoading();
    console.log("Scanner stopped and UI hidden completely.");
}


// --- Main Display Logic (displayProductAndAlternatives) remains unchanged ---
const displayProductAndAlternatives = (barcode) => {
    productCardContainer.innerHTML = '';
    alternativesContainer.innerHTML = '';
    productCardContainer.classList.remove('visible');
    alternativesContainer.classList.remove('visible');
    hideLoading(); // Ensure previous loading is hidden
    showLoading(); // Show loading for product fetch simulation

    // Simulate fetching data
    setTimeout(() => {
        const product = findProductByBarcode(barcode);
        hideLoading(); // Hide loading after fake fetch

        if (product) {
            productCardContainer.innerHTML = createProductCardHTML(product);
            lucide.createIcons();
            productCardContainer.classList.add('visible');
            animateProductCardIn(productCardContainer);

            setTimeout(() => {
                const cardElement = document.getElementById(`product-${product.id}`);
                if (cardElement) {
                    cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' }); // Adjust scroll position
                }
            }, 200); // Delay slightly after animation starts

            const alternatives = getAlternativesForProduct(product.id);
            if (alternatives.length > 0) {
                alternativesContainer.innerHTML = createAlternativesHTML(alternatives, product);
                lucide.createIcons();
                alternativesContainer.classList.add('visible');
                animateAlternativesIn(alternativesContainer);
            } else {
                alternativesContainer.innerHTML = ''; // Clear if no alternatives
            }
        } else {
            productCardContainer.innerHTML = `<div class="card-style error-message"><p>Oops! Barcode "<strong style="color: var(--primary-darker);">${barcode}</strong>" not found in our database.</p><p>Please check the number or try another product.</p></div>`;
            productCardContainer.classList.add('visible');
            gsap.fromTo(productCardContainer.firstElementChild, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
            alternativesContainer.innerHTML = '';
            alternativesContainer.classList.remove('visible');
            showToast(`Product not found: ${barcode}`, 'error');
        }
    }, 500); // Slightly longer simulation delay for perceived fetch
};


// --- Event Listeners Setup ---
function setupEventListeners() {
    // Main Barcode Form
    if (barcodeForm) {
        barcodeForm.addEventListener('submit', (e) => {
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
    if (exampleButtonsContainer) {
        const exampleProducts = PRODUCTS.slice(0, 3); // Use first 3 products as examples
        const exampleButtonsHTML = exampleProducts.map(product => {
            return `<button class="example-button kawaii-pill" data-barcode="${product.barcode}">${product.name}</button>`;
        }).join('');

        exampleButtonsContainer.innerHTML = exampleButtonsHTML;

        // Add click handlers to each example button
        const buttons = exampleButtonsContainer.querySelectorAll('.example-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const barcode = button.getAttribute('data-barcode');
                if (barcode) {
                    if (barcodeInput) barcodeInput.value = barcode;
                    displayProductAndAlternatives(barcode);
                }
            });
        });
    }

    // Scanner Button
    if (scanButton) {
        scanButton.addEventListener('click', () => {
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
        cancelScanButton.addEventListener('click', () => {
            console.log("Cancel scan button clicked");
            stopScanner();
        });
    }

    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Image Upload Button
    if (uploadButton && uploadInput) {
        uploadButton.addEventListener('click', () => {
            uploadInput.click();
        });

        uploadInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                showToast("Image barcode processing not implemented yet", "info");
                // Here you would implement image processing with QuaggaJS or ZXing, but that's out of scope for now
            }
        });
    }
}

// --- Initial Setup (DOMContentLoaded) ---
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations (remain the same)
    if (mainNav) initNavAnimation(mainNav);
    if (barcodeFormSection && header) initFormHeaderAnimation(barcodeFormSection, header);
    if (footer) initFooterAnimation(footer);

    lucide.createIcons(); // Initial icon render

    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear(); // Set footer year

    setupEventListeners(); // Setup all click handlers etc.
    setupMobileMenu(); // Setup mobile menu toggle

    if (barcodeInput) { barcodeInput.value = ''; } // Clear input on load

    // Stop scanner if page becomes hidden (good practice)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isScannerActive) {
            console.log("Page hidden, stopping scanner.");
            stopScanner();
        }
    });

    // Let animations handle initial visibility via adding the 'visible' class
});