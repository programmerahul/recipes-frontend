import httpServices from "./httpServices";
const url = "/movies";
export async function getMovies() {
  const { data: movies } = await httpServices.get(url);
  return movies;
}

export function getMovie(id) {
  return httpServices.get(url + "/" + id);
}

export async function saveMovie(movie) {
  if (movie.genreId === "") return null;
  let movieInDb = {};
  if (movie._id) {
    const movieCopy = { ...movie };
    const id = movieCopy._id;
    delete movieCopy._id;
    const genreId = movieCopy.genre._id;
    delete movieCopy.genre;
    movieCopy.genreId = genreId;
    movieInDb = await httpServices.put(url + "/" + id, movieCopy).data;
  } else {
    movieInDb = await httpServices.post(url, movie).data;
  }
  return movieInDb;
}

export async function deleteMovie(id) {
  const { data: movieInDb } = await httpServices.delete(url + "/" + id);
  return movieInDb;
}
