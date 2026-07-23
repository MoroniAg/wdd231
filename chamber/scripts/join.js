document.addEventListener('DOMContentLoaded', () => {
    // Set hidden timestamp
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toLocaleString();
    }

    // Modal Logic
    const modals = document.querySelectorAll('.modal');
    const triggers = document.querySelectorAll('.modal-trigger');
    const closeButtons = document.querySelectorAll('.close-button');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                modal.classList.add('open');
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('open');
            }
        });
    });

    // Close modal when clicking outside the content
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.classList.remove('open');
            }
        });
    });
});