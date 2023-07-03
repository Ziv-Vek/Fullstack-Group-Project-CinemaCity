"use strict";
//#region Main page
// Movie Cards elements
const movieCards = document.querySelector(".movieCards");
const movieCardsContainer = document.querySelector(".movieCards");
// Header
const carousel = document.querySelector(".header");
const imageContainers = Array.from(document.querySelectorAll(".image-container"));
// genreOptions function and filterMoviesByGenre function
const secondarySearchArea = document.querySelector(".search__secondary-search");
//#endregion
//#region Main page search elements
// Cinema menu search
const searchLocationMenu = document.querySelectorAll(".search__location-menu");
// Date menu search
const searchDateMenu = document.querySelector(".search__date-menu");
// Genre menu search
const searchGenreMenu = document.querySelector(".search__genre-menu");
// Movies menu search
const searchMoviesMenu = document.querySelector(".search__movies-menu");
// genre secondary dropdown list
const genreSecondaryDropdown = document.querySelector(".search__genre-dropdown");
// cinema secondary dropdown list
const cinemaSecondaryDropdown = document.querySelector(".search__secondary-dropdown-cinemas");
const datesSecondaryDropdown = document.querySelector(".search__dates-dropdown");
//#endregion
//#region Main page VIP elements
const vipButton = document.querySelector(".vipButton");
//#endregion
//#region Movie page
const screeningWrapperDiv = document.querySelector(".screening-wrapper");
//#endregion
//#region Venue page
// Present screening details in Navbar
const screeningDetails = document.querySelector(".screening");
const html = document.querySelector(".venue_view");
const movieDetails = document.querySelector(".movie_details");
// Order tickets button
const orderBtn = document.querySelector(".order-container__order-btn");
// Payment form
const paymentForm = document.querySelector(".credit-form");
const submitButton = document.querySelector("#submit");
// Error messages
const seatErrorMessage = document.querySelector(".seat-error-message");
const tooManySeatsMessage = document.querySelector(".too-many-message");
const numbersOnly = document.querySelector(".numbers-only");
const notNumberMessage = document.querySelector(".notNumberError");
const textOnly = document.querySelector(".text-only");
const validEmail = document.querySelector(".valid-email");
// Thank you message
const thanksMessage = document.querySelector(".thanks-message");
// Loading animation
const loadingContainer = document.querySelector(".loading-container");
// Movie ticket container
const ticketContainer = document.querySelector(".ticket-container");
//#endregion
//#region VIP page
// All buttons
const telAvivButton = document.querySelector("#telAvivButton");
const haifaButton = document.querySelector("#haifaButton");
const ashdodButton = document.querySelector("#ashdodButton");
const rishonButton = document.querySelector("#rishonButton");
const beerShevaButton = document.querySelector("#beerShevaButton");
const vipMenuTlvHaifaBeer = document.querySelector(".menuTLV-BeerSheva-Haifa");
const menuRishonAshdod = document.querySelector(".menuRishonAshdod");
//#endregion
