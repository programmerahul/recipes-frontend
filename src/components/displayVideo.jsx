import React, { Component } from "react";
import { getMovie, getVideos } from "../services/movieService";
import { getMovies } from "../services/movieService";
const findUrl = async (_id) => {
  const movie = await getMovie(_id);
  const movies = await getMovies();
  let cnt = 0;
  for (const idx in movies) {
    if (JSON.stringify(movie.data) === JSON.stringify(movies[idx])) {
      break;
    }
    cnt++;
  }
  const videos = await getVideos();
  const video = videos.data[cnt - 1];
  console.log(video);
  return video.filename;
};
class DisplayVideo extends Component {
  state = {};
  render() {
    //console.log(this.props.match.params._id);
    const baseUrl = process.env.REACT_APP_API_URL;
    let url = baseUrl + "/video/";
    url += findUrl(this.props.match.params._id);
    console.log(url);
    return (
      <React.Fragment>
        <video width="320" height="240" controls>
          <source src={url} type="video/mp4" />
        </video>
      </React.Fragment>
    );
  }
}

export default DisplayVideo;
