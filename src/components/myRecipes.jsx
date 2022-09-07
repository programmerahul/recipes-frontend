import React, { Component } from "react";
import { getRecipes } from "../services/recipeService";
import { deleteRecipe } from "../services/recipeService";
class MyRecipe extends Component {
  state = {
    recipes: [],
  };
  async componentDidMount() {
    let recipes = await getRecipes();
    recipes = recipes.filter((recipe) => {
      return recipe.author._id === this.props.user._id;
    });
    this.setState({ recipes });
  }
  handleDelete = async (recipe) => {
    await deleteRecipe(recipe._id);
    window.location = "/myrecipe";
  };
  handleUpdate = async (recipe) => {
    this.props.history.push(`/new/${recipe._id}`);
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.recipes.map((recipe) => (
            <div className="card col-md-4 m-2 ">
              <div className="card-body">
                <h5 className="card-title">{recipe.name}</h5>
                <p className="card-text">{recipe.description}</p>
                <button
                  onClick={() => this.handleUpdate(recipe)}
                  className="btn btn-primary"
                >
                  Update
                </button>
                <button
                  onClick={() => this.handleDelete(recipe)}
                  className="btn btn-primary ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MyRecipe;
