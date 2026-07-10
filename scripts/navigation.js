document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.querySelector('nav');

    function setActiveLink(hash) {
        navLinks.forEach(link => {
            const isActive = link.getAttribute('href') === hash;
            link.classList.toggle('active', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', function() {
            const isOpen = nav.classList.toggle('open');
            menuBtn.classList.toggle('open', isOpen);
            menuBtn.setAttribute('aria-expanded', String(isOpen));
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || !targetId.startsWith('#')) return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            history.pushState(null, '', targetId);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveLink(targetId);

            if (window.innerWidth < 768) {
                nav.classList.remove('open');
                if (menuBtn) {
                    menuBtn.classList.remove('open');
                    menuBtn.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    setActiveLink(window.location.hash || '#home');
});