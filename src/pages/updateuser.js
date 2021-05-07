import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/sigup.css";

const UpdateUser = (props) => {
  const [state, setState] = useState({
    email: "",
    firstName: "",
    userName: "",
  });

  const token = localStorage.getItem("token");

  const id = props.match.params.id;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":  "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  };
 
  useEffect(() => {
    axios
      .get("https://blog-system-backend-app.herokuapp.com/user/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setState(...res.data.userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .put(
        "https://blog-system-backend-app.herokuapp.com/user/" + id,
        {
          email: state.email,
          firstName: state.firstName,
          userName: state.userName,
        },
        {
          crossDomain: true,
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
            <p>
              To keep connected with us please sign up with your personal info.
            </p>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <label htmlFor="email"></label>
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                id="email"
                onChange={handleInputChange}
                value={state.email}
              />
            </div>
            <div className="input-field">
              <label htmlFor="firstName"></label>
              <input
                type="text"
                placeholder="Enter your FirstName"
                name="firstName"
                id="firstName"
                onChange={handleInputChange}
                value={state.firstName}
              />
            </div>
            <div className="input-field">
              <label htmlFor="username"></label>
              <input
                type="text"
                placeholder="Enter your LastName"
                name="userName"
                id="email"
                onChange={handleInputChange}
                value={state.userName}
              />
            </div>
            <div className="input-field">
              <label htmlFor="pass"></label>
              <input
                type="password"
                placeholder="**********"
                name="password"
                id="pass"
                onChange={handleInputChange}
              />
            </div>

            <button className="btn login">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
