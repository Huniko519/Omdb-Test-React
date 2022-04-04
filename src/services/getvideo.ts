import http from "../http-common";

type State = {
  Title: string,
  Year: string,
  Poster?: boolean,
};

export function findByTitle(title: string, currentPage:number) {
  return http.get<Array<State>>(`/?apikey=d5bc90be&s=${title}&page=${currentPage}`);
}
