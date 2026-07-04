document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('currentyear');
    const lastModifiedElement = document.getElementById('last-modified');

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }
});