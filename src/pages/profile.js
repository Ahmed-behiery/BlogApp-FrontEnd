import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "../style/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userdata: null,
      userposts: null,
      token: localStorage.getItem("token"),
    };
  }

  componentDidMount() {
    fetch("https://blog-system-backend-app.herokuapp.com/user/:id", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          userdata: responseJson.userData,
          userposts: responseJson.userPosts,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  redirectUserPage = (id) => {
    window.location.replace("https://blogsystem-app.herokuapp.com/user/" + id);
  };

  addRedirection = (id) => {
    window.location.replace("https://blogsystem-app.herokuapp.com/updatepost/" + id);
  };

  deletePost = (id) => {
    const url = `https://blog-system-backend-app.herokuapp.com/post/${id}`;

    axios
      .delete(url, {
        headers: {
          Authorization: "Bearer " + this.state.token,
        },
      })
      .then((res) => {
        this.setState((previousState) => {
          return {
            userPosts: previousState.userposts.filter((p) => p.id !== id),
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.replace("https://blogsystem-app.herokuapp.com/profile");
  };

  getDate = (date) => {
    const day = new Date(date);
    var date =
      day.toLocaleString("en-us", { month: "long" }) +
      " " +
      day.getDate() +
      ", " +
      day.getFullYear();
    var time = day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
    var dateTime = date + " " + time;
    return dateTime;
  };

  renderPosts = () => {
    return this.state.userposts.map((post) => {
      return (
        <div className="card-container" key={post._id}>
          <figure className="news_hor">
            <img
              src={`https://res.cloudinary.com/duk7mhud6/image/upload/v1620044795/${post.imageUrl}`}
              alt="bunny"
            />
            <figcaption>
              <h3>{post.title} </h3>
              <p>{post.description}. </p>
              <footer>
                <div className="hor_date">{this.getDate(post.createdAt)}</div>
              </footer>
            </figcaption>
          </figure>
          <div className="controll mb-5">
            <button
              className="btn btn-danger ml-5 mr-2"
              onClick={() => this.deletePost(post._id)}
            >
              Delete
            </button>
            <button
              className="btn btn-info"
              onClick={() => this.addRedirection(post._id)}
            >
              Update
            </button>
          </div>
        </div>
      );
    });
  };

  renderData = () => {
    return this.state.userdata.map((u) => {
      return (
        <div key={u._id}>
          <div className="px-4 pt-0 pb-4 cover">
            <div className="media align-items-end profile-head">
              <div className="profile mr-3">
                <img
                  src="https://cdn2.iconfinder.com/data/icons/finance-vol-2-6/64/man-suit_2-512.png"
                  alt="..."
                  width="130"
                  className="rounded mb-2 img-thumbnail"
                />
                {/* <a href="#" className="btn btn-outline-dark btn-sm btn-block" onClick={() => this.redirectUserPage(u._id)}>
                  Edit profile
                </a> */}
              </div>
              <div className="media-body mb-5 text-white">
                <h4 className="mt-0 mb-0">
                  {u.firstName} {u.userName}
                </h4>
                <p className="small mb-4">
                  {" "}
                  <i className="fas fa-map-marker-alt mr-2"></i>Address
                </p>
              </div>
            </div>
          </div>
          <div className="bg-light p-4 d-flex justify-content-end text-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">
                  {this.state.userposts.length}
                </h5>
                <small className="text-muted">
                  {" "}
                  <i className="fas fa-image mr-1"></i>Posts
                </small>
              </li>
              <li className="list-inline-item">
                <h5 className="font-weight-bold mb-0 d-block">
                  {u.following.length}
                </h5>
                <small className="text-muted">
                  {" "}
                  <i className="fas fa-user mr-1"></i>Following
                </small>
              </li>
            </ul>
          </div>
          <div className="px-4 py-3">
            <h5 className="mb-0">About</h5>
            <div className="p-4 rounded shadow-sm bg-light">
              <p className="font-italic mb-1">FirstName : {u.firstName}</p>
              <p className="font-italic mb-1">LastName : {u.userName}</p>
              <p className="font-italic mb-1">Email : {u.email}</p>
              <p className="font-italic mb-1">Web Developer</p>
            </div>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div
        className="pr-container"
        style={{
          display: "flex",
          justifyContent: "Right",
          alignItems: "Right",
        }}
      >
        <div className="row py-5 px-4 w-100">
          <div className="col-md-8 mx-auto">
            <div className="bg-white shadow rounded overflow-hidden">
              {this.state.userdata && this.state.userposts && this.renderData()}

              <div className="py-4 px-4">
                <hr />
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <h5 className="mb-0">Recent Posts</h5>
                </div>
                <div className="row">
                  {this.state.userposts && this.state.userposts.length > 0 ? (
                    this.renderPosts()
                  ) : (
                    <h1 className="alert-text">No Posts Available</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
