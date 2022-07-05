import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
class Movie extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete = (id) => {
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) {
      return <p>There are no movies in database</p>;
    }
    return (
      <React.Fragment>
        <p>Showing {count} movies in database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genere</th>
              <th>Stock</th>
              <th>Host</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((mov) => (
              <tr key={mov._id}>
                <td>{mov.title}</td>
                <td>{mov.genre.name}</td>
                <td>{mov.numberInStock}</td>
                <td>{mov.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(mov._id)}
                    className="btn btn-danger btn-sm"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}
export default Movie;
