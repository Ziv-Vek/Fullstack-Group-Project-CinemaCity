// - MOVIE CARDS & FILTER - //
// Fetch movie data from json -
var movies = [];
var cinemas = [];
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    movies = data;
    renderMovieCards(movies);
    genreOptions();
})["catch"](function (error) { return console.log(error); });
fetch("cinema.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    cinemas = data;
    searchFieldsRenderer.main(data);
})["catch"](function (error) { return console.log(error); });
// Render movie cards -
function renderMovieCards(movies) {
    var movieCardsHTML = "";
    movies.forEach(function (movie) {
        movieCardsHTML += "<div class=\"movieCard\">\n    <div class=\"movieImage\">\n      <img src=\"" + movie.image + "\" />\n    </div>\n    <div class=\"movieDetails\">\n      <h2 class=\"movieDetails__movieName\">" + movie.name + "</h2>\n      <p class=\"movieDetails__movieDescription\">" + movie.description + "</p>\n      <p class=\"movieDetails__genre\">Genre: " + movie.genre.join(", ") + "</p>\n      <p class=\"movieDetails__ageLimit\">Age Limit: " + movie.ageLimit + "</p>\n      <p class=\"movieDetails__screenDuration\">Screen Duration: " + movie.screenDuration + "</p>\n      <p class=\"movieDetails__premiere\">Premiere: " + movie.premiere + "</p>\n      <button class=\"movieDetails__trailerButton\" onclick=\"openTrailer('" + movie.trailerURL + "')\">\n      <span id=\"trailerBtn\" class=\"material-symbols-outlined\">play_circle</span>\n      </button>\n      <a class=\"movieDetails__moviePageButton\" href=\"./moviePage/moviePage.html?id=" + movie.uuid + "\" onclick=\"transferMovieData(event, " + movie.uuid + ")\">MOVIE PAGE</a>\n    </div>\n  </div>";
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
// Transfer data to movie page -
function transferMovieData(event, movieId) {
    event.preventDefault();
    var movie = movies.find(function (movie) { return movie.uuid === movieId; });
    if (movie) {
        var movieData = movie;
        var movieDataString = encodeURIComponent(JSON.stringify(movieData));
        var moviePageURL = "./moviePage/moviePage.html?data=" + movieDataString;
        window.location.href = moviePageURL;
    }
}
function populateMoviePage(movie) {
    document.querySelector("#movieImage").innerHTML = "<img src=\"" + movie.image + "\" />";
    document.querySelector("#movieTitle").textContent = movie.name;
    document.querySelector("#movieDescription").textContent = movie.description;
    document.querySelector("#movieGenre").textContent = movie.genre.join(", ");
    document.querySelector("#movieAgeLimit").textContent =
        movie.ageLimit.toString();
    document.querySelector("#movieDuration").textContent =
        "Duration in Minutes: " + movie.screenDuration.toString();
    document.querySelector("#moviePremiere").textContent =
        "Premiere: " + movie.premiere.toString();
}
/** Handles user search selections */
var SearchHandler = /** @class */ (function () {
    function SearchHandler() {
        this.selectedCinema = null;
        this.selectedDate = null;
        this.selectedGenre = null;
        this.filteredMovies = [];
        this.locationFilterText = null;
        this.dateFilterText = null;
    }
    SearchHandler.prototype.onLocationSelect = function (searchFilter, location, eve) {
        try {
            if (searchFilter === "")
                throw new Error("No search filter was passed");
            if (location === "")
                throw new Error("No location filter selection was passed");
            if (!searchFieldsRenderer)
                throw new Error("searchFieldsRenderer not found");
            searchFieldsRenderer.updateSearchTitle(searchFilter, location);
            this.locationFilterText = location;
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
    SearchHandler.prototype.onDateSelect = function (searchFilter, dateTimeStamp, eve) {
        var _a;
        var newDate = new Date(dateTimeStamp);
        var filteredMoviesByDate = [];
        searchFieldsRenderer.updateDateSearchTitle(searchFilter, newDate);
        (_a = this.selectedCinema) === null || _a === void 0 ? void 0 : _a.movieList.forEach(function (movieInCinema) {
            var movieScreenDateArr = movieInCinema.screenDate.split(" ");
            if (Number(movieScreenDateArr[0]) === newDate.getMonth() &&
                Number(movieScreenDateArr[1]) === newDate.getDate()) {
                filteredMoviesByDate.push(movieInCinema);
            }
        });
        console.log(filteredMoviesByDate);
        renderMovieCards(filteredMoviesByDate);
    };
    SearchHandler.prototype.filterMoviesByCinemas = function (location) {
        var filteredMovies = [];
        searchFieldsRenderer.renderSecondarySearchMenus();
        var _loop_1 = function (cinema) {
            if (cinema.cinemaName === location) {
                var allMoviesIdInCinema_1 = [];
                this_1.selectedCinema = cinema;
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
        var this_1 = this;
        for (var _i = 0, cinemas_1 = cinemas; _i < cinemas_1.length; _i++) {
            var cinema = cinemas_1[_i];
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
        this.numOfDaysInDateSearch = 14;
    }
    SearchFieldsRenderer.prototype.main = function (cinemas) {
        this.cinemas = cinemas;
        this.populateLocations();
    };
    SearchFieldsRenderer.prototype.updateSearchTitle = function (searchFilter, location) {
        var selector = document.querySelector("." + searchFilter);
        selector.children[0].innerHTML = location;
    };
    SearchFieldsRenderer.prototype.updateDateSearchTitle = function (searchFilter, date) {
        var selector = document.querySelector("." + searchFilter);
        selector.children[0].innerHTML = " " + date.toLocaleString("default", {
            weekday: "short",
            day: "2-digit",
            month: "short"
        }) + " ";
    };
    SearchFieldsRenderer.prototype.renderSecondarySearchMenus = function () {
        secondarySearchArea.classList.add("search__secondary-search--visible");
        this.populateDates();
        this.populateGenres();
    };
    SearchFieldsRenderer.prototype.populateDates = function () {
        var currentDayInMonth = new Date().getDate();
        var lastSearchDay = currentDayInMonth + this.numOfDaysInDateSearch;
        var today = new Date();
        var cinema;
        cinemas.forEach(function (cin) {
            if (cin.cinemaName === searchHandler.locationFilter) {
                cinema = cin;
            }
        });
        searchDateMenu.innerHTML = "";
        for (var i = currentDayInMonth; i < lastSearchDay; i++) {
            var newDateTimeStamp = new Date(today).setDate(i);
            var newDate = new Date(newDateTimeStamp);
            searchDateMenu.innerHTML += "<li>\n        <a\n          class=\"dropdown-item\"\n          onclick=\"searchHandler.onDateSelect('search__dates-dropdown', '" + newDate + "', event)\"\n          >" + newDate.toLocaleString("default", {
                weekday: "long",
                day: "2-digit",
                month: "short",
                year: "numeric"
            }) + "</a>\n      </li>";
        }
    };
    SearchFieldsRenderer.prototype.populateGenres = function () { };
    SearchFieldsRenderer.prototype.populateLocations = function () {
        searchLocationMenu.innerHTML = cinemas
            .map(function (cinema) {
            return "<li>\n        <a\n          class=\"dropdown-item\"\n          onclick=\"searchHandler.onLocationSelect('search__cinemas-dropdown', '" + cinema.cinemaName + "', event)\"\n          >" + cinema.cinemaName + "</a>\n      </li>";
        })
            .join("");
    };
    return SearchFieldsRenderer;
}());
