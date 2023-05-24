interface IMovie {
  name: string;
  genre: string[];
  ageLimit: number;
  image: string;
  premiere: Date;
  screenDuration: number;
  description: string;
  trailerURL: string;
}

interface Seats {
  index: [{ line: number; seatID: number }];
  status: boolean;
  accessability: boolean;
}

class Cinema {
  constructor(
    public id: number,
    public cinemaName: string,
    public movieList: { movieID: number; screenTime: Date[]; venue: number[] },
    public seats: Seats[]
  ) {
    moviesAndCinemasManager.addCinema(this);
  }
}

class venue {
  moviesList: Movie[] = [];

  constructor() {}
}

class Movie implements IMovie {
  uuid: number;
  constructor(
    public image: string,
    public name: string,
    public genre: string[],
    public ageLimit: number,
    public premiere: Date,
    public screenDuration: number,
    public description: string,
    public trailerURL: string,
    public cinemaID: number[]
  ) {
    moviesAndCinemasManager.addMovie(this);
  }
}

class MoviesAndCinemasManager {
  private movies: Movie[] = [];
  private cinemas: Cinema[] = [];

  constructor() {}

  public addMovie(movie: Movie) {
    this.movies.push(movie);
  }

  public get getMoviesArr(): Movie[] {
    return this.movies;
  }

  public addCinema(cinema: Cinema) {
    this.cinemas.push(cinema);
  }

  public get getCinemaArr(): Cinema[] {
    return this.cinemas;
  }
}

const moviesAndCinemasManager: MoviesAndCinemasManager =
  new MoviesAndCinemasManager();
