const canvas = document.getElementById('canvas');
const colorPicker = document.getElementById('colorPicker');
const clearCanvasButton = document.getElementById('clearCanvas');
let isDrawing = false;
let startX, startY;
let shape = 'circle'; 
let color = '#000000'; 

const shapeInputs = document.querySelectorAll('input[name="shape"]');
shapeInputs.forEach(input => {
    input.addEventListener('change', () => {
        shape = input.value;
    });
});

colorPicker.addEventListener('input', (event) => {
    color = event.target.value;
});

clearCanvasButton.addEventListener('click', () => {
    canvas.innerHTML = '';
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    const tempShape = document.getElementById('tempShape');
    if (tempShape) {
        canvas.removeChild(tempShape);
    }

    let newShape;

    switch (shape) {
        case 'circle':
            const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
            newShape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            newShape.setAttribute('cx', startX);
            newShape.setAttribute('cy', startY);
            newShape.setAttribute('r', radius);
            newShape.setAttribute('fill', color);
            newShape.setAttribute('id', 'tempShape'); // Добавим ID для временной фигуры
            break;

        case 'rectangle':
            const rectWidth = currentX - startX;
            const rectHeight = currentY - startY;
            newShape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            newShape.setAttribute('x', startX);
            newShape.setAttribute('y', startY);
            newShape.setAttribute('width', rectWidth);
            newShape.setAttribute('height', rectHeight);
            newShape.setAttribute('fill', color);
            newShape.setAttribute('id', 'tempShape'); // Добавим ID для временной фигуры
            break;

        case 'triangle':
            newShape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            newShape.setAttribute('points', `${startX},${startY} ${currentX},${currentY} ${startX},${currentY}`);
            newShape.setAttribute('fill', color);
            newShape.setAttribute('id', 'tempShape'); // Добавим ID для временной фигуры
            break;

        case 'ellipse':
            const ellipseCenterX = (startX + currentX) / 2;
            const ellipseCenterY = (startY + currentY) / 2;
            const ellipseRadiusX = Math.abs(currentX - startX) / 2;
            const ellipseRadiusY = Math.abs(currentY - startY) / 2;
            newShape = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            newShape.setAttribute('cx', ellipseCenterX);
            newShape.setAttribute('cy', ellipseCenterY);
            newShape.setAttribute('rx', ellipseRadiusX);
            newShape.setAttribute('ry', ellipseRadiusY);
            newShape.setAttribute('fill', color);
            newShape.setAttribute('id', 'tempShape'); // Добавим ID для временной фигуры
            break;

        case 'line':
            newShape = document.createElementNS("http://www.w3.org/2000/svg", "line");
            newShape.setAttribute('x1', startX);
            newShape.setAttribute('y1', startY);
            newShape.setAttribute('x2', currentX);
            newShape.setAttribute('y2', currentY);
            newShape.setAttribute('stroke', color);
            newShape.setAttribute('stroke-width', 2);
            newShape.setAttribute('id', 'tempShape'); 
            break;
    }

    if (newShape) {
        canvas.appendChild(newShape);
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (!isDrawing) return;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    let finalShape;

    switch (shape) {
        case 'circle':
            const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
            finalShape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            finalShape.setAttribute('cx', startX);
            finalShape.setAttribute('cy', startY);
            finalShape.setAttribute('r', radius);
            finalShape.setAttribute('fill', color);
            break;

        case 'rectangle':
            const rectWidth = currentX - startX;
            const rectHeight = currentY - startY;
            finalShape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            finalShape.setAttribute('x', startX);
            finalShape.setAttribute('y', startY);
            finalShape.setAttribute('width', rectWidth);
            finalShape.setAttribute('height', rectHeight);
            finalShape.setAttribute('fill', color);
            break;

        case 'triangle':
            finalShape = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
            finalShape.setAttribute('points', `${startX},${startY} ${currentX},${currentY} ${startX},${currentY}`);
            finalShape.setAttribute('fill', color);
            break;

        case 'ellipse':
            const ellipseCenterX = (startX + currentX) / 2;
            const ellipseCenterY = (startY + currentY) / 2;
            const ellipseRadiusX = Math.abs(currentX - startX) / 2;
            const ellipseRadiusY = Math.abs(currentY - startY) / 2;
            finalShape = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
            finalShape.setAttribute('cx', ellipseCenterX);
            finalShape.setAttribute('cy', ellipseCenterY);
            finalShape.setAttribute('rx', ellipseRadiusX);
            finalShape.setAttribute('ry', ellipseRadiusY);
            finalShape.setAttribute('fill', color);
            break;

        case 'line':
            finalShape = document.createElementNS("http://www.w3.org/2000/svg", "line");
            finalShape.setAttribute('x1', startX);
            finalShape.setAttribute('y1', startY);
            finalShape.setAttribute('x2', currentX);
            finalShape.setAttribute('y2', currentY);
            finalShape.setAttribute('stroke', color);
            finalShape.setAttribute('stroke-width', 2);
            break;
    }

 
    if (finalShape) {
        canvas.appendChild(finalShape);
    }

    isDrawing = false; 
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});