import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { register } from "../services/userService";
class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  doSubmit = async () => {
    try {
      const response = await register(this.state.data);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      this.props.history.push("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
      return;
    }
  };
  schema = {
    username: Joi.string().required().label("Username").email(),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
