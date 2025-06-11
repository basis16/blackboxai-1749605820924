// Mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            mobileMenu.classList.toggle('hidden');
            
            // Toggle menu icon
            const menuIcon = mobileMenuButton.querySelector('i');
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars');
                menuIcon.classList.toggle('fa-times');
            }

            // Prevent body scroll when menu is open
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target) && isMenuOpen) {
                mobileMenu.classList.add('hidden');
                const menuIcon = mobileMenuButton.querySelector('i');
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-times');
                }
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    }

    // Scroll to Top Button
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        const handleScroll = () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-10');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-10');
            }
        };

        window.addEventListener('scroll', handleScroll);

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Search Functionality
    const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
    
    if (searchInputs.length > 0) {
        searchInputs.forEach(input => {
            let searchTimeout;

            input.addEventListener('focus', () => {
                const parent = input.parentElement;
                if (parent) {
                    parent.classList.add('ring-2', 'ring-red-600', 'bg-gray-900');
                }
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    const parent = input.parentElement;
                    if (parent) {
                        parent.classList.remove('ring-2', 'ring-red-600', 'bg-gray-900');
                    }
                }
            });

            input.addEventListener('input', (e) => {
                clearTimeout(searchTimeout);
                
                searchTimeout = setTimeout(() => {
                    const searchTerm = e.target.value.toLowerCase();
                    // Here you would typically make an API call to search
                    console.log('Searching for:', searchTerm);
                    
                    // For demo purposes, let's animate the search icon
                    const searchIcon = input.parentElement?.querySelector('i');
                    if (searchIcon) {
                        searchIcon.classList.add('fa-spin');
                        setTimeout(() => searchIcon.classList.remove('fa-spin'), 500);
                    }
                }, 300);
            });
        });
    }

    // Lazy loading images
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || '';
                    
                    // Add loading animation
                    img.style.opacity = '0';
                    img.onload = () => {
                        img.style.transition = 'opacity 0.5s ease-in-out';
                        img.style.opacity = '1';
                    };
                    
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Episode card hover effects
    const episodeCards = document.querySelectorAll('.episode-card');
    if (episodeCards.length > 0) {
        episodeCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const playButton = card.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'translateY(0)';
                    playButton.style.opacity = '1';
                }
            });

            card.addEventListener('mouseleave', () => {
                const playButton = card.querySelector('.play-button');
                if (playButton) {
                    playButton.style.transform = 'translateY(20px)';
                    playButton.style.opacity = '0';
                }
            });
        });
    }

    // Add loading state to buttons
    const loadingButtons = document.querySelectorAll('button[data-loading]');
    if (loadingButtons.length > 0) {
        loadingButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                if (this.dataset.loading !== 'true') {
                    const originalText = this.innerHTML;
                    this.dataset.loading = 'true';
                    this.disabled = true;
                    
                    // Add loading spinner
                    this.innerHTML = '<div class="loading-spinner mr-2"></div>';
                    
                    // Simulate loading state (remove in production and replace with actual loading logic)
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.dataset.loading = 'false';
                        this.disabled = false;
                    }, 1500);
                }
            });
        });
    }
});
