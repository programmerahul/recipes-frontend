import httpService from "./httpServices";
import config from "../conf.json";

export function getGenres() {
  return httpService.get(config.genreApiEndPoint);
}
