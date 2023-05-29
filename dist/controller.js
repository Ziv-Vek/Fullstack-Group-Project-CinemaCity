var movies = [];
var cinemas = [];
// Fetch movie data from json -
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    movies = data;
    setData("movieData", movies);
    renderMovieCards(movies);
    searchFieldsRenderer.populateMovies(data);
})["catch"](function (error) { return console.log(error); });
fetch("cinema.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    cinemas = data;
    searchFieldsRenderer.populateLocations(data);
})["catch"](function (error) { return console.log(error); });
// Render movie cards -
function renderMovieCards(movies) {
    var movieCardsHTML = "";
    movies.forEach(function (movie) {
        movieCardsHTML += "<div class=\"movieCard\">\n    <div class=\"movieImage\">\n      <img src=\"" + movie.image + "\" />\n    </div>\n    <div class=\"movieDetails\">\n      <h2 class=\"movieDetails__movieName\">" + movie.name + "</h2>\n      <p class=\"movieDetails__movieDescription\">" + movie.description + "</p>\n      <p class=\"movieDetails__genre\">Genre: " + movie.genre.join(", ") + "</p>\n      <p class=\"movieDetails__ageLimit\">Age Limit: " + movie.ageLimit + "</p>\n      <p class=\"movieDetails__screenDuration\">Screen Duration: " + movie.screenDuration + "</p>\n      <p class=\"movieDetails__premiere\">Premiere: " + movie.premiere + "</p>\n      <button class=\"movieDetails__trailerButton\" onclick=\"openTrailer('" + movie.uuid + "')\">\n      <span id=\"trailerBtn\" class=\"material-symbols-outlined\">play_circle</span>\n      </button>\n      <a class=\"movieDetails__moviePageButton\" href=\"./moviePage/moviePage.html?id=" + movie.uuid + "\" onclick=\"transferMovieData(event, " + movie.uuid + ")\">MOVIE PAGE</a>\n    </div>\n  </div>";
    });
    movieCardsContainer.innerHTML = movieCardsHTML;
}
// Open trailer -
function openTrailer(mov) {
    var selectedMovie = movies[mov - 1];
    console.log(selectedMovie.trailerURL);
    var popup = "<div class=\"trailer_container\">\n  <div class=\"trailer_container-exit\" onclick=\"\">\n    <img src=\"./assets/x-thin-svgrepo-com.svg\" alt=\"\" />\n  </div>\n  <div class=\"trailer_container-content\">\n    <h2>" + selectedMovie.name + "</h2>\n    <iframe  width=\"640\" height=\"360\" \n      src=\"" + selectedMovie.trailerURL + "\"\n      frameborder=\"0\"\n    ></iframe>\n  </div>\n</div>";
    var movieCardsContainer = document.querySelector(".root");
    movieCardsContainer.innerHTML += popup;
}
// Genre options -
// const genreOptions = () => {
//   const allGenres = [
//     "Action",
//     "Kids",
//     "Animation",
//     "Comedy",
//     "Crime",
//     "Drama",
//     "Sci-fi",
//     "Horror",
//     "Thriller",
//     "Fantasy",
//     "Musical",
//     "Adventure",
//     "Foreign",
//   ];
//   allGenres.forEach((genre) => {
//     const option = document.createElement("option");
//     option.value = genre;
//     option.textContent = genre;
//     genreDropdown!.appendChild(option);
//   });
// };
// Handle genre change -
// function filterMoviesByGenre() {
//   if (genreDropdown && movieCardsContainer) {
//     const selectedGenre = genreDropdown.value;
//     if (selectedGenre === "") {
//       renderMovieCards(movies);
//     } else {
//       const filteredMovies = movies.filter((movie) =>
//         movie.genre.includes(selectedGenre)
//       );
//       renderMovieCards(filteredMovies);
//     }
//   }
// }
// genreDropdown!.addEventListener("change", filterMoviesByGenre);
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
    document.querySelector("#movieImage").innerHTML = "<img src=\"../" + movie.image + "\" class=\"movie-image\"/>";
    document.querySelector("#movieTitle").textContent = movie.name;
    document.querySelector("#movieDescription").textContent = movie.description;
    document.querySelector("#movieGenre").textContent = movie.genre.join(", ");
    document.querySelector("#movieAgeLimit").textContent =
        movie.ageLimit.toString();
    document.querySelector("#movieDuration").textContent =
        "Duration in Minutes: " + movie.screenDuration.toString();
    document.querySelector("#moviePremiere").textContent =
        "Premiere: " + movie.premiere.toString();
    var movieTrailerContainer = document.querySelector("#movieTrailer");
    var iframe = document.createElement("iframe");
    iframe.src = movie.trailerURL;
    iframe.allowFullscreen = true;
    iframe.width = "500px";
    iframe.height = "300px";
    movieTrailerContainer.appendChild(iframe);
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
    Object.defineProperty(SearchHandler.prototype, "getFilteredMoviesByLocation", {
        get: function () {
            return this.filteredMovies;
        },
        enumerable: false,
        configurable: true
    });
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
    SearchHandler.prototype.onMovieSelect = function (searchFilter, movieUuid, eve) {
        var filteredMovies = [];
        var moviesLenght = movies.length;
        for (var i = 0; i < moviesLenght; i++) {
            if (movies[i].uuid === Number(movieUuid)) {
                filteredMovies.push(movies[i]);
                break;
            }
        }
        renderMovieCards(filteredMovies);
    };
    SearchHandler.prototype.onDateSelect = function (searchFilter, dateTimeStamp, eve) {
        var newDate = new Date(dateTimeStamp);
        searchFieldsRenderer.updateDateSearchTitle(searchFilter, newDate);
        renderMovieCards(this.filterMoviesByDate(newDate));
    };
    SearchHandler.prototype.onGenreSelect = function (searchFilter, genre, eve) {
        searchFieldsRenderer.updateGenreSearchTitle(searchFilter, genre);
        renderMovieCards(this.filterMoviesByGenre(genre));
    };
    SearchHandler.prototype.filterMoviesByCinemas = function (location) {
        var filteredMovies = [];
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
                this_1.filteredMovies = filteredMovies;
                searchFieldsRenderer.renderSecondarySearchMenus(this_1.selectedCinema);
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
    SearchHandler.prototype.filterMoviesByDate = function (newDate) {
        var _a;
        var filteredMoviesByDate = [];
        (_a = this.selectedCinema) === null || _a === void 0 ? void 0 : _a.movieList.forEach(function (movieInCinema) {
            var movieScreenDateArr = movieInCinema.screenDate.split(" ");
            if (Number(movieScreenDateArr[0]) === newDate.getMonth() + 1 &&
                Number(movieScreenDateArr[1]) === newDate.getDate()) {
                filteredMoviesByDate.push(movieInCinema);
            }
        });
        var filteredMoviesByDateLengh = filteredMoviesByDate.length;
        var filteredMoviesLengh = this.filteredMovies.length;
        var filteredMoviesByCinemaAndDate = [];
        for (var i = 0; i < filteredMoviesByDateLengh; i++) {
            for (var j = 0; j < filteredMoviesLengh; j++) {
                if (filteredMoviesByDate[i].movieID === this.filteredMovies[j].uuid) {
                    filteredMoviesByCinemaAndDate.push(this.filteredMovies[j]);
                }
            }
        }
        return filteredMoviesByCinemaAndDate;
    };
    SearchHandler.prototype.filterMoviesByGenre = function (selectedGenre) {
        var filteredMovies = [];
        var filteredMoviesLengh = this.filteredMovies.length;
        for (var i = 0; i < filteredMoviesLengh; i++) {
            var movieGenresLengh = this.filteredMovies[i].genre.length;
            for (var j = 0; j < movieGenresLengh; j++) {
                if (this.filteredMovies[i].genre[j] === selectedGenre) {
                    filteredMovies.push(this.filteredMovies[i]);
                    break;
                }
            }
        }
        return filteredMovies;
    };
    return SearchHandler;
}());
/** Responsible for rendering the search fields */
var SearchFieldsRenderer = /** @class */ (function () {
    function SearchFieldsRenderer() {
        this.movies = [];
        this.numOfDaysInDateSearch = 14;
    }
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
    SearchFieldsRenderer.prototype.updateGenreSearchTitle = function (searchFilter, genre) {
        var selector = document.querySelector("." + searchFilter);
        selector.children[0].innerHTML = " " + genre + " ";
    };
    SearchFieldsRenderer.prototype.renderSecondarySearchMenus = function (selectedCinema) {
        secondarySearchArea.classList.add("search__secondary-search--visible");
        this.populateDates(selectedCinema);
        this.populateGenres(selectedCinema);
    };
    SearchFieldsRenderer.prototype.populateDates = function (selectedCinema) {
        var currentDayInMonth = new Date().getDate();
        var lastSearchDay = currentDayInMonth + this.numOfDaysInDateSearch;
        var today = new Date();
        var availableDates = [];
        selectedCinema.movieList.forEach(function (movie) {
            if (!availableDates.includes(movie.screenDate)) {
                availableDates.push(movie.screenDate);
            }
        });
        searchDateMenu.innerHTML = "";
        var availableDatesLengh = availableDates.length;
        if (availableDatesLengh === 0) {
            searchDateMenu.innerHTML = "No screening days found";
        }
        else {
            for (var i = 0; i < availableDatesLengh; i++) {
                var newDate = new Date(availableDates[i]);
                searchDateMenu.innerHTML += "<li>\n        <a\n          class=\"dropdown-item\"\n          onclick=\"searchHandler.onDateSelect('search__dates-dropdown', '" + newDate + "', event)\"\n          >" + newDate.toLocaleString("default", {
                    weekday: "long",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }) + "</a>\n      </li>";
            }
        }
    };
    SearchFieldsRenderer.prototype.populateGenres = function (selectedCinema) {
        var availableGenres = [];
        var filteredMovies = searchHandler.getFilteredMoviesByLocation;
        filteredMovies.forEach(function (movie) {
            movie.genre.forEach(function (movieGenre) {
                if (!availableGenres.includes(movieGenre)) {
                    availableGenres.push(movieGenre);
                }
            });
        });
        searchGenreMenu.innerHTML = "";
        searchGenreMenu.innerHTML = availableGenres
            .map(function (genre) {
            return "<li>\n        <a\n          class=\"dropdown-item\"\n          onclick=\"searchHandler.onGenreSelect('search__genre-dropdown', '" + genre + "', event)\"\n          >" + genre + "</a>\n      </li>";
        })
            .join("");
    };
    SearchFieldsRenderer.prototype.populateLocations = function (cinemas) {
        this.cinemas = cinemas;
        searchLocationMenu.innerHTML = cinemas
            .map(function (cinema) {
            return "<li>\n        <a\n          class=\"dropdown-item\"\n          onclick=\"searchHandler.onLocationSelect('search__cinemas-dropdown', '" + cinema.cinemaName + "', event)\"\n          >" + cinema.cinemaName + "</a>\n      </li>";
        })
            .join("");
    };
    SearchFieldsRenderer.prototype.populateMovies = function (movies) {
        this.movies = movies;
        searchMoviesMenu.innerHTML = movies
            .map(function (movie) {
            return "<li>\n        <a\n          class=\"dropdown-item\"\n          onclick=\"searchHandler.onMovieSelect('search__movies-dropdown', '" + movie.uuid + "', event)\"\n          >" + movie.name + "</a>\n      </li>";
        })
            .join("");
    };
    return SearchFieldsRenderer;
}());
