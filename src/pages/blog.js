import React from "react";

const Blog = (props) => {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "Right",
        alignItems: "Right",
        height: "100vh",
      }}
    >
      <h1>{props.match.params.id}</h1>
    </div>
  );
};

export default Blog;
