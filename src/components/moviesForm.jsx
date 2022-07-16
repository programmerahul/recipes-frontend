import React from "react";
import { saveMovie, getMovie, getMovies } from "../services/fakeMovieService";
import Form from "./common/form";
import Joi from "joi-browser";
class MoviesForm extends Form {
  state = {
    data: { title: "", numberInStock: "", dailyRentalRate: "" },
    genreId: "",
    errors: {},
  };
  componentDidMount() {
    const { _id } = this.props.match.params;
    if (_id !== "new") {
      const movie = getMovie(_id);
      if (!movie) {
        console.log();
        this.props.history.replace("/notFound");
        return;
      }
      const data = {
        title: movie.title,
        numberInStock: movie.numberInStock,
        dailyRentalRate: movie.dailyRentalRate,
      };
      const genreId = movie.genre._id;
      this.setState({ data, genreId });
    }
  }

  doSubmit = () => {
    const { data, genreId } = this.state;
    const movie = { ...data };
    movie.genreId = genreId;
    const { _id } = this.props.match.params;
    if (_id !== "new") movie._id = _id;
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
  handleSelectChange = ({ currentTarget: input }) => {
    this.setState({ genreId: input.value });
  };
  render() {
    return (
      <div>
        <h1>Movies Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect(
            this.state.genreId,
            "Genre",
            this.handleSelectChange
          )}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}
export default MoviesForm;
