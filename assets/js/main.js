// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Mobile Dropdown Toggle
const mobileDropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
mobileDropdownBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const dropdownContent = btn.nextElementSibling;
        const icon = btn.querySelector('i');
        
        // Toggle dropdown
        dropdownContent.classList.toggle('hidden');
        
        // Rotate icon
        if (dropdownContent.classList.contains('hidden')) {
            icon.style.transform = 'rotate(0deg)';
        } else {
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

// Tab Switching
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => {
            b.classList.remove('active', 'border-primary', 'text-gray-700');
            b.classList.add('border-transparent', 'text-gray-500');
        });
        btn.classList.add('active', 'border-primary', 'text-gray-700');
        btn.classList.remove('border-transparent', 'text-gray-500');
    });
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('i');
        
        // Toggle current
        answer.classList.toggle('hidden');
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Campus Culture Auto Carousel with Left to Right Animation - Responsive
document.addEventListener('DOMContentLoaded', function() {
    const cultureItems = document.querySelectorAll('.culture-item');
    let currentIndex = 0;

    function getItemsPerView() {
        if (window.innerWidth >= 768) return 3; // md breakpoint - show 3 items
        if (window.innerWidth >= 640) return 2; // sm breakpoint - show 2 items
        return 1; // mobile - show 1 item
    }

    function rotateCultureGallery() {
        const itemsPerView = getItemsPerView();
        const totalItems = cultureItems.length;
        
        // Slide out current items to the left
        cultureItems.forEach((item, index) => {
            if (index >= currentIndex && index < currentIndex + itemsPerView) {
                item.style.transform = 'translateX(-100%)';
                item.style.opacity = '0';
            }
        });
        
        setTimeout(() => {
            // Hide all items
            cultureItems.forEach(item => {
                item.classList.add('hidden');
                item.style.transform = 'translateX(100%)';
            });
            
            // Move to next index
            currentIndex = (currentIndex + itemsPerView) % totalItems;
            
            // Show next set of items from the right
            for (let i = 0; i < itemsPerView && currentIndex + i < totalItems; i++) {
                const itemIndex = currentIndex + i;
                cultureItems[itemIndex].classList.remove('hidden');
                setTimeout(() => {
                    cultureItems[itemIndex].style.transform = 'translateX(0)';
                    cultureItems[itemIndex].style.opacity = '1';
                }, 50);
            }
        }, 600);
    }

    // Initialize styles
    function initializeCarousel() {
        const itemsPerView = getItemsPerView();
        cultureItems.forEach((item, index) => {
            item.style.transition = 'transform 0.6s ease-in-out, opacity 0.6s ease-in-out';
            if (index < itemsPerView) {
                item.classList.remove('hidden');
                item.style.transform = 'translateX(0)';
                item.style.opacity = '1';
            } else {
                item.classList.add('hidden');
                item.style.transform = 'translateX(100%)';
                item.style.opacity = '0';
            }
        });
    }

    // Initialize on load
    initializeCarousel();

    // Reinitialize on window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentIndex = 0;
            initializeCarousel();
        }, 250);
    });

    // Auto-rotate every 4 seconds
    setInterval(rotateCultureGallery, 4000);
});
