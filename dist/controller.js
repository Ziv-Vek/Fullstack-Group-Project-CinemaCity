// - MOVIE CARDS & FILTER - //
// Fetch movie data from json -
var movies = [];
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    movies = data;
    renderMovieCards(movies);
    genreOptions();
})["catch"](function (error) { return console.log(error); });
// Render movie cards -
function renderMovieCards(movies) {
    var movieCardsHTML = "";
    movies.forEach(function (movie) {
        movieCardsHTML += "<div class=\"movieCard\">\n    <div class=\"movieImage\">\n      <img src=\"" + movie.image + "\" />\n    </div>\n    <div class=\"movieDetails\">\n      <h2 class=\"movieDetails__movieName\">" + movie.name + "</h2>\n      <p class=\"movieDetails__movieDescription\">" + movie.description + "</p>\n      <p class=\"movieDetails__genre\">Genre: " + movie.genre.join(", ") + "</p>\n      <p class=\"movieDetails__ageLimit\">Age Limit: " + movie.ageLimit + "</p>\n      <p class=\"movieDetails__screenDuration\">Screen Duration: " + movie.screenDuration + "</p>\n      <p class=\"movieDetails__premiere\">Premiere: " + movie.premiere + "</p>\n      <a class=\"movieDetails__moviePageButton\" href=\"moviePage.html?id=" + movie.uuid + "\">MOVIE PAGE</a>\n      <button class=\"movieDetails__trailerButton\" onclick=\"openTrailer('" + movie.trailerURL + "')\">\n        <span id=\"trailerBtn\" class=\"material-symbols-outlined\">play_circle</span>\n      </button>\n    </div>\n  </div>";
    });
    movieCardsContainer.innerHTML = movieCardsHTML;
}
// Open trailer -
function openTrailer(trailerURL) {
    window.open(trailerURL, "_blank");
}
// Genre options -
function genreOptions() {
    var allGenres = [
        "action",
        "kids",
        "animation",
        "comedy",
        "crime",
        "drama",
        "sci-fi",
        "horror",
        "thriller",
        "fantasy",
        "musical",
        "adventure",
        "foreign",
    ];
    allGenres.forEach(function (genre) {
        var option = document.createElement("option");
        option.value = genre;
        option.textContent = genre;
        genreDropdown.appendChild(option);
    });
}
// Handle genre change -
function filterMoviesByGenre() {
    if (genreDropdown && movieCardsContainer) {
        var selectedGenre_1 = genreDropdown.value;
        if (selectedGenre_1 === "") {
            renderMovieCards(movies);
        }
        else {
            var filteredMovies = movies.filter(function (movie) {
                return movie.genre.includes(selectedGenre_1);
            });
            renderMovieCards(filteredMovies);
        }
    }
}
// Event listener for genre change -
genreDropdown.addEventListener("change", filterMoviesByGenre);
/////////////////////////////////////////////////////////////////////////////////////
var SearchHandler = /** @class */ (function () {
    function SearchHandler() {
    }
    SearchHandler.prototype.onLocationSelect = function (newLoc) {
        console.log(newLoc);
    };
    return SearchHandler;
}());
var searchHandler = new SearchHandler();
