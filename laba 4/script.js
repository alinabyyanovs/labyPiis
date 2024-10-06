function generateShirts() {
    const container = document.getElementById('shirts-container');

    shirts.forEach(shirt => {
        const shirtDiv = document.createElement('div');
        shirtDiv.className = 'shirt';

        const title = document.createElement('h2');
        title.textContent = shirt.name;

        const img = document.createElement('img');
        const colorKeys = Object.keys(shirt.colors);
        const firstColor = colorKeys[0]; 

        img.src = shirt.colors[firstColor]?.front || shirt.default.front; 

        const colorCount = document.createElement('p');
        colorCount.textContent = `Доступно цветов: ${colorKeys.length}`;

        const quickViewBtn = document.createElement('button');
        quickViewBtn.textContent = 'Quick View';
       

const seePageBtn = document.createElement('button');
seePageBtn.textContent = 'See Page';
seePageBtn.onclick = () => {
    localStorage.setItem('selectedShirt', JSON.stringify(shirt));
    window.location.href = 'details.html';
};

        shirtDiv.appendChild(img);
        shirtDiv.appendChild(title);
        shirtDiv.appendChild(colorCount); 
        shirtDiv.appendChild(quickViewBtn);
        shirtDiv.appendChild(seePageBtn);

        container.appendChild(shirtDiv);
    });
}

generateShirts();