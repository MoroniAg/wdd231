/* =============================================================
   Directory page — fetch member data, render cards, toggle view
   Uses the local data file ./data/members.json
   ============================================================= */

const MEMBERS_URL = './data/members.json';
const FALLBACK_IMAGE = 'images/member-placeholder.svg';

const membershipLabels = {
    1: { label: 'Member', cls: '' },
    2: { label: 'Silver', cls: 'silver' },
    3: { label: 'Gold', cls: 'gold' }
};

function membershipTag(level) {
    const info = membershipLabels[level] || { label: 'Member', cls: '' };
    return `<span class="member-tag ${info.cls}">${info.label}</span>`;
}

function safe(value, fallback = '') {
    return value && String(value).trim() ? value : fallback;
}

function memberCard(member) {
    const image = safe(member.image, FALLBACK_IMAGE);
    const address = safe(member.address, 'Address not provided');
    const phone = safe(member.phone);
    const url = safe(member.website);
    const name = safe(member.name, 'Unnamed Business');
    const description = safe(member.description);

    return `
        <article class="member-card" data-level="${member.membership || 1}">
            <div class="member-image">
                <img src="${image}" alt="${name} logo" loading="lazy" width="140" height="100"
                    onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
            </div>
            <div class="member-body">
                ${membershipTag(member.membership)}
                <h3>${name}</h3>
                ${description ? `<p class="member-address">${description}</p>` : ''}
                <p class="member-address">${address}</p>
                ${phone ? `<p class="member-phone">${phone}</p>` : ''}
                ${url ? `<p class="member-url"><a href="${url}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>` : ''}
            </div>
        </article>
    `;
}

function renderMembers(members) {
    const container = document.getElementById('members');
    const countEl = document.getElementById('member-count');
    if (!container) return;

    container.innerHTML = members.map(memberCard).join('');

    if (countEl) {
        countEl.textContent = members.length;
    }
}

function setView(view) {
    const container = document.getElementById('members');
    if (!container) return;

    container.classList.toggle('members-grid', view === 'grid');
    container.classList.toggle('members-list', view === 'list');

    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');
    if (gridBtn && listBtn) {
        const isGrid = view === 'grid';
        gridBtn.classList.toggle('active', isGrid);
        listBtn.classList.toggle('active', !isGrid);
        gridBtn.setAttribute('aria-pressed', String(isGrid));
        listBtn.setAttribute('aria-pressed', String(!isGrid));
    }
}

async function loadMembers() {
    try {
        const response = await fetch(MEMBERS_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const members = Array.isArray(data) ? data : data.members;

        if (!Array.isArray(members)) {
            throw new Error('Member data does not contain a members array');
        }

        renderMembers(members);
    } catch (err) {
        const container = document.getElementById('members');
        if (container) {
            container.innerHTML = `
                <p class="member-address" role="alert">
                    Unable to load member data right now. Please try again later.
                </p>
            `;
        }
        // eslint-disable-next-line no-console
        console.error('Failed to load members:', err);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const gridBtn = document.getElementById('grid-btn');
    const listBtn = document.getElementById('list-btn');

    if (gridBtn) {
        gridBtn.addEventListener('click', () => setView('grid'));
    }
    if (listBtn) {
        listBtn.addEventListener('click', () => setView('list'));
    }

    loadMembers();
});
