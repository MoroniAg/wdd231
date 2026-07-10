
document.addEventListener('DOMContentLoaded', function () {
    const desktopBreakpoint = 608; // 38rem — matches styles/large.css
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('primary-nav');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', function () {
        const isOpen = nav.classList.toggle('open');
        menuBtn.classList.toggle('open', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when a link is tapped
    nav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth < desktopBreakpoint) {
                nav.classList.remove('open');
                menuBtn.classList.remove('open');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });
});
