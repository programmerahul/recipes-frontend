import React, { Component } from "react";
import { newRecipe } from "../services/recipeService";
import { getRecipe } from "../services/recipeService";
import { updateRecipe } from "../services/recipeService";
class NewRecipe extends Component {
  state = {
    name: "",
    description: "",
    ingredients: "",
    steps: "",
  };
  async componentDidMount() {
    if (this.props.match.params.id) {
      const recipe = await getRecipe(this.props.match.params.id);
      const ingredients = recipe.ingredients.toString();
      const steps = recipe.steps.toString();
      this.setState({
        name: recipe.name,
        description: recipe.description,
        ingredients: ingredients,
        steps: steps,
      });
    }
  }
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleDesChange = (event) => {
    this.setState({ description: event.target.value });
  };
  handleIngChange = (event) => {
    this.setState({ ingredients: event.target.value });
  };
  handleStepsChange = (event) => {
    this.setState({ steps: event.target.value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const recipe = {};
    recipe.name = this.state.name;
    recipe.description = this.state.description;
    recipe.ingredients = this.state.ingredients.split(",");
    console.log(this.state.steps);
    recipe.steps = this.state.steps.split(",");
    const id = this.props.match.params.id;
    if (id) {
      console.log(id, recipe);
      await updateRecipe(id, recipe);
    } else {
      await newRecipe(recipe);
    }
    window.location = "/recipes";
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            onChange={(e) => this.handleNameChange(e)}
            type="text"
            value={this.state.name}
            class="form-control"
            id="name"
            placeholder="Enter name of food"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <input
            onChange={(e) => this.handleDesChange(e)}
            value={this.state.description}
            type="text"
            class="form-control"
            id="description"
            placeholder="Enter description of food"
          />
        </div>
        <div class="form-group">
          <label for="ingredient">Ingredients</label>
          <input
            onChange={(e) => this.handleIngChange(e)}
            value={this.state.ingredients}
            type="text"
            class="form-control"
            id="ingredient"
            placeholder="Enter ingredients (seperated by , )"
          />
        </div>
        <div class="form-group">
          <label for="steps">Steps</label>
          <input
            onChange={(e) => this.handleStepsChange(e)}
            value={this.state.steps}
            type="text"
            class="form-control"
            id="steps"
            placeholder="Enter steps (seperated by , )"
          />
        </div>
        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewRecipe;
