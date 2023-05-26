// - MOVIE CARDS & FILTER - //
let moviesArr: Movie[] = [];

// Fetch movie data from json -
fetch("movies.json")
  .then((response) => response.json())
  .then((data) => {
    moviesArr = data;
    renderMovieCards(moviesArr);
    genreOptions();
    // loadMovieCovers();
  })
  .catch((error) => console.log(error));

// Render movie cards -
function renderMovieCards(movies: Movie[]) {
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
    movieName.style.textAlign = "center";
    movieName.style.paddingTop = "32px";
    movieName.style.paddingBottom = "20px";
    movieName.style.fontSize = "28px";

    const movieDescription = document.createElement("p");
    movieDescription.classList.add("movieDetails__movieDescription");
    movieDescription.textContent = movie.description;
    movieDescription.style.paddingBottom = "20px";
    movieDescription.style.textAlign = "center";
    movieDescription.style.fontSize = "15px";

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

    // Page button -
    const moviePageButton = document.createElement("a");
    moviePageButton.classList.add("movieDetails__moviePageButton");
    moviePageButton.href = "moviePage.html?id=" + movie.id;
    moviePageButton.textContent = "MOVIE PAGE";
    //-----

    // Trailer button -
    const trailerButton = document.createElement("button");
    trailerButton.classList.add("movieDetails__trailerButton");
    const trailerIcon = document.createElement("span");
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

    trailerButton.addEventListener("click", () => {
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

    movieCardsContainer!.appendChild(movieCard);
  });
}

// Genre options -
function genreOptions() {
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
  ) as HTMLSelectElement;
  const movieCardsContainer = document.querySelector(
    ".movieCards"
  ) as HTMLDivElement;

  if (genreDropdown && movieCardsContainer) {
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
genreDropdown!.addEventListener("change", filterMoviesByGenre);
/////////////////////////////////////////////////////////////////////////////////////

/** Handles user search selections */
class SearchHandler {
  searchFilters: Array<string> = [];

  constructor() {}

  public onLocationSelect(searchFilter: string, location: string, eve) {
    try {
      if (searchFilter === "") throw new Error("No search filter was passed");
      if (location === "")
        throw new Error("No location filter selection was passed");

      this.updateSearchTitle(searchFilter, location);
      this.searchFilters.push(location);
      this.filterMoviesByCinemas(location);
    } catch (error) {
      console.log(error);
    }
  }

  private updateSearchTitle(searchFilter: string, location: string) {
    const selector = document.querySelector(
      `.${searchFilter}`
    ) as HTMLDivElement;

    selector.children[0].innerHTML = location;
  }

  private filterMoviesByCinemas(location: string) {
    let filteredMovies: Movie[] = [];

    for (const cinema of cinemasArr) {
      if (cinema.cinemaName === location) {
        let allMoviesId: number[] = [];
        //let uniqueMoviesId: number[] = [];

        cinema.movieList.forEach((movie) => {
          allMoviesId.push(movie.movieID);
        });

        let uniqueMoviesId: number[] = [...new Set(allMoviesId)];
        console.log(uniqueMoviesId);

        return;
      }
    }

    // const filteredMovies: Movie[] = moviesArr.filter((movie) => {

    // });
  }
}

const searchHandler = new SearchHandler();

// dropdownItem.forEach((item) => {
//   item.addEventListener(`onclick`, testF());
// });

let cinemasArr: Cinema[] = [];

fetch("cinema.json")
  .then((response) => response.json())
  .then((data) => {
    cinemasArr = data;
  })
  .catch((error) => console.log(error));
