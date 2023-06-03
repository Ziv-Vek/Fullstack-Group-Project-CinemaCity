var Movie = /** @class */ (function () {
    function Movie(image, name, genre, ageLimit, premiere, screenDuration, description, trailerURL, cinemaID) {
        this.image = image;
        this.name = name;
        this.genre = genre;
        this.ageLimit = ageLimit;
        this.premiere = premiere;
        this.screenDuration = screenDuration;
        this.description = description;
        this.trailerURL = trailerURL;
        this.cinemaID = cinemaID;
    }
    return Movie;
}());
var Seat = /** @class */ (function () {
    function Seat() {
    }
    return Seat;
}());
// Cinema (locations) -
var Cinema = /** @class */ (function () {
    function Cinema(id, cinemaName, movieList) {
        this.id = id;
        this.cinemaName = cinemaName;
        this.movieList = movieList;
    }
    return Cinema;
}());
// Event form -
var EventForm = /** @class */ (function () {
    function EventForm(name, email, number) {
        this.name = name;
        this.email = email;
        this.number = number;
    }
    return EventForm;
}());
// Payment form -
var PayForm = /** @class */ (function () {
    function PayForm(name, email, idNumber, cardNumber, month, year) {
        this.name = name;
        this.email = email;
        this.idNumber = idNumber;
        this.cardNumber = cardNumber;
        this.month = month;
        this.year = year;
    }
    return PayForm;
}());
