import React, { Component } from "react";
import Like from "./common/like";
import { getMovies } from "../services/fakeMovieService";
class Movie extends Component {
  state = {
    movies: getMovies(),
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies
              .filter(
                (mov) =>
                  this.state.movies.indexOf(mov) >= this.props.start &&
                  this.state.movies.indexOf(mov) <= this.props.end
              )
              .map((mov) => (
                <tr key={mov._id}>
                  <td>{mov.title}</td>
                  <td>{mov.genre.name}</td>
                  <td>{mov.numberInStock}</td>
                  <td>{mov.dailyRentalRate}</td>
                  <td>
                    <Like
                      Liked={mov.like}
                      onClick={() => this.handleClick(mov)}
                    />
                  </td>
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
