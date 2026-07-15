async function loadSpotlights() {
    const dataUrl = 'data/members.json';
    const spotlightsContainer = document.querySelector('.spotlights-grid');
    if (!spotlightsContainer) return;

    try {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch members data');
        }
        const data = await response.json();
        const members = data.members;

        // Filter for Gold (3) or Silver (2) members
        const eligibleMembers = members.filter(member => member.membership === 3 || member.membership === 2);

        // Randomly pick 2 or 3 members
        const shuffled = [...eligibleMembers].sort(() => 0.5 - Math.random());
        const selectedCount = Math.min(3, Math.max(2, Math.floor(Math.random() * 2) + 2)); 
        const selectedMembers = shuffled.slice(0, selectedCount);

        // Clear existing static content
        spotlightsContainer.innerHTML = '';

        selectedMembers.forEach(member => {
            const level = member.membership === 3 ? 'Gold' : 'Silver';
            const card = document.createElement('article');
            card.className = 'spotlight-card';
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} logo" class="spotlight-img">
                <h3>${member.name}</h3>
                <p class="membership-level">${level} Member</p>
                <p class="spotlight-info">${member.address}</p>
                <p class="spotlight-info">${member.phone}</p>
                <a href="${member.website}" class="spotlight-link" target="_blank" rel="noopener noreferrer">Visit Website</a>
            `;
            spotlightsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading spotlights:', error);
        spotlightsContainer.innerHTML = '<p>Unable to load company spotlights at this time.</p>';
    }
}

// Initialize spotlights on window load
window.addEventListener('DOMContentLoaded', loadSpotlights);
