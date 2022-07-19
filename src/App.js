import { Redirect, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import "./App.css";
import Movie from "./components/movies";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/common/notFound";
import MoviesForm from "./components/moviesForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
class App extends Component {
  state = {
    user: null,
  };
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:_id" component={MoviesForm} />
            <Route
              path="/movies"
              render={(props) => <Movie {...props} user={this.state.user} />}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Redirect from="/" exact to="/movies" />
            <Route path="/notFound" component={NotFound} />
            <Redirect to="/notFound"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}
export default App;
