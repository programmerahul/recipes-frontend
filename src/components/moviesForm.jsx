import React, { Component } from "react";
class MoviesForm extends Component {
  handleSave = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <h1>Movies Form {this.props.match.params._id}</h1>
        <button
          onClick={this.handleSave}
          className="btn btn-primary btn-sm m-2"
        >
          Save
        </button>
      </div>
    );
  }
}

export default MoviesForm;
