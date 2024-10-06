let numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {}
};

function getFilm() {
    let film;
    while (true) {
        film = prompt('Один из последних просмотренных фильмов?', '');
        if (film && film.length <= 50) {
            break;
        }
        alert('Пожалуйста, введите название фильма (не пустая строка и не больше 50 символов).');
    }
    return film;
}

function getRating() {
    let rating;
    while (true) {
        rating = +prompt('На сколько оцените его (от 1 до 10)?', '');
        if (rating >= 1 && rating <= 10 && !isNaN(rating)) {
            break;
        }
        alert('Пожалуйста, введите значение от 1 до 10.');
    }
    return rating;
}

for (let i = 0; i < 2; i++) {
    const lastFilm = getFilm();
    const ratingFilm = getRating();
    personalMovieDB.movies[lastFilm] = ratingFilm;
}

console.log(personalMovieDB.movies);