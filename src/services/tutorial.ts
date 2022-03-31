import http from "../http-common";
class TutorialDataService {
  findByTitle(title: string) {
    return http.get(`/?apikey=1e6b6cf2&s=${title}`);
  }
}

export default new TutorialDataService();