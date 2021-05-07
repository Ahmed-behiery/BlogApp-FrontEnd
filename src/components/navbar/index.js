import React from "react";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./navbarElements";

const Navbar = () => {
  const token = localStorage.getItem("token");
  

  let logout = () => {
    localStorage.removeItem("token");
    window.location.replace("https://blogsystem-app.herokuapp.com/signin");
  };

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink exact to="/" activeStyle>
            Home
          </NavLink>
          <NavLink to="/profile" activeStyle>
            Profile
          </NavLink>
          <NavLink to="/myfollowingposts" activeStyle>
            MyFollowingPosts
          </NavLink>
          <NavLink exact to="/blogs" activeStyle>
            Blogs
          </NavLink>
        </NavMenu>
        {token ? (
          <NavBtn>
            <NavBtnLink to="" onClick={logout}>
              Logout
            </NavBtnLink>
          </NavBtn>
        ) : (
          <NavBtn>
            <NavBtnLink to="/signin">Sign In</NavBtnLink>
            <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
          </NavBtn>
        )}
      </Nav>
    </>
  );
};

export default Navbar;
