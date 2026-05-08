import apiRequest from '../apiRequest.js';

document.addEventListener('DOMContentLoaded', async () => {

    const emailDisplay = document.getElementById('userEmail');
    const ageDisplay = document.getElementById('userAge');

    // Получаем данные из sessionStorage
    const email = sessionStorage.getItem('email');
    const age = sessionStorage.getItem('age');

    // Подставляем данные, если они есть
    if (emailDisplay) emailDisplay.textContent = email || 'Не указан';
    if (ageDisplay) ageDisplay.textContent = age || '--';

    const myOrdersInner = document.getElementById('myOrdersInner');

    const userData = {
        email: sessionStorage.getItem('email')
    };

    const result = await apiRequest('/php/getUserOrders.php', userData);

    if (result.error) {
        alert('Ошибка: ' + result.message);
        return;
    }

    if (!result || result.length === 0) {
        myOrdersInner.innerHTML = "<p>У вас пока что нет оставленных заявок</p>";
        return;
    }

    const statusClasses = {
        "На рассмотрении": "in-process",
        "Отклонена": "rejected",
        "Выполнена": "success"
    };

    let table = `
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Наименование услуги</td>
                    <td>Дата подачи</td>
                    <td>Статус</td>
                </tr>
            </thead>
            <tbody>
                ${result.map(order => `
                    <tr>
                        <td>${order.id}</td>
                        <td>${order.category}</td>
                        <td>${order.date}</td>
                        <td class="${statusClasses[order.status] || ''}">${order.status}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>`;

    myOrdersInner.innerHTML = table;
});