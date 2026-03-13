// Application state
let currentPage = 0;
let isZoomed = false;

// Gallery images
const galleryImages = [
    "https://i.imgur.com/UdVvIAq_d.jpeg?maxwidth=520&shape=thumb&fidelity=high",
    "https://i.imgur.com/uo4aye8.jpeg", 
    "https://i.imgur.com/gwkTw1V.jpeg",
    "https://i.imgur.com/dTzvwgG.jpeg",
    "https://i.imgur.com/sWCiwbQ.jpeg",
    "https://i.imgur.com/PxRiUtn.jpeg"
];

// DOM elements
const lockscreen = document.getElementById('lockscreen');
const mainApp = document.getElementById('mainApp');
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const heartButton = document.getElementById('heartButton');
const loveMessage = document.getElementById('loveMessage');
const bearContainer = document.getElementById('bearContainer');
const bearImageWrapper = document.getElementById('bearImageWrapper');
const loveText = document.getElementById('loveText');
const zoomHint = document.getElementById('zoomHint');
const editableText = document.getElementById('editableText');
const galleryGrid = document.getElementById('galleryGrid');
const imageMessage = document.getElementById('imageMessage');
const popupImage = document.getElementById('popupImage');
const pages = document.querySelectorAll('.page');
const bearClickMessage = "I will always love you even though you dont think its true, youve always made me feel that I belonged and was even a part of your family Its so hard not being with you even if it has been a couple of days I truly want it to be you I will always pray for your well being and safety and pray that god will lead you to the right path I love you my special koala bear";

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupEventListeners();
    setupClickNavigation();
});

// Password form handling
passwordForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const password = passwordInput.value.toLowerCase();
    
    if (password === 'heidy') {
        lockscreen.classList.add('hidden');
        mainApp.classList.remove('hidden');
    } else {
        passwordInput.value = '';
        passwordInput.classList.add('shake');
        setTimeout(() => {
            passwordInput.classList.remove('shake');
        }, 500);
    }
});

// Heart button functionality
heartButton.addEventListener('click', function() {
    loveMessage.classList.toggle('hidden');
});

// Bear zoom functionality
bearContainer.addEventListener('click', function() {
    isZoomed = !isZoomed;
    
    if (isZoomed) {
        bearImageWrapper.classList.add('zoomed');
        loveText.classList.remove('hidden');
        zoomHint.classList.remove('hidden');
        editableText.textContent = bearClickMessage;
    } else {
        bearImageWrapper.classList.remove('zoomed');
        loveText.classList.add('hidden');
        zoomHint.classList.add('hidden');
    }
});

// Initialize gallery
function initializeGallery() {
    galleryImages.forEach((imageUrl, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.style.animationDelay = `${0.8 + index * 0.1}s`;
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Gallery image ${index + 1}`;
        img.className = 'gallery-image';
        img.onerror = function() {
            this.src = 'https://i.imgur.com/DuvwmDi.png';
        };
        
        galleryItem.appendChild(img);
        galleryItem.addEventListener('click', () => showImageMessage(imageUrl));
        galleryGrid.appendChild(galleryItem);
    });
}

// Show image click message
function showImageMessage(imageUrl) {
    popupImage.src = imageUrl;
    imageMessage.classList.remove('hidden');
}

function hideImageMessage() {
    imageMessage.classList.add('hidden');
    popupImage.src = '';
}

// Page navigation
function goToPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= pages.length) return;
    
    pages[currentPage].classList.remove('active');
    if (pageIndex < currentPage) {
        pages[currentPage].classList.add('prev');
    } else {
        pages[currentPage].classList.remove('prev');
    }
    
    currentPage = pageIndex;
    pages[currentPage].classList.add('active');
    pages[currentPage].classList.remove('prev');
}

// Click navigation setup
function setupClickNavigation() {
    document.querySelectorAll('.swipe-hint.right').forEach(hint => {
        hint.addEventListener('click', () => {
            if (currentPage < pages.length - 1) {
                goToPage(currentPage + 1);
            }
        });
    });

    document.querySelectorAll('.swipe-hint.left').forEach(hint => {
        hint.addEventListener('click', () => {
            if (currentPage > 0) {
                goToPage(currentPage - 1);
            }
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (lockscreen.classList.contains('hidden')) {
        switch(e.key) {
            case 'ArrowLeft':
                if (currentPage > 0) {
                    goToPage(currentPage - 1);
                }
                break;
            case 'ArrowRight':
                if (currentPage < pages.length - 1) {
                    goToPage(currentPage + 1);
                }
                break;
            case 'Escape':
                if (isZoomed) {
                    bearContainer.click();
                }
                if (!loveMessage.classList.contains('hidden')) {
                    loveMessage.classList.add('hidden');
                }
                if (!imageMessage.classList.contains('hidden')) {
                    hideImageMessage();
                }
                break;
        }
    }
});

// Setup additional event listeners
function setupEventListeners() {
    // Close love message when clicking outside
    document.addEventListener('click', function(e) {
        if (!heartButton.contains(e.target) && !loveMessage.contains(e.target)) {
            loveMessage.classList.add('hidden');
        }

        // Close popup when clicking outside the image card.
        if (e.target === imageMessage) {
            hideImageMessage();
        }
    });
    
    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            if (this.src !== 'https://i.imgur.com/DuvwmDi.png') {
                this.src = 'https://i.imgur.com/DuvwmDi.png';
            }
        });
    });
}

// Animation helpers
function animateElement(element, animation, duration = 300) {
    element.style.animation = `${animation} ${duration}ms ease-out`;
    setTimeout(() => {
        element.style.animation = '';
    }, duration);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimizations
const debouncedResize = debounce(() => {
    // Handle resize events if needed
}, 250);

window.addEventListener('resize', debouncedResize);

// Preload images for better performance
function preloadImages() {
    galleryImages.forEach(imageUrl => {
        const img = new Image();
        img.src = imageUrl;
    });
    
    // Preload other important images
    const bearImg = new Image();
    bearImg.src = 'https://i.imgur.com/DuvwmDi.png';
    
    const heartImg = new Image();
    heartImg.src = 'https://static.vecteezy.com/system/resources/previews/067/221/394/non_2x/cute-3d-cartoon-heart-character-on-transparent-background-free-png.png';
}

// Start preloading images
preloadImages();

// Add some visual feedback for interactions
function addRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Console message for developers
console.log('💝 Bear Love Website loaded successfully! Made with love for Heidy by Voltairenoel Encarnacion');

// Service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}