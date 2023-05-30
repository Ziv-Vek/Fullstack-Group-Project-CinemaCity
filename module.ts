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
    public movieList: [
      {
        movieID: number;
        screenTime: Date;
        screenDate: string;
        venue: number[];
        seats: [{ line: number; seatID: number }];
      }
    ]
  ) {
    //moviesAndCinemasManager.addCinema(this);
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
    //moviesAndCinemasManager.addMovie(this);
  }
}

class MoviesAndCinemasManager {
  private movies: Movie[] = [];
  public cinemasArr: object;

  constructor() {}

  public get getCinemasArr() {
    return this.cinemasArr;
  }

  public setCinemasArr(data: any) {
    // console.log(data);
    // console.log(data[2].cinemaName);

    this.cinemasArr = data;
  }

  public addMovie(movie: Movie) {
    this.movies.push(movie);
  }

  // public get getMoviesArr(): Movie[] {
  //   return this.movies;
  // }
}

//let cinemasArr: any;

fetch("cinema.json")
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) throw new Error("Data from cinema.json is empty");

    handleJsonCinemaData(data);
  })
  .catch((error) => console.log(error));

const handleJsonCinemaData = (data: any) => {
  if (!MoviesAndCinemasManager)
    throw new Error("MoviesAndCinemasManager not found.");

  //cinemasArr = data;
  moviesAndCinemasManager.setCinemasArr(data);
};

interface _Cart {
  barcode: string;
  price: number;
  movieID: number;
  seats: { line: number; seatID: number };
}

class Cart implements _Cart {
  constructor(
    public barcode: string,
    public price: number,
    public movieID: number,
    public seats: { line: number; seatID: number }
  ) {}
}
