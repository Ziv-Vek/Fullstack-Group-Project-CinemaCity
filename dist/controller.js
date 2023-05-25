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
// - Aliyah Movie Cards - //
var movieCards = document.querySelector(".movieCards");
var renderMovieCards = function (movies) {
    try {
        var cards = movies
            .map(function (m) {
            return "\n        <div class=\"movieCard\">\n        <div class=\"movieImage\">\n        <img src=\"" + m.image + "\" />\n        </div>\n        \n        <div class=\"movieDetailsContainer\">\n        <div class=\"movieDetails\">\n        <h1 class=\"movieDetails__movieName\"> " + m.name + " </h1>\n        <h4 class=\"movieDetails__movieDescription\"> " + m.description + " </h4>\n        <p> Genre: " + m.genre + " </p>\n        <p> Age Limit: " + m.ageLimit + " </p>\n        <p> Premiere: " + m.premiere + " </p>\n        <p> Duration in Minutes: " + m.screenDuration + " </p>\n        </div>\n        </div>\n        </div>";
        })
            .join(" ");
        movieCards.innerHTML = cards;
    }
    catch (error) {
        console.log(error);
    }
};
renderMovieCards(movies);
/////////////////////////////////////////////////////////////////////////////////////
