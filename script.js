/* ==========================================
   MapCars Landing Page - JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroSlideshow();
    initParticles();
    initScrollAnimations();
    initCounterAnimation();
    initContactForm();
    initSmoothScroll();
    initMapPinAnimations();
    initPhoneScreens();
    initMapInteraction();
    initCountdown();
    initWaitlistForm();
});

/* ---------- PHONE SCREEN SWITCHER ---------- */
function initPhoneScreens() {
    /**
     * switchScreens - cycles through .pscreen elements inside a container,
     * updating indicator dots and using CSS enter/exit transitions.
     */
    function createSwitcher(screensContainerId, dotsContainerId, intervalMs) {
        const container = document.getElementById(screensContainerId);
        const dotsEl    = document.getElementById(dotsContainerId);
        if (!container || !dotsEl) return;

        const screens = Array.from(container.querySelectorAll('.pscreen'));
        const dots    = Array.from(dotsEl.querySelectorAll('.sdot'));
        let current   = 0;
        let locked    = false;

        function goTo(next) {
            if (locked || next === current) return;
            locked = true;

            const outgoing = screens[current];
            const incoming = screens[next];

            // Exit the current screen
            outgoing.classList.remove('active');
            outgoing.classList.add('exiting');

            // Enter the next screen
            incoming.classList.add('active');

            // Update dots
            dots[current].classList.remove('active');
            dots[next].classList.add('active');

            current = next;

            // Clean up after transition
            setTimeout(() => {
                outgoing.classList.remove('exiting');
                locked = false;
            }, 600); // matches CSS transition duration
        }

        // Auto-advance
        setInterval(() => {
            const next = (current + 1) % screens.length;
            goTo(next);
        }, intervalMs);

        // Click dots to jump directly
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goTo(i));
        });
    }

    // Single iPhone with 6 customer screens, 3.8s per screen
    createSwitcher('iphone-screens', 'iphone-dots', 3800);
}


/* ---------- NAVBAR ---------- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile toggle
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/* ---------- HERO SLIDESHOW ---------- */
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-bg-slide');
    const heroSection = document.getElementById('hero');
    let currentSlide = 0;
    const totalSlides = slides.length;
    const interval = 5000; // 5 seconds per slide

    // Create progress dots
    const progressContainer = document.createElement('div');
    progressContainer.className = 'slideshow-progress';
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = `progress-dot${i === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        progressContainer.appendChild(dot);
    }
    heroSection.appendChild(progressContainer);

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        progressContainer.children[currentSlide].classList.remove('active');
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        progressContainer.children[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    setInterval(nextSlide, interval);
}

/* ---------- PARTICLES ---------- */
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;
        particle.style.width = `${2 + Math.random() * 3}px`;
        particle.style.height = particle.style.width;

        // Randomize colors between primary and accent
        const colors = ['#0D9488', '#2DD4BF', '#06B6D4', '#F59E0B', '#14B8A6'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(particle);
    }
}

/* ---------- SCROLL ANIMATIONS ---------- */
function initScrollAnimations() {
    // Add animation classes to elements
    const animatedElements = [
        { selector: '#features-header', class: 'fade-in' },
        { selector: '#features-grid', class: 'fade-in' },
        { selector: '#coverage-header', class: 'fade-in' },
        { selector: '#map-wrapper', class: 'fade-in' },
        { selector: '#stats-row', class: 'fade-in' },
        { selector: '#contact-info', class: 'fade-in-left' },
        { selector: '#contact-form-wrapper', class: 'fade-in-right' },
    ];

    animatedElements.forEach(({ selector, class: animClass }) => {
        const el = document.querySelector(selector);
        if (el) el.classList.add(animClass);
    });

    // Add staggered delay to stat cards
    document.querySelectorAll('.stat-card').forEach((card, i) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${i * 0.1}s`;
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Don't unobserve to allow re-animation if wanted, but for perf:
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
    });
}

/* ---------- COUNTER ANIMATION ---------- */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, { threshold: 0.2 }); // 0.2 so counters fire on short mobile viewports

    const statsRow = document.getElementById('stats-row');
    if (statsRow) observer.observe(statsRow);
}

