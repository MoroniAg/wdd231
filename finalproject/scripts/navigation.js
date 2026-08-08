export const toggleMenu = () => {
    const hamburger = document.querySelector('#hamburger');
    const navMenu = document.querySelector('#nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    toggleMenu();
});
