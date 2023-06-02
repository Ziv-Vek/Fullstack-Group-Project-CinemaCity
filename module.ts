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
  ) {}
}

// class venue {
//   moviesList: Movie[] = [];

//   constructor() {}
// }

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

class PayForm {
  constructor(
    public name: string,
    public email: string,
    public idNumber: string,
    public cardNumber: string,
    public month: number,
    public year: number
  ) {}
}
