import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import ListGroup from "./common/listGrp";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
class Movie extends Component {
  state = {
    movies: [],
    genre: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "",
  };
  componentDidMount() {
    const genre = [{ name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genre });
  }
  handleItemSelect = (genre) => {
    this.setState({ currentGenre: genre, currentPage: 1 });
  };
  handleDelete = (id) => {
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };
  handleClick = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
    } = this.state;

    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((mov) => mov.genre._id === currentGenre._id)
        : allMovies;
    const { length: count } = filtered;
    if (count === 0) {
      return <p>There are no movies in database</p>;
    }
    const movies = Paginate(filtered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            itemSelected={this.state.currentGenre}
            onItemSelect={this.handleItemSelect}
            items={this.state.genre}
          />
        </div>
        <div className="col">
          <p>Showing {count} movies in database</p>
          <MoviesTable
            onDelete={this.state.handleDelete}
            onLike={this.state.handleClick}
            movies={movies}
          />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
export default Movie;
