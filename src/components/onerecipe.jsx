import React, { Component } from "react";
import { getRecipe } from "../services/recipeService";
class OneRecipe extends Component {
  state = {
    recipe: {},
  };
  async componentDidMount() {
    const recipe = await getRecipe(this.props.match.params.id);
    this.setState({ recipe });
  }
  render() {
    console.log(this.props.user);
    console.log(this.state.recipe);
    const { recipe } = this.state;
    return (
      <React.Fragment>
        <div>
          <h1>{recipe.name}</h1>
          <p>{recipe.description}</p>
          <p className="mt-5">Step to make the dish:</p>
          <ol>
            {recipe.steps &&
              recipe.steps.map((step) => {
                return <li>{step}</li>;
              })}
          </ol>

          <p className="badge p-2 badge-info mt-3">
            Recipe made by {recipe.author && recipe.author.name}
          </p>
        </div>
      </React.Fragment>
    );
  }
}

export default OneRecipe;
