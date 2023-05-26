let filterByLocation: string | null;
let filterByDate: string | null;
let filterByGenre: string | null;

function OnListDropdownClick(filterSelection: string, searchByField: string) {
  this.filterLocation = filterLocation;
  moviesAndCinemasManager.getMoviesArr;
  //TODO: open new search tab
  aliyaFunction();
}

//
function MovieSearchFiltering(searchFields: string[]) {}

// aliya
function aliyaFunction() {}

/////////////////////////////////////////////////////////////////////////////////////
// - MOVIE CARDS & FILTER - //

let moviesArr: Movie[] = [];

// Fetch movie data from json -
fetch("movies.json")
  .then((response) => response.json())
  .then((data) => {
    moviesArr = data;
    renderMovieCards(moviesArr);
    genreOptions();
  })
  .catch((error) => console.log(error));

// Render movie cards -
function renderMovieCards(movies: Movie[]) {
  const movieCardsContainer = document.querySelector(".movieCards");
  movieCardsContainer!.innerHTML = "";

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movieCard");

    const movieImage = document.createElement("div");
    movieImage.classList.add("movieImage");
    const image = document.createElement("img");
    image.src = movie.image;
    movieImage.appendChild(image);

    const movieDetails = document.createElement("div");
    movieDetails.classList.add("movieDetails");

    const movieName = document.createElement("h2");
    movieName.classList.add("movieDetails__movieName");
    movieName.textContent = movie.name;

    const movieDescription = document.createElement("p");
    movieDescription.classList.add("movieDetails__movieDescription");
    movieDescription.textContent = movie.description;

    const movieGenre = document.createElement("p");
    movieGenre.classList.add("movieDetails__genre");
    movieGenre.textContent = "Genre: " + movie.genre.join(", ");

    const movieAgeLimit = document.createElement("p");
    movieAgeLimit.classList.add("movieDetails__ageLimit");
    movieAgeLimit.textContent = "Age Limit: " + movie.ageLimit;

    const movieScreenDuration = document.createElement("p");
    movieScreenDuration.classList.add("movieDetails__screenDuration");
    movieScreenDuration.textContent =
      "Screen Duration: " + movie.screenDuration;

    const moviePremiere = document.createElement("p");
    moviePremiere.classList.add("movieDetails__premiere");
    moviePremiere.textContent = "Premiere: " + movie.premiere;

    const moviePageButton = document.createElement("button");
    moviePageButton.classList.add("movieDetails__moviePageButton");
    moviePageButton.textContent = "Movie Page";
    moviePageButton.addEventListener("click", () => {
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

    movieCardsContainer!.appendChild(movieCard);
  });
}

// Genre options -
function genreOptions() {
  const genreDropdown = document.getElementById("genreDropdown");

  const allGenres = [
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

  allGenres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreDropdown!.appendChild(option);
  });
}

// Handle genre change -
function filterMoviesByGenre() {
  const genreDropdown = document.getElementById(
    "genreDropdown"
  ) as HTMLSelectElement | null;

  if (genreDropdown) {
    const selectedGenre = genreDropdown.value;

    if (selectedGenre === "") {
      renderMovieCards(moviesArr);
    } else {
      const filteredMovies = moviesArr.filter((movie) =>
        movie.genre.includes(selectedGenre)
      );
      renderMovieCards(filteredMovies);
    }
  }
}

// Event listener for genre change -
const genreDropdown = document.getElementById("genreDropdown");
genreDropdown!.addEventListener("change", filterMoviesByGenre);
/////////////////////////////////////////////////////////////////////////////////////
