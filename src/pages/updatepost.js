import React, { useState, useEffect } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import axios from "axios";
import "../style/index.css";
import "../style/sigup.css";

const UpdatePost = (props) => {
  const [state, setState] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [error, setError] = useState("");

  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get("https://blog-system-backend-app.herokuapp.com/post/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers":  "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        },
      })
      .then((res) => {
        setState(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const token = localStorage.getItem("token");

  const handleInputChange = async (event) => {
    setError("");
    await setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        "https://blog-system-backend-app.herokuapp.com/post/update/" + id,
        {
          title: state.title,
          description: state.description,
          imageUrl: state.imageUrl,
        },
        {
          headers,
        }
      )
      .then((response) => {
        window.location.replace("https://blogsystem-app.herokuapp.com/profile");
      })
      .catch((error) => {
        console.log(error);
        setError(
          "Be ensure from your data, insert valid ... Try again please !!!!!!!! title and description are required and at least 3 characters, image required"
        );
      });
  };

  return (
    <div
      className="container-box"
      style={{
        display: "flex",
        justifyContent: "Right",
        alignItems: "Right",
        height: "100vh",
      }}
    >
      <div className="container">
        <form onSubmit={handleSubmit} method="POST">
          <div className="login-form">
            <p>Update Blog.</p>

            <div className="input-field">
              <p className="error">{error}</p>
              <label htmlFor="title"></label>
              <input
                type="text"
                placeholder="Enter Blog Title"
                name="title"
                id="email"
                onChange={handleInputChange}
                value={state.title}
              />
            </div>
            <div className="input-field">
              <label htmlFor="description"></label>
              <input
                placeholder="Post your main part"
                name="description"
                id="pass"
                onChange={handleInputChange}
                value={state.description}
              />
            </div>

            <label className="fileContainer">
              <pre>
                <FontAwesomeIcon icon={faUpload} />
                <p> Click here to trigger the file uploader!</p>{" "}
              </pre>
              <input type="file" name="imageUrl" onChange={handleInputChange} />
            </label>

            <button className="login">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
