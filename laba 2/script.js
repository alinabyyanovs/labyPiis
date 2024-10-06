const personalMovieDB = {
    privat: false,
    movies: {
        A: "8",
        B: "7",
        C: "10"
    }
};

function DisplayTable(data) {
    const tableContainer = document.getElementById('moviesTable');

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    const headerTitle = document.createElement('th');
    const headerRating = document.createElement('th');

    headerTitle.textContent = 'Название фильма';
    headerRating.textContent = 'Оценка';

    headerRow.appendChild(headerTitle);
    headerRow.appendChild(headerRating);
    table.appendChild(headerRow);

    for (const [title, rating] of Object.entries(data.movies)) {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const ratingCell = document.createElement('td');

        titleCell.textContent = title; 
        ratingCell.textContent = rating; 

        row.appendChild(titleCell);
        row.appendChild(ratingCell);
        table.appendChild(row);
    }
    
    tableContainer.appendChild(table);
}


 if (!personalMovieDB.privat) {
    DisplayTable(personalMovieDB);
} else {
    alert("Данные о фильмах приватны и не могут быть отображены."); 
}