document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    // Smooth follower movement
    function animateCursor() {
        posX += (mouseX - posX) / 6;
        posY += (mouseY - posY) / 6;
        
        follower.style.transform = `translate3d(${posX - 16}px, ${posY - 16}px, 0)`;
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect for cursor
    const links = document.querySelectorAll('a, button, .project-card, .skill-tag');
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            follower.style.transform = `translate3d(${posX - 16}px, ${posY - 16}px, 0) scale(1.5)`;
            follower.style.background = 'rgba(255, 255, 255, 0.1)';
        });
        link.addEventListener('mouseleave', () => {
            follower.style.transform = `translate3d(${posX - 16}px, ${posY - 16}px, 0) scale(1)`;
            follower.style.background = 'none';
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply reveal class to sections
    const sections = document.querySelectorAll('.section, .hero-content, .project-card');
    sections.forEach(section => {
        section.classList.add('reveal-init');
        observer.observe(section);
    });

    // Mobile Menu Toggle (Simplified)
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-color)';
                navLinks.style.padding = '20px';
                navLinks.style.borderBottom = '1px solid var(--card-border)';
            }
        });
    }

    // Form Submission (Demo)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Message Sent!';
                btn.style.background = '#22c55e'; // Green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});

// Add these styles dynamically for animations
const style = document.createElement('style');
style.textContent = `
    .reveal-init {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
