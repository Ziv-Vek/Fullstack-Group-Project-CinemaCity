interface Movie {
  name: string;
  genre: string;
  ageLimit: number;
  image: string;
  premiere: Date;
  time: number;
  description: string;
  trailer: string;
}
interface Seats {
  line: number;
  seatID: number;
  status: boolean;
  accessability: boolean;
}

class Movies implements Movie {
  key: number;
  name: string;
  genre: string;
  ageLimit: number;
  image: string;
  premiere: Date;
  time: number;
  description: string;
  trailer: string;
  seats: Seats[];
  constructor() {
    this.key = key();
  }
}
