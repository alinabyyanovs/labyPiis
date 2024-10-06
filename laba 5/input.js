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
        if (isPinned) {
            isPinned = false;
            currentElement.style.backgroundColor = ''; // Сброс цвета
            currentElement = null;
        } else {
            isPinned = true;
            currentElement = event.target;
            currentElement.style.backgroundColor = 'yellow';
            setPosition(event);
        }
    });
});

// Нажатие мыши
targets.forEach(target => {
    target.addEventListener('mousedown', (event) => {
        if (!isPinned) {
            currentElement = event.target;
            isDragging = true;
            originalPosition.top = currentElement.offsetTop;
            originalPosition.left = currentElement.offsetLeft;
            offsetX = event.clientX - currentElement.getBoundingClientRect().left;
            offsetY = event.clientY - currentElement.getBoundingClientRect().top;
        }
    });
});

// Перемещение мыши
document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        setPosition(event);
    }
    if (isPinned && currentElement) {
        setPosition(event);
    }
});

// Отпускание мыши
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
    }
});

// Клик для открепления приклеенного элемента
document.addEventListener('click', (event) => {
    if (isPinned && currentElement) {
        isPinned = false;
        currentElement.style.backgroundColor = ''; // Сброс цвета
        currentElement = null;
    }
});

// Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && currentElement) {
        currentElement.style.top = `${originalPosition.top}px`;
        currentElement.style.left = `${originalPosition.left}px`;
        isDragging = false;
        isPinned = false;
        currentElement = null;
    }
});

function setPosition(event) {
    if (currentElement) {
        currentElement.style.top = `${event.clientY - offsetY}px`;
        currentElement.style.left = `${event.clientX - offsetX}px`;
    }
}
