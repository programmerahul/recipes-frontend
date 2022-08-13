import httpService from "./httpServices";
const url = "/genres";
export function getGenres() {
  return httpService.get(url);
}
