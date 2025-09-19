/**
 * V_Green 반려동물 초상화 브랜드
 * 홍지선 작가 랜딩 페이지 JavaScript
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Website Initialization
function initializeWebsite() {
    initHeroSlider();
    initSmoothScrolling();
    initPortfolioFilter();
    initScrollAnimations();
    initContactForm();
    initNavigationScroll();
    initMobileMenu();
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    let currentSlide = 0;
    let autoSlideInterval;
    
    if (slides.length <= 1) return;
    
    // Show specific slide
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('opacity-100');
            slide.classList.add('opacity-0');
        });
        
        // Show current slide
        slides[index].classList.remove('opacity-0');
        slides[index].classList.add('opacity-100');
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('bg-opacity-80');
                dot.classList.remove('bg-opacity-50');
            } else {
                dot.classList.remove('bg-opacity-80');
                dot.classList.add('bg-opacity-50');
            }
        });
        
        currentSlide = index;
    }
    
    // Next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }
    
    // Previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }
    
    // Start auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }
    
    // Stop auto slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });
    
    // Pause auto slide on hover
    const heroSection = document.querySelector('section');
    if (heroSection) {
        heroSection.addEventListener('mouseenter', stopAutoSlide);
        heroSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Initialize
    showSlide(0);
    startAutoSlide();
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Portfolio Filter
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                const categories = category.split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    item.classList.remove('hide');
                    item.style.display = 'block';
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll(
        '.portfolio-item, .exhibition-item, .process-step, .pricing-card, .contact-item'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Navigation Scroll Effect
function initNavigationScroll() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });
        
        // Mobile Works Dropdown Toggle
        const mobileWorksToggle = document.getElementById('mobile-works-toggle');
        const mobileWorksMenu = document.getElementById('mobile-works-menu');
        const mobileWorksIcon = document.getElementById('mobile-works-icon');
        
        if (mobileWorksToggle && mobileWorksMenu) {
            mobileWorksToggle.addEventListener('click', function() {
                mobileWorksMenu.classList.toggle('hidden');
                mobileWorksIcon.classList.toggle('rotate-180');
            });
        }
        
        // Close mobile menu when clicking on nav links
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars text-xl';
            }
        });
    }
}

// Contact Form Handler
function initContactForm() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> 전송 중...';
            submitBtn.disabled = true;
            
            // Collect form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission (replace with actual form handler)
            setTimeout(() => {
                // Show success message
                showMessage('문의가 성공적으로 전송되었습니다. 빠른 시일 내에 연락드리겠습니다.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // You can add actual form submission logic here
                console.log('Form submitted with data:', data);
                
            }, 2000);
        });
    }
}

// Show Message Function
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('#contact form');
    if (form) {
        form.appendChild(messageDiv);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
}

// Portfolio Image Modal (Lightbox)
function initPortfolioModal() {
    const portfolioItems = document.querySelectorAll('.portfolio-card');
    
    portfolioItems.forEach(item => {
        const img = item.querySelector('img');
        const button = item.querySelector('button');
        
        if (button) {
            button.addEventListener('click', function() {
                openLightbox(img.src, img.alt);
            });
        }
    });
}

// Lightbox Function
function openLightbox(imageSrc, imageAlt) {
    // Create lightbox overlay
    const lightbox = document.createElement('div');
    lightbox.className = 'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50';
    lightbox.innerHTML = `
        <div class="relative max-w-4xl max-h-full p-4">
            <img src="${imageSrc}" alt="${imageAlt}" class="max-w-full max-h-full object-contain rounded-lg">
            <button class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add close functionality
    const closeBtn = lightbox.querySelector('button');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    // Close on overlay click
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            document.body.removeChild(lightbox);
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
        }
    });
    
    document.body.appendChild(lightbox);
}

// Initialize Portfolio Modal after DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initPortfolioModal();
    }, 500);
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
function addScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'fixed bottom-6 right-6 bg-green-600 text-white w-12 h-12 rounded-full shadow-lg hover:bg-green-700 transition opacity-0 pointer-events-none z-40';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.onclick = scrollToTop;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollBtn.classList.add('opacity-0', 'pointer-events-none');
        }
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', function() {
    addScrollToTopButton();
});

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Performance Optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-based calculations here
        }, 10);
    });
    
    // Preload critical images
    const criticalImages = [
        'https://page.gensparksite.com/v1/base64_upload/7b15e1b6043ea6a3d6d9ab5c73efb0ad',
        'https://page.gensparksite.com/v1/base64_upload/90c57d935b2b529ce3e9547504e796b8'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
    initLazyLoading();
});

// Error Handling for Images
function handleImageErrors() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Replace with placeholder if image fails to load
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23f0f0f0" width="400" height="300"/><text fill="%23666" font-family="Arial" font-size="14" x="50%" y="50%" text-anchor="middle" dy="0.3em">이미지를 불러올 수 없습니다</text></svg>';
        });
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', function() {
    handleImageErrors();
});

// Analytics and Tracking (placeholder)
function initAnalytics() {
    // Track portfolio filter usage
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Analytics tracking code here
            console.log('Filter clicked:', this.getAttribute('data-filter'));
        });
    });
    
    // Track contact form interactions
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // Analytics tracking code here
            console.log('Contact form submitted');
        });
    }
}

// Initialize analytics
document.addEventListener('DOMContentLoaded', function() {
    initAnalytics();
});