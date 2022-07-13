import React from "react";
import { saveMovie } from "../services/fakeMovieService";
import Form from "./common/form";
import Joi from "joi-browser";
class NewMovieForm extends Form {
  state = {
    data: { title: "", numberInStock: "", dailyRentalRate: "" },
    genre: { _id: "", name: "" },
    errors: {},
    _id: {},
  };
  componentDidMount() {
    this.props.location.movie
      ? (this.state.genre = this.props.location.movie.genre)
      : (this.state.genre = { name: "Comedy" });
    const state = { data: {}, genre: {} };
    if (this.props.location.state) {
      const { title, numberInStock, dailyRentalRate, genre, _id } =
        this.props.location.state;
      state.data.title = title;
      state.data.numberInStock = numberInStock;
      state.data.dailyRentalRate = dailyRentalRate;
      state.genre = genre;
      state._id = _id;
    }

    if (this.props.match.params) state._id = this.props.match.params._id;
    this.setState(state);
  }
  doSubmit = () => {
    const movie = { ...this.state.data };
    movie.genreId = this.state.genre._id;
    const d = new Date();
    movie.publishDate = d.toISOString();
    movie._id = this.state._id;
    saveMovie(movie);
    this.props.history.push("/movies");
  };
  schema = {
    title: Joi.string().required().label("Title"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };
  handleSelect = ({ currentTarget: input }) => {
    let genre = { name: input.value };
    if (!input.name) {
      genre = { name: this.props.location.movie.genre.name };
    }
    if (genre.name === "Comedy") {
      genre._id = "5b21ca3eeb7f6fbccd471814";
    } else if (genre.name === "Thriller") {
      genre._id = "5b21ca3eeb7f6fbccd471820";
    } else {
      genre._id = "5b21ca3eeb7f6fbccd471818";
    }

    this.setState({ genre });
  };
  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <label htmlFor="genre">Genre</label>
          <div className="input-group mb-3">
            <select
              defaultValue={
                this.props.location.movie
                  ? this.props.location.movie.genre.name
                  : ""
              }
              onChange={this.handleSelect}
              className="custom-select"
              id="genre"
            >
              <option value={this.state.genre.name}>
                {this.state.genre.name}
              </option>
              <option value="Comedy">Comedy</option>
              <option value="Thriller">Thriller</option>
              <option value="Action">Action</option>
            </select>
          </div>
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;
