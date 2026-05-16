// Interfaces for Type Safety
interface BookingData {
    type: string;
    phoneNumber: string;
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Loading Screen Logic
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 1500); // 1.5s simulated loading for visual impact
    }

    // 2. Haptic Feedback Engine
    const hapticElements = document.querySelectorAll('.haptic-btn');
    hapticElements.forEach(element => {
        element.addEventListener('click', () => {
            // Trigger device vibration (50ms) if supported by the mobile browser
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });

    // 3. WhatsApp API Booking Logic
    const waNumber = "919822182917"; // Dove Nest contact
    const bookingButtons = document.querySelectorAll('.wa-book-btn');

    bookingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = e.target as HTMLButtonElement;
            const bookingType = target.getAttribute('data-type');
            
            if (bookingType) {
                const message = `Hello Dove Nest! I would like to inquire about booking a ${bookingType}. Please let me know the availability and pricing.`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;
                
                window.open(whatsappUrl, '_blank');
            }
        });
    });
});
