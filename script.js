// Main JavaScript file with anime.js animations and interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Hero text staggered entrance animation
    const heroElements = document.querySelectorAll('.hero .reveal-el');
    if (heroElements.length) {
        anime({
            targets: heroElements,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 900,
            delay: anime.stagger(180, { start: 200 }),
            easing: 'easeOutExpo',
        });
    }

    // Prepare all reveal elements for scroll animation
    const revealItems = document.querySelectorAll('.reveal-el');
    
    // Scroll reveal with anime.js
    function animateOnScroll() {
        const windowHeight = window.innerHeight;
        const triggerBottom = windowHeight - 100;
        
        revealItems.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            if (boxTop < triggerBottom && !el.classList.contains('animated-reveal')) {
                el.classList.add('animated-reveal');
                
                // Determine stagger delay based on element type
                const parent = el.closest('.features-grid') ? 'feature' : 
                              (el.closest('.stats-row') ? 'stat' : 'generic');
                let delayVal = 0;
                
                if (parent === 'feature') delayVal = 80;
                else if (parent === 'stat') delayVal = 100;
                else delayVal = 60;
                
                anime({
                    targets: el,
                    opacity: [0, 1],
                    translateY: [35, 0],
                    duration: 700,
                    delay: delayVal,
                    easing: 'cubicBezier(0.2, 0.9, 0.4, 1.1)'
                });
            }
        });
    }
    
    // Attach scroll event with requestAnimationFrame for performance
    window.addEventListener('scroll', () => { 
        requestAnimationFrame(animateOnScroll); 
    });
    animateOnScroll(); // Initial run for visible elements

    // Button hover animations with anime.js
    const btns = document.querySelectorAll('.btn-primary, .btn-ghost, .btn-outline');
    btns.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            anime({
                targets: btn,
                scale: 1.03,
                duration: 300,
                easing: 'easeOutElastic(1, .5)',
            });
            
            // Shadow glow pulse effect
            anime({
                targets: btn,
                boxShadow: btn.classList.contains('btn-primary') ? 
                    '0 0 18px rgba(0,242,255,0.8)' : 
                    '0 0 15px rgba(0,242,255,0.5)',
                duration: 200,
                direction: 'alternate',
                loop: false
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            anime({
                targets: btn,
                scale: 1,
                boxShadow: btn.classList.contains('btn-primary') ? 
                    '0 8px 20px rgba(0, 119, 255, 0.3)' : 
                    'none',
                duration: 400,
                easing: 'easeOutQuad'
            });
        });
    });

    // CTA button interactions
    const demoBtn = document.getElementById('demoBtn');
    const exploreBtn = document.getElementById('exploreBtn');
    
    if (demoBtn) {
        demoBtn.addEventListener('click', () => {
            // Button ripple effect
            anime({
                targets: demoBtn,
                scale: [1, 0.98, 1.02, 1],
                duration: 400,
                easing: 'easeOutQuad'
            });
            
            // Show demo alert with animation
            const notification = document.createElement('div');
            notification.textContent = '🚀 Launching Nexus Core Experience...';
            notification.style.cssText = `
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: rgba(0,242,255,0.9);
                color: #000;
                padding: 12px 24px;
                border-radius: 50px;
                font-weight: 600;
                z-index: 1000;
                backdrop-filter: blur(10px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                font-family: 'Inter', sans-serif;
            `;
            document.body.appendChild(notification);
            
            anime({
                targets: notification,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 400,
                complete: () => {
                    setTimeout(() => {
                        anime({
                            targets: notification,
                            opacity: [1, 0],
                            translateY: [0, -20],
                            duration: 400,
                            complete: () => notification.remove()
                        });
                    }, 2000);
                }
            });
            
            console.log('Experience launched — Nexus Core AI ready.');
        });
    }
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', () => {
            // Smooth scroll to features section
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
                
                // Animate section highlight
                anime({
                    targets: featuresSection,
                    opacity: [0.7, 1],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
            }
        });
    }

    // Logo subtle pulse animation
    anime({
        targets: '.logo',
        keyframes: [
            { textShadow: '0 0 2px #00f2ff' },
            { textShadow: '0 0 8px #00f2ff' },
            { textShadow: '0 0 2px #00f2ff' }
        ],
        duration: 2000,
        loop: true,
        easing: 'easeInOutSine'
    });

    // Feature cards hover glow animation
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            anime({
                targets: card,
                borderColor: '#00f2ff',
                boxShadow: '0 25px 45px -12px rgba(0,242,255,0.4)',
                duration: 300
            });
        });
        
        card.addEventListener('mouseleave', () => {
            anime({
                targets: card,
                borderColor: 'rgba(0,242,255,0.2)',
                boxShadow: 'none',
                duration: 400
            });
        });
    });

    // Stats observer for initial entrance animation
    const statsRow = document.querySelector('.stats-row');
    if (statsRow && !statsRow.classList.contains('stats-animated')) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('stats-animated')) {
                    entry.target.classList.add('stats-animated');
                    const statItems = document.querySelectorAll('.stat-item');
                    anime({
                        targets: statItems,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: anime.stagger(120),
                        duration: 800,
                        easing: 'easeOutCubic'
                    });
                    statObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });
        
        statObserver.observe(statsRow);
    }

    // Navbar link hover animation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            anime({
                targets: link,
                letterSpacing: '0.5px',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        link.addEventListener('mouseleave', () => {
            anime({
                targets: link,
                letterSpacing: '0.3px',
                duration: 200
            });
        });
    });

    // Floating animation for hero badge
    anime({
        targets: '.hero-badge',
        translateY: [-3, 3],
        duration: 1500,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
    });

    // Window load additional reveal
    window.addEventListener('load', () => {
        setTimeout(() => {
            const hiddenReveals = document.querySelectorAll('.reveal-el:not(.animated-reveal)');
            if (hiddenReveals.length) {
                hiddenReveals.forEach(el => {
                    if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                        anime({
                            targets: el,
                            opacity: [0, 1],
                            translateY: [30, 0],
                            duration: 700,
                            easing: 'easeOutQuad'
                        });
                        el.classList.add('animated-reveal');
                    }
                });
            }
        }, 300);
    });

    // Console log for development
    console.log('✨ Nexus Core UI initialized with anime.js animations');
});