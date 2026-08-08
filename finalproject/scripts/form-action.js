window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const content = document.querySelector('#details-content');

    if (!content) return;

    const details = [
        ['Name', params.get('fullName')],
        ['Email', params.get('email')],
        ['Experience', params.get('experience')],
        ['Interest', params.get('interest')],
        ['Comments', params.get('comments') || 'None']
    ];

    if (!params.has('fullName')) {
        content.textContent = 'No application data found. Please go back to the membership page.';
        return;
    }

    const fragment = document.createDocumentFragment();
    details.forEach(([label, value]) => {
        const item = document.createElement('p');
        const heading = document.createElement('strong');
        heading.textContent = `${label}: `;
        item.append(heading, value || 'Not provided');
        fragment.append(item);
    });
    content.replaceChildren(fragment);
});
