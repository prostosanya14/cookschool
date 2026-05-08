import apiRequest from '../apiRequest.js';

document.addEventListener('DOMContentLoaded', async () => {
    const ordersInner = document.getElementById('ordersInner');
    const clientsInner = document.getElementById('clientsInner');

    const renderOrders = (data) => {
        if (!data || data.length === 0 || data.error) {
            ordersInner.innerHTML = `<p class='no-data'>${data?.message || 'Оставленных заявок не найдено'}</p>`;
            return;
        }

        const statusClasses = {
            "На рассмотрении": "in-process",
            "Отклонена": "rejected",
            "Выполнена": "success"
        };

        ordersInner.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <td>ID</td><td>Дата подачи</td><td>Email</td><td>Категория</td><td>Возраст</td><td>Статус</td>
                    </tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                        <tr class="order-row" data-id="${item.id}">
                            <td>${item.id}</td>
                            <td>${item.date}</td>
                            <td>${item.email}</td>
                            <td>${item.category}</td>
                            <td>${item.age}</td>
                            <td class="${statusClasses[item.status] || ''}">${item.status}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>`;
        document.querySelectorAll('.order-row').forEach(row => {
            row.addEventListener('click', () => {
                const orderId = row.getAttribute('data-id');
                fillStatusForm(orderId);
            });
        });

    };

    const renderClients = (data) => {
        if (!data || data.length === 0 || data.error) {
            clientsInner.innerHTML = `<p class='no-data'>${data?.message || 'Пользователей не найдено'}</p>`;
            return;
        }

        clientsInner.innerHTML = `
            <table>
                <thead>
                    <tr><td>ID</td><td>E-mail</td><td>Пароль</td><td>Роль</td></tr>
                </thead>
                <tbody>
                    ${data.map(item => `
                        <tr>
                            <td>${item.id}</td>
                            <td>${item.email}</td>
                            <td>${item.pass}</td>
                            <td class="${item.role == '2' ? 'rejected' : ''}">
                                ${item.role == '2' ? 'Администратор' : 'Стандарт'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>`;
    };

    const [orders, clients] = await Promise.all([
        apiRequest('/php/getAdminOrders.php'),
        apiRequest('/php/getAdminClients.php')
    ]);

    renderOrders(orders);
    renderClients(clients);


    function fillStatusForm(id) {
        const idInput = document.getElementById('orderid');
        const form = document.getElementById('change-status-form');

        if (idInput && form) {
            idInput.value = id;

            form.scrollIntoView({ behavior: 'smooth', block: 'center' });

            idInput.style.backgroundColor = '#fa8576';
            setTimeout(() => idInput.style.backgroundColor = '', 1000);
        }
    }


});
