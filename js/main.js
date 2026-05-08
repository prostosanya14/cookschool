// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
    // Создаем кнопку бургера, если её нет в HTML
    const header = document.querySelector('header');
    const existingBurger = document.querySelector('.burger');
    
    if (!existingBurger) {
        const burger = document.createElement('div');
        burger.className = 'burger';
        burger.innerHTML = '<span></span><span></span><span></span>';
        
        // Вставляем бургер перед меню
        const menu = document.querySelector('.menu');
        const loginquit = document.querySelector('.loginquit');
        
        if (menu && header) {
            // Находим контейнер для бургера
            const headerRight = document.createElement('div');
            headerRight.style.display = 'flex';
            headerRight.style.alignItems = 'center';
            headerRight.style.gap = '15px';
            
            // Перемещаем loginquit в новый контейнер
            if (loginquit) {
                loginquit.parentNode.insertBefore(headerRight, loginquit);
                headerRight.appendChild(loginquit);
                headerRight.insertBefore(burger, loginquit);
            } else {
                header.appendChild(burger);
            }
        } else {
            header.appendChild(burger);
        }
    }
    
    // Получаем элементы
    const burger = document.querySelector('.burger');
    const menu = document.querySelector('.menu');
    const body = document.body;
    
    if (burger && menu) {
        burger.addEventListener('click', function(e) {
            e.stopPropagation();
            burger.classList.toggle('active');
            menu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Закрытие меню при клике на ссылку
        const menuLinks = menu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (menu.classList.contains('active') && 
                !menu.contains(event.target) && 
                !burger.contains(event.target)) {
                burger.classList.remove('active');
                menu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
});