import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    const errors = {};
    if (!error) return null;
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
    // const error = {};
    // const { data } = this.state;
    // if (data.username.trim() === "") {
    //   error.username = "username is required";
    // }
    // if (data.password.trim() === "") {
    //   error.password = "Password is required";
    // }
    // return Object.keys(error).length === 0 ? null : error;
  };
  validateProperty = ({ value, name }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
    // if (name === "username") {
    //   if (value.trim() === "") {
    //     return "Username is required";
    //   }
    // }
    // if (name === "password") {
    //   if (value.trim() === "") {
    //     return "password is required";
    //   }
    // }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const error = this.validate();
    this.setState({ errors: error || {} });
    if (error) {
      return;
    }
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        label={label}
        name={name}
        error={errors[name]}
        value={data[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
