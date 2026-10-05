const WHATSAPP_NUMBER = '5518997274433';
const DEFAULT_MESSAGE = 'Olá Bruna! Gostaria de solicitar um orçamento.';

function whatsappUrl(product = '') {
    const message = product
        ? `Olá Bruna! Gostaria de solicitar um orçamento para ${product}.`
        : DEFAULT_MESSAGE;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function initMenu() {
    const button = document.querySelector('.hamburger');
    const menu = document.querySelector('#main-menu');
    if (!button || !menu) return;

    const closeMenu = () => {
        menu.classList.remove('active');
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Abrir menu');
    };

    button.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('active');
        button.classList.toggle('active', isOpen);
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', event => {
        if (!menu.contains(event.target) && !button.contains(event.target)) closeMenu();
    });
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') closeMenu();
    });
}

function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function initPortfolioFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.portfolio-item');
    if (!buttons.length || !cards.length) return;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            buttons.forEach(item => {
                const active = item === button;
                item.classList.toggle('active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            cards.forEach(card => {
                const visible = filter === 'all' || card.dataset.category === filter;
                card.hidden = !visible;
                if (visible) card.classList.add('filter-in');
            });
        });
    });
}

function initWhatsAppLinks() {
    document.querySelectorAll('[data-product]').forEach(link => {
        link.href = whatsappUrl(link.dataset.product);
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });

    document.querySelectorAll('[data-track]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'cta_click', { cta_name: link.dataset.track });
            }
        });
    });
}

function initRevealAnimations() {
    const items = document.querySelectorAll('.portfolio-item, .feature-item, .step-item');
    if (!items.length || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -30px' });
    items.forEach(item => observer.observe(item));
}

function initYear() {
    const year = document.querySelector('#current-year');
    if (year) year.textContent = new Date().getFullYear();
}

function initInstagramInteractions() {
    const instagramUrl = 'https://www.instagram.com/bruna_personalizalove/';
    document.querySelectorAll('.instagram-story').forEach(story => {
        story.addEventListener('click', () => window.open(instagramUrl, '_blank', 'noopener,noreferrer'));
    });

    const phone = document.querySelector('.instagram-phone');
    if (phone) {
        phone.addEventListener('mouseenter', () => {
            phone.style.transform = 'translateY(-10px)';
            phone.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.4)';
        });
        phone.addEventListener('mouseleave', () => {
            phone.style.transform = 'translateY(0)';
            phone.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    initSmoothAnchors();
    initPortfolioFilters();
    initWhatsAppLinks();
    initRevealAnimations();
    initYear();
    initInstagramInteractions();
});
