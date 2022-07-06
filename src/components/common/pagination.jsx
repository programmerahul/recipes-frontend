import React, { Component } from "react";
import Movie from "../movies";
class Pagination extends Component {
  state = {
    start: 0,
    end: 3,
  };
  handleOnPage = (n) => {
    this.setState({ start: n * 4, end: n * 4 + 3 });
  };
  render() {
    return (
      <React.Fragment>
        <Movie start={this.state.start} end={this.state.end} />
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a
                onClick={() => this.handleOnPage(0)}
                className="page-link"
                href="#"
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a
                onClick={() => this.handleOnPage(1)}
                className="page-link"
                href="#"
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                onClick={() => this.handleOnPage(2)}
                className="page-link"
                href="#"
              >
                3
              </a>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Pagination;
