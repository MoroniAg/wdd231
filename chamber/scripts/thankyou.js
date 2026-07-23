document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    const fields = ['firstName', 'lastName', 'email', 'phone', 'orgName', 'timestamp'];
    
    fields.forEach(field => {
        const element = document.getElementById(`display-${field}`);
        if (element) {
            element.textContent = params.get(field) || 'Not provided';
        }
    });
});