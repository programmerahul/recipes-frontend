import React, { Component } from "react";
import httpServices from "../services/httpServices";
import { saveVideo } from "../services/movieService";
const url1 = "/video";
class VideoForm extends Component {
  state = {
    video: {},
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("customFile", this.state.video);
    const res = await httpServices.post(url1, formData, {
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
    console.log(res);
    this.props.history.push("/");
  };
  handleChange = (event) => {
    this.setState({ video: event.target.files[0] });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="file" onChange={this.handleChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default VideoForm;
