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
/** Handles user search selections */
var SearchHandler = /** @class */ (function () {
    function SearchHandler() {
        this.searchFilters = [];
        this.filteredMovies = [];
    }
    SearchHandler.prototype.onLocationSelect = function (searchFilter, location, eve) {
        try {
            if (searchFilter === "")
                throw new Error("No search filter was passed");
            if (location === "")
                throw new Error("No location filter selection was passed");
            this.updateSearchTitle(searchFilter, location);
            this.searchFilters.push(location);
            this.filteredMovies = this.filterMoviesByCinemas(location);
            if (this.filteredMovies.length === 0) {
                renderMovieCards(movies);
            }
            else {
                renderMovieCards(this.filteredMovies);
            }
        }
        catch (error) {
            console.log(error);
        }
    };
    SearchHandler.prototype.updateSearchTitle = function (searchFilter, location) {
        var selector = document.querySelector("." + searchFilter);
        selector.children[0].innerHTML = location;
    };
    SearchHandler.prototype.filterMoviesByCinemas = function (location) {
        var filteredMovies = [];
        var _loop_1 = function (cinema) {
            if (cinema.cinemaName === location) {
                var allMoviesIdInCinema_1 = [];
                cinema.movieList.forEach(function (movie) {
                    allMoviesIdInCinema_1.push(movie.movieID);
                });
                var uniqueMoviesIdInCinema_1 = new Set(allMoviesIdInCinema_1);
                movies.forEach(function (movie) {
                    uniqueMoviesIdInCinema_1.forEach(function (idByCinema) {
                        if (idByCinema === movie.uuid) {
                            filteredMovies.push(movie);
                        }
                    });
                });
                return { value: filteredMovies };
            }
        };
        for (var _i = 0, _a = moviesAndCinemasManager.getCinemasArr; _i < _a.length; _i++) {
            var cinema = _a[_i];
            var state_1 = _loop_1(cinema);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return filteredMovies;
    };
    return SearchHandler;
}());
/** Responsible for rendering the search fields */
var SearchFieldsRenderer = /** @class */ (function () {
    function SearchFieldsRenderer() {
        this.populateLocations();
    }
    SearchFieldsRenderer.prototype.toggleSecondSearchArea = function () { };
    SearchFieldsRenderer.prototype.populateLocations = function () {
        console.log(moviesAndCinemasManager.getCinemasArr);
        // searchLocationMenu.innerHTML = moviesAndCinemasManager.cinemasArr
        //   .map((cinema) => {
        //     return `<li>
        //     <a
        //       class="dropdown-item"
        //       onclick="searchHandler.onLocationSelect('search__cinemas-dropdown', '${cinema.cinemaName}', event)"
        //       >${cinema.cinemaName}</a>
        //   </li>`;
        //   })
        //   .join();
    };
    return SearchFieldsRenderer;
}());
