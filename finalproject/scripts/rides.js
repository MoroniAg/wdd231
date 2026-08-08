import { rides } from '../data/rides.mjs';

export function renderRides() {
    const container = document.querySelector('#rides-container');
    if (!container) return;

    container.innerHTML = ''; 

    rides.forEach(ride => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${ride.name}</h3>
            <p><strong>Level:</strong> ${ride.level}</p>
            <p><strong>Distance:</strong> ${ride.distance}</p>
            <p><strong>Duration:</strong> ${ride.duration}</p>
            <p><strong>Meeting Point:</strong> ${ride.meetingPoint}</p>
            <p class="ride-description">${ride.description}</p>
            <button class="btn btn-accent" data-id="${ride.id}">Ride Details</button>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    renderRides();
});
