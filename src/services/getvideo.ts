import http from "../http-common";

type State = {
  Title: string,
  Year: string,
  Poster?: boolean,
};

export function findByTitle(title: string, currentPage:number) {
  return http.get<Array<State>>(`/?apikey=1e6b6cf2&s=${title}&page=${currentPage}`);
}