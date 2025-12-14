// News Page JavaScript - Combined for news.html and news-details.html

// ========== NEWS LISTING PAGE FUNCTIONS ==========

// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.news-filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    const searchInput = document.getElementById('newsSearch');

    // Filter by category
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active state
                filterButtons.forEach(btn => {
                    btn.classList.remove('active', 'bg-primary', 'text-white', 'shadow-md');
                    btn.classList.add('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');
                });
                this.classList.add('active', 'bg-primary', 'text-white', 'shadow-md');
                this.classList.remove('bg-white', 'text-gray-700', 'border-2', 'border-gray-200');

                // Filter cards
                newsCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            newsCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || description.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    card.style.display = 'none';
                }
            });

            // If search is empty, show all cards or filtered category
            if (searchTerm === '') {
                const activeFilter = document.querySelector('.news-filter-btn.active');
                const activeCategory = activeFilter ? activeFilter.getAttribute('data-category') : 'all';
                
                newsCards.forEach(card => {
                    if (activeCategory === 'all' || card.getAttribute('data-category') === activeCategory) {
                        card.style.display = 'block';
                    }
                });
            }
        });
    }

    // Add scroll animation for news cards
    if (newsCards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        newsCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});

// ========== NEWS DETAILS PAGE FUNCTIONS ==========

// Print Article Function
function printArticle() {
    window.print();
}

// Share Article Function
function shareArticle() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: document.querySelector('h1').textContent,
            url: window.location.href
        })
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback: Copy link to clipboard
        copyToClipboard(window.location.href);
        showShareNotification();
    }
}

// Copy to Clipboard Function
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

// Show Share Notification
function showShareNotification() {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-8 right-8 bg-primary text-white px-6 py-4 rounded-lg shadow-2xl z-50 flex items-center gap-3 animate-slide-up';
    notification.innerHTML = `
        <i class="fas fa-check-circle text-xl"></i>
        <span>Link copied to clipboard!</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slide-down 0.3s ease-out forwards';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Social Share Functions
document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('.flex.items-center.gap-3 button');
    
    if (shareButtons.length >= 5) {
        // Facebook Share
        shareButtons[0].addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
        });
        
        // Twitter Share
        shareButtons[1].addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(document.querySelector('h1').textContent);
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank', 'width=600,height=400');
        });
        
        // LinkedIn Share
        shareButtons[2].addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
        });
        
        // WhatsApp Share
        shareButtons[3].addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(document.querySelector('h1').textContent);
            window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
        });
        
        // Copy Link
        shareButtons[4].addEventListener('click', function() {
            copyToClipboard(window.location.href);
            showShareNotification();
        });
    }
});

// Reading Progress Bar (for article pages)
document.addEventListener('DOMContentLoaded', function() {
    const article = document.querySelector('article .prose');
    
    if (article) {
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-150';
        progressBar.style.width = '0%';
        document.body.appendChild(progressBar);
        
        // Update progress on scroll
        window.addEventListener('scroll', function() {
            const articleElement = document.querySelector('article');
            if (!articleElement) return;
            
            const articleTop = articleElement.offsetTop;
            const articleHeight = articleElement.offsetHeight;
            const windowHeight = window.innerHeight;
            const scrolled = window.scrollY;
            
            const progress = ((scrolled - articleTop + windowHeight) / articleHeight) * 100;
            const clampedProgress = Math.min(Math.max(progress, 0), 100);
            
            progressBar.style.width = clampedProgress + '%';
        });
    }
});

// Smooth Scroll for Related News
document.addEventListener('DOMContentLoaded', function() {
    const relatedNewsCards = document.querySelectorAll('.related-news-card');
    
    if (relatedNewsCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        relatedNewsCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }
});

// ========== SHARED CSS ANIMATIONS ==========

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slide-up {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slide-down {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    
    .animate-slide-up {
        animation: slide-up 0.3s ease-out forwards;
    }

    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    @media print {
        header, footer, .back-button, .share-section, .related-news {
            display: none !important;
        }
        
        article {
            max-width: 100% !important;
            padding: 0 !important;
        }
    }
`;
document.head.appendChild(style);
