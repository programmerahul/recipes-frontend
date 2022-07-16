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
  };
  validateProperty = ({ value, name }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
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
  renderSelect(selected, label, handleSelectChange) {
    return (
      <div className="form-group">
        <label htmlFor="SelectInput">{label}</label>
        <select
          onChange={handleSelectChange}
          className="form-control"
          id="SelectInput"
        >
          <option selected={selected === ""} value=""></option>
          <option
            selected={selected === "5b21ca3eeb7f6fbccd471818"}
            value="5b21ca3eeb7f6fbccd471818"
          >
            Action
          </option>
          <option
            selected={selected === "5b21ca3eeb7f6fbccd471814"}
            value="5b21ca3eeb7f6fbccd471814"
          >
            Comedy
          </option>
          <option
            selected={selected === "5b21ca3eeb7f6fbccd471820"}
            value="5b21ca3eeb7f6fbccd471820"
          >
            Thriller
          </option>
        </select>
      </div>
    );
  }
}

export default Form;
