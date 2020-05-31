import react, { useState, components } from "react";

const Post = (props) => (
  <div>
    <p>{props.titleResult}</p>
    <p>{props.addressResult}</p>
  </div>
);

export default Post;
