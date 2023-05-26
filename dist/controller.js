var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// - MOVIE CARDS & FILTER - //
var moviesArr = [];
// Fetch movie data from json -
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    moviesArr = data;
    renderMovieCards(moviesArr);
    genreOptions();
    // loadMovieCovers();
})["catch"](function (error) { return console.log(error); });
// Render movie cards -
function renderMovieCards(movies) {
    movieCardsContainer.innerHTML = "";
    movies.forEach(function (movie) {
        var movieCard = document.createElement("div");
        movieCard.classList.add("movieCard");
        var movieImage = document.createElement("div");
        movieImage.classList.add("movieImage");
        var image = document.createElement("img");
        image.src = movie.image;
        movieImage.appendChild(image);
        var movieDetails = document.createElement("div");
        movieDetails.classList.add("movieDetails");
        var movieName = document.createElement("h2");
        movieName.classList.add("movieDetails__movieName");
        movieName.textContent = movie.name;
        movieName.style.textAlign = "center";
        movieName.style.paddingTop = "32px";
        movieName.style.paddingBottom = "20px";
        movieName.style.fontSize = "28px";
        var movieDescription = document.createElement("p");
        movieDescription.classList.add("movieDetails__movieDescription");
        movieDescription.textContent = movie.description;
        movieDescription.style.paddingBottom = "20px";
        movieDescription.style.textAlign = "center";
        movieDescription.style.fontSize = "15px";
        var movieGenre = document.createElement("p");
        movieGenre.classList.add("movieDetails__genre");
        movieGenre.textContent = "Genre: " + movie.genre.join(", ");
        var movieAgeLimit = document.createElement("p");
        movieAgeLimit.classList.add("movieDetails__ageLimit");
        movieAgeLimit.textContent = "Age Limit: " + movie.ageLimit;
        var movieScreenDuration = document.createElement("p");
        movieScreenDuration.classList.add("movieDetails__screenDuration");
        movieScreenDuration.textContent =
            "Screen Duration: " + movie.screenDuration;
        var moviePremiere = document.createElement("p");
        moviePremiere.classList.add("movieDetails__premiere");
        moviePremiere.textContent = "Premiere: " + movie.premiere;
        // Page button -
        var moviePageButton = document.createElement("a");
        moviePageButton.classList.add("movieDetails__moviePageButton");
        moviePageButton.href = "moviePage.html?id=" + movie.id;
        moviePageButton.textContent = "MOVIE PAGE";
        //-----
        // Trailer button -
        var trailerButton = document.createElement("button");
        trailerButton.classList.add("movieDetails__trailerButton");
        var trailerIcon = document.createElement("span");
        trailerIcon.classList.add("material-symbols-outlined");
        trailerIcon.textContent = "play_circle";
        trailerIcon.style.position = "absolute";
        trailerIcon.style.top = "10px";
        trailerIcon.style.right = "10px";
        trailerIcon.style.fontSize = "35px";
        trailerIcon.style.cursor = "pointer";
        trailerIcon.style.backgroundColor = "rgb(182, 11, 11)";
        trailerIcon.style.color = "white";
        trailerIcon.style.border = "none";
        trailerIcon.style.borderRadius = "50%";
        trailerButton.style.backgroundColor = "transparent";
        trailerButton.style.border = "none";
        trailerButton.appendChild(trailerIcon);
        trailerButton.addEventListener("click", function () {
            window.open(movie.trailerURL, "_blank");
        });
        //-----
        movieDetails.appendChild(movieName);
        movieDetails.appendChild(movieDescription);
        movieDetails.appendChild(movieGenre);
        movieDetails.appendChild(movieAgeLimit);
        movieDetails.appendChild(movieScreenDuration);
        movieDetails.appendChild(moviePremiere);
        movieDetails.appendChild(moviePageButton);
        movieDetails.appendChild(trailerButton);
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieDetails);
        movieCardsContainer.appendChild(movieCard);
    });
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
    var genreDropdown = document.getElementById("genreDropdown");
    var movieCardsContainer = document.querySelector(".movieCards");
    if (genreDropdown && movieCardsContainer) {
        var selectedGenre_1 = genreDropdown.value;
        if (selectedGenre_1 === "") {
            renderMovieCards(moviesArr);
        }
        else {
            var filteredMovies = moviesArr.filter(function (movie) {
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
    }
    SearchHandler.prototype.onLocationSelect = function (searchFilter, location, eve) {
        try {
            if (searchFilter === "")
                throw new Error("No search filter was passed");
            if (location === "")
                throw new Error("No location filter selection was passed");
            this.updateSearchTitle(searchFilter, location);
            this.searchFilters.push(location);
            this.filterMoviesByCinemas(location);
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
                var allMoviesId_1 = [];
                //let uniqueMoviesId: number[] = [];
                cinema.movieList.forEach(function (movie) {
                    allMoviesId_1.push(movie.movieID);
                });
                var uniqueMoviesId = __spreadArrays(new Set(allMoviesId_1));
                console.log(uniqueMoviesId);
                return { value: void 0 };
            }
        };
        for (var _i = 0, cinemasArr_1 = cinemasArr; _i < cinemasArr_1.length; _i++) {
            var cinema = cinemasArr_1[_i];
            var state_1 = _loop_1(cinema);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        // const filteredMovies: Movie[] = moviesArr.filter((movie) => {
        // });
    };
    return SearchHandler;
}());
var searchHandler = new SearchHandler();
// dropdownItem.forEach((item) => {
//   item.addEventListener(`onclick`, testF());
// });
var cinemasArr = [];
fetch("cinema.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    cinemasArr = data;
})["catch"](function (error) { return console.log(error); });
