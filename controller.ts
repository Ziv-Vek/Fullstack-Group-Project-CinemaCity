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
  private filteredMovies: Movie[] = [];

  constructor() {}

  public onLocationSelect(searchFilter: string, location: string, eve) {
    try {
      if (searchFilter === "") throw new Error("No search filter was passed");
      if (location === "")
        throw new Error("No location filter selection was passed");

      this.updateSearchTitle(searchFilter, location);
      this.searchFilters.push(location);
      this.filteredMovies = this.filterMoviesByCinemas(location);

      if (this.filteredMovies.length === 0) {
        renderMovieCards(movies);
      } else {
        renderMovieCards(this.filteredMovies);
      }
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

  private filterMoviesByCinemas(location: string): Movie[] {
    let filteredMovies: Movie[] = [];

    for (let cinema of cinemasArr) {
      if (cinema.cinemaName === location) {
        let allMoviesIdInCinema: number[] = [];

        cinema.movieList.forEach((movie) => {
          allMoviesIdInCinema.push(movie.movieID);
        });

        const uniqueMoviesIdInCinema = new Set(allMoviesIdInCinema);

        movies.forEach((movie) => {
          uniqueMoviesIdInCinema.forEach((idByCinema) => {
            if (idByCinema === movie.uuid) {
              filteredMovies.push(movie);
            }
          });
        });

        return filteredMovies;
      }
    }

    return filteredMovies;
  }
}

/** Responsible for rendering the search fields */
class SearchFieldsRenderer {
  constructor() {
    this.populateLocations();
  }

  public toggleSecondSearchArea() {}

  private populateLocations() {
    console.log(cinemasArr);

    searchLocationMenu.innerHTML = cinemasArr
      .map((cinema) => {
        return `<li>
        <a
          class="dropdown-item"
          onclick="searchHandler.onLocationSelect('search__cinemas-dropdown', '${cinema.cinemaName}', event)"
          >${cinema.cinemaName}</a>
      </li>`;
      })
      .join();
  }
}
