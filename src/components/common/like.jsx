import React from "react";
const Like = (props) => {
  let st = "fa fa-heart";
  if (!props.Liked) {
    st += "-o";
  }
  return (
    <i
      style={{ cursor: "pointer" }}
      onClick={props.onClick} //raising event
      className={st + " text-warning"}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
