import React, { Component } from "react";
import Like from "./common/like";
import TableHead from "./common/tableHead";
class MoviesTable extends Component {
  colunms = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "a" },
    { key: "b" },
  ];
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;
    return (
      <table className="table">
        <TableHead
          columns={this.colunms}
          onSort={onSort}
          sortColumn={sortColumn}
        />
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
  }
}

export default MoviesTable;
