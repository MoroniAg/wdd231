import { spotlights } from '../data/spotlights.mjs';

function updateVisitMessage() {
    const visitMessageElement = document.querySelector('#visit-message');
    if (!visitMessageElement) return;

    const lastVisit = localStorage.getItem('lastVisitDate');
    const now = new Date();

    if (!lastVisit) {
        visitMessageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(lastVisit);
        const diffInTime = now.getTime() - lastVisitDate.getTime();
        const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

        if (diffInDays < 1) {
            visitMessageElement.textContent = "Back so soon! Awesome!";
        } else if (diffInDays === 1) {
            visitMessageElement.textContent = "You last visited 1 day ago.";
        } else {
            visitMessageElement.textContent = `You last visited ${diffInDays} days ago.`;
        }
    }
    localStorage.setItem('lastVisitDate', now.toISOString());
}

function renderSpotlights() {
    const spotlightsContainer = document.querySelector('.spotlights-grid');
    if (!spotlightsContainer) return;

    spotlightsContainer.innerHTML = '';

    spotlights.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';
        
        const isLCP = index === 0;
        const loadingAttr = isLCP ? '' : 'loading="lazy"';
        const priorityAttr = isLCP ? 'fetchpriority="high"' : '';

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.name}" ${loadingAttr} ${priorityAttr}>
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
        `;
        spotlightsContainer.appendChild(card);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    updateVisitMessage();
    renderSpotlights();
});
