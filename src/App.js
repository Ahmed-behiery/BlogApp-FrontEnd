import React from "react";
import "./App.css";

import Navbar from "./components/navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages";
import Profile from "./pages/profile";
import MyFollowingPosts from "./pages/myfollowingposts";
import Blog from "./pages/blog";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";
import SignIn from "./pages/signin";
import UpdatePost from "./pages/updatepost";
import UpdateUser from "./pages/updateuser";
import NotFound from "./pages/404";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/myfollowingposts" component={MyFollowingPosts} />
        <Route exact path="/blog/:id" component={Blog} />
        <Route exact path="/blogs" component={Blogs} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/updatepost/:id" component={UpdatePost} />
        <Route exact path="/user/:id" component={UpdateUser} />
        {/* <Redirect to="/blogs" /> */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
