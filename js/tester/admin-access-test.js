document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('role') != 2) {
        window.location.href = 'main.html';
    }
});