// Animated Counter Function
function animateCounter(element, target, duration = 2000, decimals = 0) {
    let startTime = null;
    const startValue = 0;
    
    function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = startValue + (target - startValue) * easeOut;
        
        element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = decimals > 0 ? target.toFixed(decimals) : target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for triggering animation when in viewport
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseFloat(entry.target.dataset.target);
            const decimals = parseInt(entry.target.dataset.decimals) || 0;
            animateCounter(entry.target, target, 2500, decimals);
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe all counter elements
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
