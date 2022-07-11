import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import React from "react";
import Movie from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/common/notFound";
import MoviesForm from "./components/moviesForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/movies/:_id" component={MoviesForm} />
          <Route path="/movies" component={Movie} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/notFound" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notFound"></Redirect>
        </Switch>
      </main>
    </React.Fragment>
  );
}
export default App;
