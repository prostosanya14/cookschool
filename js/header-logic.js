
document.addEventListener('DOMContentLoaded', () => {
    let quitButton = document.getElementById('quitButton');
    let loginButton = document.getElementById('loginButton');
    let accountLink = document.getElementById('accountLink');
    let adminLink = document.getElementById('adminLink');

    const userLogin = sessionStorage.getItem('email');
    const userRole  = parseInt(sessionStorage.getItem('role'));

    const toggle = (el, show) => {
        if (el) el.style.display = show ? 'block' : 'none';
    };

    quitButton?.addEventListener('click', () => {
        sessionStorage.clear();
        window.location.href = 'login.html';
    });
    const isAuth = !!userLogin;

    toggle(loginButton, !isAuth);
    toggle(quitButton,  isAuth);

    toggle(accountLink, isAuth && (userRole === 1 || userRole === 2));
    toggle(adminLink,   isAuth && userRole === 2);

});