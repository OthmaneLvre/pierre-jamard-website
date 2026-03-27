// ================================
// Header dynamique au scroll 
// ================================
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ================================
// Navigation active selon la section visible
// ================================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const setActiveLink = () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
         ) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Cas spécial : bas de page => active "contact"
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        currentSectionId = 'contact';
    }

    navLinks.forEach((link) => {
        link.classList.remove('active');

        const href = link.getAttribute('href');

        if (href === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// ================================
// Apparition progressive des sections 
// ================================
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});