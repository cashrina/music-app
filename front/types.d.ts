export interface Artists {
  _id: string;
  name: string;
  image: string;
  info: string;
}

export interface Albums {
  _id: string;
  artists: Artists;
  name: string;
  year: number;
  image: string | null;
}