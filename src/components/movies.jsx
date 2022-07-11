import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import { Paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
class Movie extends Component {
  state = {
    movies: [],
    genre: [],
    pageSize: 4,
    currentPage: 1,
    currentGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };
  componentDidMount() {
    const genre = [{ name: "All Genre", _id: "" }, ...getGenres()];
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
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      currentGenre,
      sortColumn,
    } = this.state;
    const filtered =
      currentGenre && currentGenre._id
        ? allMovies.filter((mov) => mov.genre._id === currentGenre._id)
        : allMovies;
    const { length: count } = filtered;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = Paginate(sorted, currentPage, pageSize);
    return { data: movies, totalCount: count };
  };

  render() {
    const { pageSize, currentPage, currentGenre, sortColumn, genre } =
      this.state;
    const { data: movies, totalCount } = this.getPagedData();
    if (totalCount === 0) {
      return <p>There are no movies in database</p>;
    }
    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            itemSelected={currentGenre}
            onItemSelect={this.handleItemSelect}
            items={genre}
          />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in database</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleClick}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
