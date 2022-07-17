import httpService from "./httpServices";
import config from "../conf.json";

export async function getGenres() {
  const { data: genres } = await httpService.get(config.genreApiEndPoint);
  return genres.filter((g) => g);
}
