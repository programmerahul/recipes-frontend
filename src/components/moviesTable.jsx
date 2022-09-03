import React, { Component } from "react";
import Table from "./common/table";
import auth from "../services/authService";
import Like from "./common/like";
import { Link } from "react-router-dom";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => {
        return movie.title;
      },
    },
    { path: "genre.name", label: "Genre" },
    { path: "dailyRentalRate", label: "Rating" },
    { path: "numberInStock", label: "Likes" },
    {
      key: "like",
      content: (movie) => (
        <Like Liked={movie.like} onClick={() => this.props.onLike(movie)} />
      ),
    },
  ];
  deleteMovie = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-danger btn-sm"
      >
        delete
      </button>
    ),
  };
  watchMovie = {
    key: "watch",
    content: (movie) => (
      <Link to={`/video/${movie._id}`}>
        <button className="btn btn-outline-info btn-sm ">
          <i className="fa fa-eye mr-1" aria-hidden="true"></i>
          watch
        </button>
      </Link>
    ),
  };
  downloadMovie = {
    key: "download",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie._id)}
        className="btn btn-outline-success btn-sm "
      >
        <i className="fa fa-download mr-1" aria-hidden="true"></i>
        download
      </button>
    ),
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteMovie);
    this.columns.push(this.watchMovie);
    this.columns.push(this.downloadMovie);
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
