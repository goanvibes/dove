document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Menu View Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            triggerHapticFeedback(30);
        });
    }

    // 2. Specialized Multi-tier Haptic Feedback Action Handler
    function triggerHapticFeedback(duration) {
        if (navigator.vibrate) {
            navigator.vibrate(duration);
        }
    }

    const interactives = document.querySelectorAll('.haptic-btn');
    interactives.forEach(element => {
        element.addEventListener('click', () => triggerHapticFeedback(45));
    });

    // 3. Automated Order Compilation & API Handoff Engine
    const orderForm = document.getElementById('cateringOrderForm');
    const targetCateringNumber = "919822182917"; // Direct Line to Dove Caterers Management

    if (orderForm) {
        orderForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Extract User Intent Data
            const name = document.getElementById('clientName').value;
            const eventType = document.getElementById('eventType').value;
            const guests = document.getElementById('guestCount').value;

            // Formulate WhatsApp API String with clear structural presentation
            const formattedMessage = `Hello Dove Caterers! %0A%0A` +
                                     `I would like to place a menu order inquiry:%0A` +
                                     `• Name: ${encodeURIComponent(name)}%0A` +
                                     `• Occasion: ${encodeURIComponent(eventType)}%0A` +
                                     `• Guest Count: ${encodeURIComponent(guests)}%0A%0A` +
                                     `Please send over the menu selection options and package pricing sheets!`;

            const productionUrl = `https://api.whatsapp.com/send?phone=${targetCateringNumber}&text=${formattedMessage}`;
            
            // Execute seamless off-thread redirection
            window.open(productionUrl, '_blank');
        });
    }
});
