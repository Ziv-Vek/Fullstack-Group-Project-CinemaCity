// # region Main page
// Movie Cards elements
var movieCards = document.querySelector(".movieCards");
var movieCardsContainer = document.querySelector(".movieCards");
// Header
var carousel = document.querySelector(".header");
var imageContainers = Array.from(document.querySelectorAll(".image-container"));
// genreOptions function and filterMoviesByGenre function
var secondarySearchArea = document.querySelector(".search__secondary-search");
// # endRegion
// # region Main page search elements
// Cinema menu search
var searchLocationMenu = document.querySelectorAll(".search__location-menu");
// Date menu search
var searchDateMenu = document.querySelector(".search__date-menu");
// Genre menu search
var searchGenreMenu = document.querySelector(".search__genre-menu");
// Movies menu search
var searchMoviesMenu = document.querySelector(".search__movies-menu");
// genre secondary dropdown list
var genreSecondaryDropdown = document.querySelector(".search__genre-dropdown");
// cinema secondary dropdown list
var cinemaSecondaryDropdown = document.querySelector(".search__secondary-dropdown-cinemas");
var datesSecondaryDropdown = document.querySelector(".search__dates-dropdown");
// # endRegion
// # region Main page VIP elements
var vipButton = document.querySelector(".vipButton");
// # endRegion
// # region Movie page
var screeningWrapperDiv = document.querySelector(".screening-wrapper");
// # endRegion
// # region Venue page
// Present screening details in Navbar
var screeningDetails = document.querySelector(".screening");
var html = document.querySelector(".venue_view");
var movieDetails = document.querySelector(".movie_details");
// Order tickets button
var orderBtn = document.querySelector(".order-container__order-btn");
// Payment form
var paymentForm = document.querySelector(".credit-form");
var submitButton = document.querySelector("#submit");
// Error messages
var seatErrorMessage = document.querySelector(".seat-error-message");
var tooManySeatsMessage = document.querySelector(".too-many-message");
var numbersOnly = document.querySelector(".numbers-only");
var notNumberMessage = document.querySelector(".notNumberError");
var textOnly = document.querySelector(".text-only");
var validEmail = document.querySelector(".valid-email");
// Thank you message
var thanksMessage = document.querySelector(".thanks-message");
// Loading animation
var loadingContainer = document.querySelector(".loading-container");
// Movie ticket container
var ticketContainer = document.querySelector(".ticket-container");
// # endRegion
// # region VIP page
// All buttons
var telAvivButton = document.querySelector("#telAvivButton");
var haifaButton = document.querySelector("#haifaButton");
var ashdodButton = document.querySelector("#ashdodButton");
var rishonButton = document.querySelector("#rishonButton");
var beerShevaButton = document.querySelector("#beerShevaButton");
var vipMenuTlvHaifaBeer = document.querySelector(".menuTLV-BeerSheva-Haifa");
var menuRishonAshdod = document.querySelector(".menuRishonAshdod");
// # endRegion
