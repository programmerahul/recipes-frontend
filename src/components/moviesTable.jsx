import React from "react";
import Like from "./common/like";
const MoviesTable = (props) => {
  const { movies, onDelete, onLike } = props;
  return (
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
        {movies.map((mov) => (
          <tr key={mov._id}>
            <td>{mov.title}</td>
            <td>{mov.genre.name}</td>
            <td>{mov.numberInStock}</td>
            <td>{mov.dailyRentalRate}</td>
            <td>
              <Like Liked={mov.like} onClick={() => onLike(mov)} />
            </td>
            <td>
              <button
                onClick={() => onDelete(mov._id)}
                className="btn btn-danger btn-sm"
              >
                delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MoviesTable;
