import apiRequest from '../apiRequest.js';

document.addEventListener('DOMContentLoaded', () => {
    const changeStatusForm = document.getElementById('change-status-form');

    changeStatusForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const orderIdInput = document.getElementById('orderid');
        const statusSelect = document.getElementById('status');

        const orderId = parseInt(orderIdInput.value) || 0;
        const selectedStatus = statusSelect.options[statusSelect.selectedIndex].text;

        if (orderId === 0) {
            alert('Пожалуйста, введите корректный ID заказа');
            return;
        }

        const changeOrderData = {
            id: orderId,
            status: selectedStatus
        };

        // 2. Отправляем запрос через универсальную функцию
        const result = await apiRequest('/php/ChangeOrderStatus.php', changeOrderData);

        // 3. Обработка результата
        if (result.error) {
            alert(`Ошибка: ${result.message}`);
        } else {
            alert(`Статус заявки №${orderId} успешно изменен на "${selectedStatus}"!`);
            window.location.reload();
        }
    });
});
