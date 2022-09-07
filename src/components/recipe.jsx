import React, { Component } from "react";
const { getRecipes } = require("../services/recipeService");
class Recipe extends Component {
  state = {
    recipes: [],
  };
  async componentDidMount() {
    const recipes = await getRecipes();
    this.setState({ recipes });
  }
  onRecipeClick = (recipe) => {
    this.props.history.push(`/recipes/${recipe._id}`);
  };
  handleNewRecipe = () => {
    this.props.history.push("/new");
  };
  handleMyRecipe = (user) => {
    this.props.history.push(`/myrecipe`);
  };
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleNewRecipe} className="btn btn-primary ml-2">
          New Recipe
        </button>
        <button
          onClick={() => this.handleMyRecipe(this.props.user)}
          className="btn btn-primary ml-2"
        >
          My Recipe
        </button>
        {this.state.recipes.length === 0 ? (
          <h1>Login/Register to see recipes</h1>
        ) : (
          ""
        )}
        <div className="container">
          <div className="row">
            {this.state.recipes.map((recipe) => (
              <div className="card col-md-4 m-2">
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  <div className="text-center">
                    <button
                      onClick={() => this.onRecipeClick(recipe)}
                      className="btn btn-primary"
                      style={{ width: "90%" }}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Recipe;
