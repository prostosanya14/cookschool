document.addEventListener('DOMContentLoaded', () => {
    const email = sessionStorage.getItem('email');
    if (!email) {
        sessionStorage.clear();
        window.location.href = 'login.html';
    }
});
