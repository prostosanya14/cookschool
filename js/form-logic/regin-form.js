import apiRequest from '../apiRequest.js';

document.addEventListener('DOMContentLoaded', () => {
    const regForm = document.getElementById('regin-form');

    regForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const pass = document.getElementById('pass').value;
        const passRepeat = document.getElementById('passrepeat').value;

        if (pass !== passRepeat) {
            alert('Укажите одинаковый пароль в полях.');
            return;
        }

        const data = {
            name:  document.getElementById('name-kid').value.trim(),
            age:   document.getElementById('age').value.trim(),
            email: document.getElementById('email').value.trim(),
            pass:  pass.trim()
        };

        const result = await apiRequest('/php/regin.php', data);

        if (result.error) {
            alert("Ошибка регистрации: " + result.message);
        } else {
            alert("Регистрация прошла успешно!");
            window.location.href = 'login.html';
        }
    });
});
