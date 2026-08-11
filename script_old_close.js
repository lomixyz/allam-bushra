document.addEventListener('DOMContentLoaded', () => {
    // Dynamic Year
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Language Switching Logic
    const langToggle = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('portfolio-lang') || 'en';

    const updateLanguage = (lang) => {
        const elements = document.querySelectorAll('[data-en]');
        elements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update placeholders
        const inputs = document.querySelectorAll('[data-en-placeholder]');
        inputs.forEach(input => {
            input.placeholder = input.getAttribute(`data-${lang}-placeholder`);
        });

        // Toggle RTL and Button Text
        if (lang === 'ar') {
            document.body.classList.add('rtl');
            langToggle.textContent = 'EN';
        } else {
            document.body.classList.remove('rtl');
            langToggle.textContent = 'AR';
        }

        localStorage.setItem('portfolio-lang', lang);
    };

    // Initialize Language
    updateLanguage(currentLang);

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        updateLanguage(currentLang);
    });

    // Sticky Navbar on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(10, 10, 18, 0.95)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.background = 'rgba(10, 10, 18, 0.8)';
        }
    });

    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    menuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        if (navLinks.style.display === 'flex') {
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'var(--bg-dark)';
            navLinks.style.padding = '20px';
            navLinks.querySelectorAll('li').forEach(li => li.style.margin = '10px 0');
        }
    });

    // Scroll Animations using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const fadeUpElements = document.querySelectorAll('.fade-up');
    fadeUpElements.forEach(el => observer.observe(el));

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Animation Delay
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});
