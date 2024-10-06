const targets = document.querySelectorAll('.target');

let isDragging = false; // Флаг, указывающий на то, что элемент перетаскивается
let isPinned = false; // Флаг, указывающий на то, что элемент "приклеен" к мыши
let currentElement = null; // Текущий перетаскиваемый элемент
let offsetX = 0; // Смещение по оси X
let offsetY = 0; // Смещение по оси Y
let originalPosition = { top: 0, left: 0 }; // Исходная позиция элемента

// Обработчик двойного клика (мышь)
targets.forEach(target => {
    target.addEventListener('dblclick', (event) => {
        togglePin(event.target);
    });
});

// Обработчик двойного касания (сенсорный экран)
targets.forEach(target => {
    target.addEventListener('touchstart', (event) => {
        if (event.touches.length === 2) {
            resetDragging();
            return;
        }
        if (isPinned) {
            togglePin(event.target);
        } else {
            currentElement = event.target;
            isPinned = true;
            currentElement.style.backgroundColor = 'yellow';
            setPosition(event.touches[0]);
        }
    });
});

// Нажатие мыши
targets.forEach(target => {
    target.addEventListener('mousedown', (event) => {
        if (!isPinned) {
            startDragging(event.target, event);
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

// Перемещение пальца (сенсорный экран)
document.addEventListener('touchmove', (event) => {
    if (isDragging) {
        setPosition(event.touches[0]);
    }
    if (isPinned && currentElement) {
        setPosition(event.touches[0]);
    }
});

// Отпускание мыши
document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
    }
});

// Отпускание пальца (сенсорный экран)
document.addEventListener('touchend', (event) => {
    if (isDragging) {
        isDragging = false;
    }
});

// Клик для открепления
document.addEventListener('click', (event) => {
    if (isPinned && currentElement) {
        togglePin(currentElement);
    }
});

// Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && currentElement) {
        resetDragging();
    }
});

// Функция для установки новых позиций
function setPosition(event) {
    if (currentElement) {
        currentElement.style.top = `${event.clientY - offsetY}px`;
        currentElement.style.left = `${event.clientX - offsetX}px`;
    }
}

// Функция для начала перетаскивания
function startDragging(target, event) {
    currentElement = target;
    isDragging = true;
    originalPosition.top = currentElement.offsetTop;
    originalPosition.left = currentElement.offsetLeft;
    offsetX = event.clientX - currentElement.getBoundingClientRect().left;
    offsetY = event.clientY - currentElement.getBoundingClientRect().top;
}

// Функция для переключения режима "приклеивания"
function togglePin(target) {
    if (isPinned) {
        isPinned = false;
        target.style.backgroundColor = ''; // Сброс цвета
        currentElement = null;
    } else {
        isPinned = true;
        currentElement = target;
        currentElement.style.backgroundColor = 'yellow';
        setPosition(event);
    }
}

// Функция для сброса перетаскивания
function resetDragging() {
    if (currentElement) {
        currentElement.style.top = `${originalPosition.top}px`;
        currentElement.style.left = `${originalPosition.left}px`;
        isDragging = false;
        isPinned = false;
        currentElement = null;
    }
}
