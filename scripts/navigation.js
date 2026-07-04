document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.querySelector('nav');

    menuBtn.addEventListener('click', function() {
        nav.classList.toggle('open');
        menuBtn.classList.toggle('open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.style.textDecoration = 'none');
            this.style.textDecoration = 'underline';
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
});