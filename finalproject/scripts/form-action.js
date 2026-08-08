window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const content = document.querySelector('#details-content');

    if (params.has('fullName')) {
        content.innerHTML = `
            <p><strong>Name:</strong> ${params.get('fullName')}</p>
            <p><strong>Email:</strong> ${params.get('email')}</p>
            <p><strong>Experience:</strong> ${params.get('experience')}</p>
            <p><strong>Interest:</strong> ${params.get('interest')}</p>
            <p><strong>Comments:</strong> ${params.get('comments') || 'None'}</p>
        `;
    } else {
        content.innerHTML = '<p>No application data found. Please go back to the membership page.</p>';
    }
});
