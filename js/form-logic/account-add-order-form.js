import apiRequest from '../apiRequest.js';

document.addEventListener('DOMContentLoaded', () => {
    const orderForm = document.getElementById('order-form');

    orderForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const currentDate = new Date().toISOString().split('T')[0];

        const product = document.getElementById('productName');
        const kurs = document.getElementById('kurs');

        const data = {
            date: currentDate,
            email: sessionStorage.getItem('email'),
            category: product.options[product.selectedIndex].text,
            kurs: kurs.options[kurs.selectedIndex].text
        };

        const result = await apiRequest('/php/addOrder.php', data);

        if (result.error) {
            alert('Ошибка при отправке: ' + result.message);
        } else {
            alert('Ваша заявка успешно отправлена!');
            window.location.reload();
        }
    });
});
