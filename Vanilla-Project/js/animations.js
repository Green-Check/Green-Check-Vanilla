// js/animations.js

// Combined animation for Form Section and Header (now that form is first)
export function initFormHeaderAnimation(formSectionElement, headerElement) {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (formSectionElement) {
        formSectionElement.classList.add('visible'); // Make visible before animation
        tl.fromTo(formSectionElement,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.3 } // Form animates first
        );
    }
    if (headerElement) {
        headerElement.classList.add('visible'); // Make visible before animation
        tl.fromTo(headerElement,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7 }, // Header animates after form
            "-=0.5" // Overlap start slightly
        );
    }
}

export function initNavAnimation(navElement) {
    if (navElement) {
        // No need to add 'visible' class here if handled by GSAP's autoAlpha or opacity
        gsap.to(navElement, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: 0.1,
            clearProps: "transform", // Remove transform after animation
            onStart: () => navElement.classList.add('visible'), // Add visible class on start
        });
        // Set initial state for GSAP
        gsap.set(navElement, { opacity: 0, y: -50 });
    }
}

export function initFooterAnimation(footerElement) {
    if (footerElement) {
        gsap.registerPlugin(ScrollTrigger);
        gsap.fromTo(footerElement,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: footerElement,
                    start: "top bottom-=100", // Trigger when footer is 100px from bottom
                    toggleActions: "play none none none",
                    once: true,
                    onEnter: () => footerElement.classList.add('visible'), // Add visible class on trigger
                }
            }
        );
        // GSAP handles initial opacity via fromTo
        // gsap.set(footerElement, { opacity: 0 }); // No longer needed with fromTo
    }
}

export function animateProductCardIn(containerElement) {
    if (!containerElement || !containerElement.firstElementChild) return;

    const cardElement = containerElement.firstElementChild;

    // Animate the card itself sliding/fading in
    // containerElement should already be visible via classList.add in main.js
    gsap.fromTo(cardElement,
        { opacity: 0, y: 30, scale: 0.98 }, // Start slightly smaller
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: "power3.out",
            delay: 0.1 // Small delay after container is made visible
        }
    );

    // Animate score bar
    const scoreBar = cardElement.querySelector('.score-bar-fg');
    if (scoreBar) {
        const score = scoreBar.getAttribute('data-score');
        if (score !== null) {
            // Ensure bar starts at 0 width visually before animating
            gsap.set(scoreBar, { width: '0%' });
            gsap.to(scoreBar, {
                width: `${score}%`,
                duration: 1.3, // Slightly longer bar animation
                ease: "power2.inOut",
                delay: 0.5 // Delay after card appears
            });
        }
    }
}

export function animateAlternativesIn(containerElement) {
    if (!containerElement) return;

    const altHeading = containerElement.querySelector('#alternatives-heading');
    const altCards = containerElement.querySelectorAll('.alternative-card');

    // Container should already be visible via classList.add in main.js
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    if (altHeading) {
        tl.fromTo(altHeading,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.2 } // Animate heading first
        );
    }

    if (altCards.length > 0) {
        tl.fromTo(altCards,
            { opacity: 0, y: 25, scale: 0.97 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.15, // Adjust stagger timing
                ease: "power3.out"
            },
            altHeading ? "-=0.4" : "-=0.0" // Start card animation slightly after/during heading animation
        );
    }
}