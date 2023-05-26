// - MOVIE CARDS & FILTER - //

// Fetch movie data from json -
let movies: any[] = [];

fetch("movies.json")
  .then((response) => response.json())
  .then((data) => {
    movies = data;
    renderMovieCards(movies);
    genreOptions();
  })
  .catch((error) => console.log(error));

// Render movie cards -
function renderMovieCards(movies: any[]) {
  let movieCardsHTML = "";

  movies.forEach((movie) => {
    movieCardsHTML += `<div class="movieCard">
    <div class="movieImage">
      <img src="${movie.image}" />
    </div>
    <div class="movieDetails">
      <h2 class="movieDetails__movieName">${movie.name}</h2>
      <p class="movieDetails__movieDescription">${movie.description}</p>
      <p class="movieDetails__genre">Genre: ${movie.genre.join(", ")}</p>
      <p class="movieDetails__ageLimit">Age Limit: ${movie.ageLimit}</p>
      <p class="movieDetails__screenDuration">Screen Duration: ${
        movie.screenDuration
      }</p>
      <p class="movieDetails__premiere">Premiere: ${movie.premiere}</p>
      <a class="movieDetails__moviePageButton" href="moviePage.html?id=${
        movie.uuid
      }">MOVIE PAGE</a>
      <button class="movieDetails__trailerButton" onclick="openTrailer('${
        movie.trailerURL
      }')">
        <span id="trailerBtn" class="material-symbols-outlined">play_circle</span>
      </button>
    </div>
  </div>`;
  });

  movieCardsContainer!.innerHTML = movieCardsHTML;
}

// Open trailer -
function openTrailer(trailerURL) {
  window.open(trailerURL, "_blank");
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
  if (genreDropdown && movieCardsContainer) {
    const selectedGenre = genreDropdown.value;

    if (selectedGenre === "") {
      renderMovieCards(movies);
    } else {
      const filteredMovies = movies.filter((movie) =>
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
