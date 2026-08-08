export function initModal() {
    const modal = document.querySelector('#ride-modal');
    const closeBtn = document.querySelector('#close-modal');
    const modalTitle = document.querySelector('#modal-title');
    const modalDesc = document.querySelector('#modal-desc');

    if (!modal) return;

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-accent') && e.target.dataset.id) {
            const rideId = e.target.dataset.id;
            openRideModal(rideId);
        }
    });
}

async function openRideModal(id) {
    const modal = document.querySelector('#ride-modal');
    const modalTitle = document.querySelector('#modal-title');
    const modalDesc = document.querySelector('#modal-desc');
    
    try {
        const response = await fetch('data/rides.json');
        const rides = await response.json();
        const ride = rides.find(r => r.id == id);

        if (ride) {
            modalTitle.textContent = ride.name;
            modalDesc.textContent = `${ride.description} This ride is ${ride.distance} long and typically takes ${ride.duration}. Meet at ${ride.meetingPoint}.`;
            modal.style.display = 'block';
        }
    } catch (err) {
        console.error('Error opening modal:', err);
    }
}

export function initTheme() {
    const themeBtn = document.querySelector('#theme-toggle');
    const body = document.body;

    // Load preference from localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
        });
    }
}
