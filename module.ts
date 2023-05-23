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
    public movieList: { movieID: number; screenTime: Date[]; venue: number[] }
  ) {}
}
class Movie implements IMovie {
  uuid: number;
  constructor(
    public name: string,
    public genre: string[],
    public ageLimit: number,
    public image: string,
    public premiere: Date,
    public screenDuration: number,
    public description: string,
    public trailerURL: string,
    public seats: Seats[],
    public cinemaID: number[]
  ) {}
}
