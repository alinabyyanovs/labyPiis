const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearCanvasButton = document.getElementById('clearCanvas');
let isDrawing = false;
let startX, startY;
let shape = 'circle'; 
let color = '#000000'; 

let shapes = [];

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes = []; 
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

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawShapes(); 

    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    switch (shape) {
        case 'circle':
            const radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.fill();
            break;

        case 'rectangle':
            ctx.fillRect(startX, startY, currentX - startX, currentY - startY);
            break;

        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(currentX, currentY);
            ctx.lineTo(startX, currentY);
            ctx.closePath();
            ctx.fill();
            break;

        case 'ellipse':
            const ellipseCenterX = (startX + currentX) / 2;
            const ellipseCenterY = (startY + currentY) / 2;
            const ellipseRadiusX = Math.abs(currentX - startX) / 2;
            const ellipseRadiusY = Math.abs(currentY - startY) / 2;
            ctx.beginPath();
            ctx.ellipse(ellipseCenterX, ellipseCenterY, ellipseRadiusX, ellipseRadiusY, 0, 0, Math.PI * 2);
            ctx.fill();
            break;

        case 'line':
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            break;
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (!isDrawing) return;
    isDrawing = false;

    const currentX = event.offsetX;
    const currentY = event.offsetY;

    const newShape = { type: shape, color: color };

    switch (shape) {
        case 'circle':
            newShape.radius = Math.sqrt(Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2));
            newShape.startX = startX;
            newShape.startY = startY;
            break;

        case 'rectangle':
            newShape.startX = startX;
            newShape.startY = startY;
            newShape.width = currentX - startX;
            newShape.height = currentY - startY;
            break;

        case 'triangle':
            newShape.startX = startX;
            newShape.startY = startY;
            newShape.currentX = currentX;
            newShape.currentY = currentY;
            break;

        case 'ellipse':
            newShape.centerX = (startX + currentX) / 2;
            newShape.centerY = (startY + currentY) / 2;
            newShape.radiusX = Math.abs(currentX - startX) / 2;
            newShape.radiusY = Math.abs(currentY - startY) / 2;
            break;

        case 'line':
            newShape.startX = startX;
            newShape.startY = startY;
            newShape.currentX = currentX;
            newShape.currentY = currentY;
            break;
    }

    shapes.push(newShape); 
    drawShapes();
});

canvas.addEventListener('mouseleave', () => {
    isDrawing = false;
});

function drawShapes() {
    shapes.forEach(shape => {
        ctx.fillStyle = shape.color;
        ctx.strokeStyle = shape.color;
        ctx.beginPath();

        switch (shape.type) {
            case 'circle':
                ctx.arc(shape.startX, shape.startY, shape.radius, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'rectangle':
                ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height);
                break;

            case 'triangle':
                ctx.moveTo(shape.startX, shape.startY);
                ctx.lineTo(shape.currentX, shape.currentY);
                ctx.lineTo(shape.startX, shape.currentY);
                ctx.closePath();
                ctx.fill();
                break;

            case 'ellipse':
                ctx.ellipse(shape.centerX, shape.centerY, shape.radiusX, shape.radiusY, 0, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'line':
                ctx.moveTo(shape.startX, shape.startY);
                ctx.lineTo(shape.currentX, shape.currentY);
                ctx.stroke();
                break;
        }
        ctx.closePath();
    });
}