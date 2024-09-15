// fetch-text.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('content/location.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            document.getElementById('text-content').textContent = text;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('text-content').textContent = 'Failed to load text.';
        });
});
