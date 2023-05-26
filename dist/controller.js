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
var moviesArr = [];
var movieCoverArray = [
    "imgCover/fastXCover.jpeg",
    "imgCover/littleMermaidCover.jpeg",
    "imgCover/screamCover.jpeg",
];
// Fetch movie data from json -
fetch("movies.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
    moviesArr = data;
    renderMovieCards(moviesArr);
    genreOptions();
    loadMovieCovers();
})["catch"](function (error) { return console.log(error); });
/////////////////////////////////////////////////////////////////////////////////////
// - Header - //
function loadMovieCovers() {
    var movieCoversContainer = document.getElementById("movieCovers");
    movieCoverArray.forEach(function (coverUrl) {
        var coverImage = document.createElement("img");
        coverImage.src = coverUrl;
        coverImage.classList.add("coverImage");
        // Click event listener to navigate to the movie page -
        coverImage.addEventListener("click", function () {
            // Taking the movie ID from the cover URL so it would take us to the movie page -
            var movieId = coverUrl.split("id=")[1];
            window.open("moviePage.html?id=" + movieId, "_blank");
        });
        var coverImageElement = coverImage;
        coverImageElement.style.display = "none";
        movieCoversContainer === null || movieCoversContainer === void 0 ? void 0 : movieCoversContainer.appendChild(coverImageElement);
    });
    // Change the cover image every few seconds -
    var currentCoverIndex = 0;
    setInterval(function () {
        currentCoverIndex = (currentCoverIndex + 1) % movieCoverArray.length;
        var coverImages = document.querySelectorAll(".coverImage");
        coverImages.forEach(function (coverImage, index) {
            var coverImageElement = coverImage;
            if (index === currentCoverIndex) {
                coverImageElement.style.display = "block";
            }
            else {
                coverImageElement.style.display = "none";
            }
        });
    }, 5000);
}
/////////////////////////////////////////////////////////////////////////////////////
// - MOVIE CARDS & FILTER - //
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
    var movieCardsContainer = document.getElementById("movieCards");
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
var SearchHandler = /** @class */ (function () {
    function SearchHandler() {
    }
    SearchHandler.prototype.onLocationSelect = function (newLoc) {
        console.log(newLoc);
    };
    return SearchHandler;
}());
// Event listener for genre change -
genreDropdown.addEventListener("change", filterMoviesByGenre);
/////////////////////////////////////////////////////////////////////////////////////
var searchHandler = new SearchHandler();
