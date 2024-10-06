const targets = document.querySelectorAll('.target');

let isDragging = false; // Флаг, указывающий на то, что элемент перетаскивается
let isPinned = false; // Флаг, указывающий на то, что элемент "приклеен" к мыши
let currentElement = null; // Текущий перетаскиваемый элемент
let offsetX = 0; // Смещение по оси X
let offsetY = 0; // Смещение по оси Y
let originalPosition = { top: 0, left: 0 }; // Исходная позиция элемента

// Обработчик двойного клика
targets.forEach(target => {
    target.addEventListener('dblclick', (event) => {
        isPinned = true;
        currentElement = event.target;
        currentElement.style.backgroundColor = 'blue'; // Меняем цвет
        setPosition(event);
    });
});

// Обработчик нажатия мыши
targets.forEach(target => {
    target.addEventListener('mousedown', (event) => {
        currentElement = event.target;
        isDragging = true;

        originalPosition.top = currentElement.offsetTop;
        originalPosition.left = currentElement.offsetLeft;

        offsetX = event.clientX - currentElement.getBoundingClientRect().left;
        offsetY = event.clientY - currentElement.getBoundingClientRect().top;
    });
});

// Обработчик перемещения мыши
document.addEventListener('mousemove', (event) => {
    if (isDragging || isPinned) {
        setPosition(event);
    }
});

// Обработчик отпускания мыши
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
    } else if (isPinned) {
        isPinned = false;
        if (currentElement) {
            currentElement.style.backgroundColor = 'red'; // Возвращаем цвет
        }
    }
});

// Обработчик клавиши Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && currentElement) {
        resetElement();
    }
});

// Обработчики сенсорных событий
targets.forEach(target => {
    target.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        currentElement = event.target;
        isDragging = true;

        originalPosition.top = currentElement.offsetTop;
        originalPosition.left = currentElement.offsetLeft;

        offsetX = touch.clientX - currentElement.getBoundingClientRect().left;
        offsetY = touch.clientY - currentElement.getBoundingClientRect().top;
    });

    target.addEventListener('touchmove', (event) => {
        if (isDragging) {
            const touch = event.touches[0];
            setPosition(touch);
        }
    });

    target.addEventListener('touchend', (event) => {
        if (isDragging) {
            resetElement();
        }
    });
});

// Функция для установки позиции элемента
function setPosition(event) {
    if (currentElement) {
        currentElement.style.top = `${event.clientY - offsetY}px`;
        currentElement.style.left = `${event.clientX - offsetX}px`;
    }
}

// Функция для сброса позиции элемента
function resetElement() {
    currentElement.style.top = `${originalPosition.top}px`;
    currentElement.style.left = `${originalPosition.left}px`;
    isDragging = false;
    isPinned = false;
    currentElement = null;
}
