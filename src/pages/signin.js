import React, { useState } from "react";
import "../style/sigup.css";

const SignIn = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    setError("");
    setState((prevProps) => ({
      ...prevProps,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("https://blog-system-backend-app.herokuapp.com/user/login", {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),

     headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  },
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(function (data) {
        localStorage.setItem("token", data.token);
        const token = localStorage.getItem("token");
        if (token) {
          window.location.replace("https://blogsystem-app.herokuapp.com/blogs");
        }
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
        setError(
          "email or password is wrong! Be ensure from your data, Try again please .."
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
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <p className="error">{error}</p>
              <label htmlFor="email"></label>
              <input
                type="email"
                placeholder="Enter your email address"
                value={state.email}
                onChange={handleInputChange}
                name="email"
                id="email"
              />
            </div>
            <div className="input-field">
              <label htmlFor="pass"></label>
              <input
                type="password"
                placeholder="**********"
                name="password"
                value={state.password}
                onChange={handleInputChange}
                id="pass"
              />
            </div>
            {/* <div className="input">
              <div>
                <input type="checkbox" name="" id="remember" />
                <label htmlFor="remember">Keep me signed in? </label>
              </div>
              <a href="#" className="create">forgot your password?</a>
            </div> */}

            <button className="login" type="submit">
              login
            </button>

            <div className="new-user">
              <p>create a new user.!</p>
              <a href="/sign-up" className="create">
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
