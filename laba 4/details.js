
let currentColor; 
let isFrontView = true; 

function goBack() {
    window.history.back();
}

const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

if (selectedShirt) {
    document.getElementById('shirt-title').textContent = selectedShirt.name;
    document.getElementById('shirt-description').textContent = selectedShirt.description;
    document.getElementById('shirt-price').textContent = selectedShirt.price;

    const colorKeys = Object.keys(selectedShirt.colors);
    currentColor = colorKeys[0]; 
    const shirtImage = document.getElementById('shirt-image');
    shirtImage.src = selectedShirt.colors[currentColor]?.front || selectedShirt.default.front;

    const colorButtonsContainer = document.getElementById('color-buttons');
    colorKeys.forEach(color => {
        const button = document.createElement('button');
        button.textContent = color.charAt(0).toUpperCase() + color.slice(1); 
        button.style.backgroundColor = color; 
        button.onclick = () => {
            currentColor = color; 
            shirtImage.src = isFrontView ? selectedShirt.colors[currentColor].front : selectedShirt.colors[currentColor].back;
        };
        colorButtonsContainer.appendChild(button); 
    });

    document.getElementById('show-front').onclick = () => {
        isFrontView = true; 
        shirtImage.src = selectedShirt.colors[currentColor].front; 
    };

    document.getElementById('show-back').onclick = () => {
        isFrontView = false; 
        shirtImage.src = selectedShirt.colors[currentColor].back; 
    };
}