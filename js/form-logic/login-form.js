import apiRequest from '../apiRequest.js';

document.addEventListener('DOMContentLoaded', () => {

    let login = document.getElementById('login-form');

    login.addEventListener('submit', async (event) => {

        event.preventDefault();

        let login = document.getElementById('email');
        let pass = document.getElementById('pass');

            const data = {
                login: String(login.value.trim()),
                pass: String(pass.value.trim())
            }


        const result = await apiRequest('/php/login.php', data);

        if (!result || result.error) {
            alert('Ошибка соединения или сервера');
        } else if (Array.isArray(result) && result.length > 0) {
            const user = result[0];
            sessionStorage.setItem('name', user.name);
            sessionStorage.setItem('email', user.email);
            sessionStorage.setItem('role', user.role);
            sessionStorage.setItem('age', user.age);
            window.location.href = 'account.html';
        } else {
            alert(result.message || 'Неверный логин или пароль');
        }

    });

});