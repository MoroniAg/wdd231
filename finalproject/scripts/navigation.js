export const toggleMenu = () => {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });
    }
};

const populateFooter = () => {
    const currentYear = document.querySelector('#currentyear');
    const lastModified = document.querySelector('#lastModified');

    if (currentYear) currentYear.textContent = new Date().getFullYear();
    if (lastModified) lastModified.textContent = document.lastModified;
};

document.addEventListener('DOMContentLoaded', () => {
    toggleMenu();
    populateFooter();
});