function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const suffix = element.dataset.suffix || '';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ---------- MAP PIN ANIMATIONS ---------- */
function initMapPinAnimations() {
    const pins = document.querySelectorAll('.map-pin');
    
    // Stagger the pulse animations
    pins.forEach((pin, i) => {
        const pulse = pin.querySelector('.pin-pulse');
        if (pulse) {
            pulse.style.animationDelay = `${i * 0.35}s`;
        }
    });

    // Add entrance animation when scrolled into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const mapPins = entry.target.querySelectorAll('.map-pin');
                mapPins.forEach((pin, i) => {
                    setTimeout(() => {
                        pin.style.opacity = '1';
                        pin.style.transform = 'scale(1)';
                    }, i * 150);
                });
            }
        });
    }, { threshold: 0.3 });

    const mapWrapper = document.getElementById('map-wrapper');
    if (mapWrapper) {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        pins.forEach(pin => {
            pin.style.opacity = '0';
            pin.style.transform = isMobile ? 'scale(0.6)' : 'scale(0)';
            pin.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        observer.observe(mapWrapper);
    }
}

/* ---------- CONTACT FORM ---------- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Button loading state
        const originalContent = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <svg class="spinner" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" stroke-dasharray="30 70" stroke-linecap="round">
                    <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="0.8s" repeatCount="indefinite"/>
                </circle>
            </svg>
            <span>Sending...</span>
        `;
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        // Simulate submission
        setTimeout(() => {
            submitBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Message Sent!</span>
            `;
            submitBtn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            submitBtn.style.opacity = '1';
            
            // Reset after 3s
            setTimeout(() => {
                submitBtn.innerHTML = originalContent;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
        }, 1500);
    });

    // Input focus animation
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-2px)';
            input.parentElement.style.transition = 'transform 0.3s ease';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = '';
        });
    });
}

/* ---------- SMOOTH SCROLL ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Get Notified button scroll to contact
    const ctaBtn = document.getElementById('nav-cta');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            const contact = document.getElementById('contact');
            if (contact) {
                const offset = 80;
                const top = contact.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    }
}

/* ---------- COUNTDOWN TIMER ---------- */
function initCountdown() {
    const launchDate = new Date('2027-01-01T00:00:00').getTime();

    const daysEl  = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minsEl  = document.getElementById('cd-mins');
    const secsEl  = document.getElementById('cd-secs');

    if (!daysEl) return;

    function pad(n) { return String(n).padStart(2, '0'); }

    function tick() {
        const now = Date.now();
        const diff = launchDate - now;

        if (diff <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            return;
        }

        const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const secs  = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent  = pad(days);
        hoursEl.textContent = pad(hours);
        minsEl.textContent  = pad(mins);
        secsEl.textContent  = pad(secs);
    }

    tick();
    setInterval(tick, 1000);
}

/* ---------- WAITLIST FORM ---------- */
function initWaitlistForm() {
    const form   = document.getElementById('waitlist-form');
    const btn    = document.getElementById('waitlist-btn');
    const proof  = document.querySelector('.waitlist-social-proof');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('waitlist-email').value;
        if (!email) return;

        btn.disabled = true;
        btn.textContent = 'Joining...';

        setTimeout(() => {
            btn.textContent = 'You\'re on the list!';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            if (proof) {
                proof.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="#10B981" width="14" height="14" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01" fill="none" stroke="#10B981" stroke-width="2.5" stroke-linecap="round"/></svg>
                    <strong>Welcome aboard!</strong> We'll notify you at launch.
                `;
            }
        }, 1000);
    });
}

/* ---------- MAP & PANEL INTERACTION ---------- */
function initMapInteraction() {
    const locationItems = document.querySelectorAll('.location-item');
    const mapPins       = document.querySelectorAll('.map-pin');

    locationItems.forEach(item => {
        const pinName = item.getAttribute('data-pin');
        const correspondingPin = Array.from(mapPins).find(pin => pin.getAttribute('data-location') === pinName);

        // Hover list item -> highlight map pin
        item.addEventListener('mouseenter', () => {
            if (correspondingPin) correspondingPin.classList.add('highlighted');
        });

        item.addEventListener('mouseleave', () => {
            if (correspondingPin) correspondingPin.classList.remove('highlighted');
        });

        // Click list item -> spotlight map pin
        item.addEventListener('click', () => {
            mapPins.forEach(p => p.classList.remove('highlighted'));
            locationItems.forEach(li => li.classList.remove('active'));

            if (correspondingPin) correspondingPin.classList.add('highlighted');
            item.classList.add('active');
        });
    });

    // Hover map pin -> highlight list item
    mapPins.forEach(pin => {
        const locName = pin.getAttribute('data-location');
        const correspondingItem = Array.from(locationItems).find(item => item.getAttribute('data-pin') === locName);

        pin.addEventListener('mouseenter', () => {
            if (correspondingItem) correspondingItem.classList.add('active');
        });

        pin.addEventListener('mouseleave', () => {
            if (correspondingItem) correspondingItem.classList.remove('active');
        });
    });
}

