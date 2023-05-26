var filterByLocation;
var filterByDate;
var filterByGenre;
function OnListDropdownClick(filterSelection, searchByField) {
    this.filterLocation = filterLocation;
    moviesAndCinemasManager.getMoviesArr;
    //TODO: open new search tab
    aliyaFunction();
}
//
function MovieSearchFiltering(searchFields) { }
// aliya
function aliyaFunction() { }
/////////////////////////////////////////////////////////////////////////////////////
// - MOVIE CARDS & FILTER - //
var moviesArr = [];
// Fetch movie data from json -
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    moviesArr = data;
    renderMovieCards(moviesArr);
    genreOptions();
})["catch"](function (error) { return console.log(error); });
// Render movie cards -
function renderMovieCards(movies) {
    var movieCardsContainer = document.querySelector(".movieCards");
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
        var movieDescription = document.createElement("p");
        movieDescription.classList.add("movieDetails__movieDescription");
        movieDescription.textContent = movie.description;
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
        var moviePageButton = document.createElement("button");
        moviePageButton.classList.add("movieDetails__moviePageButton");
        moviePageButton.textContent = "Movie Page";
        moviePageButton.addEventListener("click", function () {
            window.open(movie.trailerURL, "_blank");
        });
        movieDetails.appendChild(movieName);
        movieDetails.appendChild(movieDescription);
        movieDetails.appendChild(movieGenre);
        movieDetails.appendChild(movieAgeLimit);
        movieDetails.appendChild(movieScreenDuration);
        movieDetails.appendChild(moviePremiere);
        movieDetails.appendChild(moviePageButton);
        movieCard.appendChild(movieImage);
        movieCard.appendChild(movieDetails);
        movieCardsContainer.appendChild(movieCard);
    });
}
// Genre options -
function genreOptions() {
    var genreDropdown = document.getElementById("genreDropdown");
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
    if (genreDropdown) {
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
var SearchHandler = /** @class */ (function () {
    function SearchHandler() {
    }
    SearchHandler.prototype.onLocationSelect = function (newLoc) {
        console.log(newLoc);
    };
    return SearchHandler;
}());
// Event listener for genre change -
var genreDropdown = document.getElementById("genreDropdown");
genreDropdown.addEventListener("change", filterMoviesByGenre);
/////////////////////////////////////////////////////////////////////////////////////
var searchHandler = new SearchHandler();
