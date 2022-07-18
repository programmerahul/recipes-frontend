import httpServices from "./httpServices";
import config from "../conf.json";

export async function getMovies() {
  const { data: movies } = await httpServices.get(config.moviesApiEndPoint);
  return movies;
}

export async function getMovie(id) {
  const { data: movies } = await httpServices.get(config.moviesApiEndPoint);
  return movies.find((m) => m._id === id);
}

export async function saveMovie(movie) {
  if (movie.genreId === "") return null;
  let movieInDb = {};
  if (movie._id) {
    const id = movie._id;
    delete movie._id;
    movieInDb = httpServices.put(
      config.moviesApiEndPoint + "/" + id,
      movie
    ).data;
  } else {
    movieInDb = await httpServices.post(config.moviesApiEndPoint, movie).data;
  }
  return movieInDb;
}

export async function deleteMovie(id) {
  const { data: movieInDb } = await httpServices.delete(
    "a" + config.moviesApiEndPoint + "/" + id
  );
  return movieInDb;
}
