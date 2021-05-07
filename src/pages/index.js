import React, { useState } from "react";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

import axios from "axios";
import "../style/index.css";
import "../style/sigup.css";

const Home = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    // imageUrl: "",
  });

  const [image, setFile] = useState();
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  if (!token) {
    return <Redirect to="/signin" />;
  }

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
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(image){
      state.imageUrl = image;
    }else{
      state.imageUrl = ""
    }
    
    console.log("In submit Fn" , state);
    axios
      .post("https://blog-system-backend-app.herokuapp.com/post/create", state, {
        headers,
      })
      .then((response) => {
        setError("");
        window.location.replace("https://blogsystem-app.herokuapp.com/blogs");
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
            <p>Create New Blog.</p>

            <div className="input-field">
              <p className="error">{error}</p>
              <label htmlFor="title"></label>
              <input
                type="text"
                placeholder="Enter Blog Title"
                name="title"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <label htmlFor="description"></label>
              <input
                placeholder="Post your main part"
                name="description"
                id="pass"
                onChange={handleInputChange}
              />
            </div>

            <label className="fileContainer">
              <pre>
                <FontAwesomeIcon icon={faUpload} />
                <p> Click here to trigger the file uploader!</p>{" "}
              </pre>
              <input
                type="file"
                name="imageUrl"
                onChange={(event) => {
                  const file = event.target.files[0];
                  var reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = function () {
                    setFile(reader.result);
                  };
                  reader.onerror = function (error) {
                    console.log("Error: ", error);
                  };
                }}
                accept=".jpg"
              />
            </label>

            <button className="login">Create new Blog</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
