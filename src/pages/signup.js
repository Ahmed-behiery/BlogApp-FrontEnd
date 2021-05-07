import React, { useState } from "react";
import "../style/sigup.css";

const SignUp = () => {
  const [state, setState] = useState({
    email: "",
    firstName: "",
    userName: "",
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

    fetch("https://blog-system-backend-app.herokuapp.com/user/signup", {
      method: "POST",
      body: JSON.stringify({
        email: state.email,
        firstName: state.firstName,
        userName: state.userName,
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
        window.location.replace("https://blogsystem-app.herokuapp.com/signin");
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
        setError(
          " Be ensure from your data, insert valid .. Try again please first-name and last-name at least 3 characters password must be al least 5 length, valid email"
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
            <p>
              To keep connected with us please sign up with your personal info.
            </p>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <p className="error">{error}</p>
              <label htmlFor="email"></label>
              <input
                type="email"
                placeholder="Enter your email address"
                name="email"
                id="email"
                onChange={handleInputChange}
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

            <button className=" login button">Create account</button>

            <div className="new-user">
              <p>already have an account .!</p>
              <a href="/signin" className="create">
                Sign In
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
