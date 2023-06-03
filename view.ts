// # region Main page
// Movie Cards elements
const movieCards = document.querySelector(".movieCards") as HTMLDivElement;
const movieCardsContainer = document.querySelector(".movieCards");

// Header
const carousel: HTMLElement | null = document.querySelector(".header");
const imageContainers: HTMLElement[] = Array.from(
  document.querySelectorAll(".image-container")
);

// genreOptions function and filterMoviesByGenre function
const secondarySearchArea = document.querySelector(
  ".search__secondary-search"
) as HTMLDivElement;
// # endRegion

// # region Main page search elements
// Cinema menu search
const searchLocationMenu: NodeListOf<HTMLDivElement> =
  document.querySelectorAll(".search__location-menu");

// Date menu search
const searchDateMenu = document.querySelector(
  ".search__date-menu"
) as HTMLUListElement;

// Genre menu search
const searchGenreMenu = document.querySelector(
  ".search__genre-menu"
) as HTMLUListElement;

// Movies menu search
const searchMoviesMenu = document.querySelector(
  ".search__movies-menu"
) as HTMLUListElement;

// genre secondary dropdown list
const genreSecondaryDropdown = document.querySelector(
  ".search__genre-dropdown"
) as HTMLDivElement;

// cinema secondary dropdown list
const cinemaSecondaryDropdown = document.querySelector(
  ".search__secondary-dropdown-cinemas"
) as HTMLDivElement;

const datesSecondaryDropdown = document.querySelector(
  ".search__dates-dropdown"
) as HTMLDivElement;
// # endRegion

// # region Main page VIP elements
const vipButton = document.querySelector(".vipButton");
// # endRegion

// # region Movie page
const screeningWrapperDiv = document.querySelector(
  ".screening-wrapper"
) as HTMLDivElement;
// # endRegion

// # region Venue page
// Present screening details in Navbar
const screeningDetails = document.querySelector(".screening") as HTMLDivElement;

const html = document.querySelector(".venue_view") as HTMLDivElement;
const movieDetails = document.querySelector(".movie_details") as HTMLDivElement;

// Order tickets button
const orderBtn = document.querySelector(
  ".order-container__order-btn"
) as HTMLButtonElement;

// Payment form
const paymentForm = document.querySelector(".credit-form") as HTMLFormElement;

const submitButton = document.querySelector("#submit") as HTMLInputElement;

// Error messages
const seatErrorMessage = document.querySelector(
  ".seat-error-message"
) as HTMLSpanElement;

const tooManySeatsMessage = document.querySelector(
  ".too-many-message"
) as HTMLDivElement;

const numbersOnly = document.querySelector(".numbers-only") as HTMLDivElement;

const notNumberMessage = document.querySelector(
  ".notNumberError"
) as HTMLSpanElement;

const textOnly = document.querySelector(".text-only") as HTMLDivElement;

const validEmail = document.querySelector(".valid-email") as HTMLDivElement;

// Thank you message
const thanksMessage = document.querySelector(
  ".thanks-message"
) as HTMLDivElement;

// Loading animation
const loadingContainer = document.querySelector(
  ".loading-container"
) as HTMLDivElement;

// Movie ticket container
const ticketContainer = document.querySelector(
  ".ticket-container"
) as HTMLDivElement;
// # endRegion

// # region VIP page
// All buttons
const telAvivButton = document.querySelector(
  "#telAvivButton"
) as HTMLDivElement;

const haifaButton = document.querySelector("#haifaButton") as HTMLDivElement;

const ashdodButton = document.querySelector("#ashdodButton") as HTMLDivElement;

const rishonButton = document.querySelector("#rishonButton") as HTMLDivElement;

const beerShevaButton = document.querySelector(
  "#beerShevaButton"
) as HTMLDivElement;

const vipMenuTlvHaifaBeer = document.querySelector(
  ".menuTLV-BeerSheva-Haifa"
) as HTMLDivElement;

const menuRishonAshdod = document.querySelector(
  ".menuRishonAshdod"
) as HTMLDivElement;
// # endRegion
