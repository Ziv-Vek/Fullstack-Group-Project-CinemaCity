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
  ) {}
}

class Seat {
  line: number;
  seatID: number;
  isTaken: boolean;

  constructor() {}
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

class EventForm {
  constructor(
    public name: string,
    public email: string,
    public number: string
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
