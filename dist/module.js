var Cinema = /** @class */ (function () {
    function Cinema(id, cinemaName, movieList, seats) {
        this.id = id;
        this.cinemaName = cinemaName;
        this.movieList = movieList;
        this.seats = seats;
    }
    return Cinema;
}());
var Movie = /** @class */ (function () {
    function Movie(name, genre, ageLimit, image, premiere, screenDuration, description, trailerURL, cinemaID) {
        this.name = name;
        this.genre = genre;
        this.ageLimit = ageLimit;
        this.image = image;
        this.premiere = premiere;
        this.screenDuration = screenDuration;
        this.description = description;
        this.trailerURL = trailerURL;
        this.cinemaID = cinemaID;
    }
    return Movie;
}());
