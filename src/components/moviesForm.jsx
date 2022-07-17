import React from "react";
import { saveMovie, getMovie } from "../services/movieService";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/genreService";
class MoviesForm extends Form {
  state = {
    data: { title: "", numberInStock: "", dailyRentalRate: "" },
    genreId: "",
    errors: {},
    genres: [],
  };
  async componentDidMount() {
    const genres = await getGenres();
    this.setState({ genres });
    const { _id } = this.props.match.params;
    if (_id !== "new") {
      const movie = await getMovie(_id);
      if (!movie) {
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
    this.props.history.push("/movies");
    saveMovie(movie);
  };
  schema = {
    title: Joi.string().min(5).required().label("Title"),
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
            this.handleSelectChange,
            this.state.genres
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
