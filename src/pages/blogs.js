import React from "react";
import "../style/blogs.css";
import axios from "axios";

class Blogs extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    dataList: [],
    token: localStorage.getItem("token"),
  }; 

   headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + this.state.token,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  };

  componentDidMount() {
    axios
      .get("https://blog-system-backend-app.herokuapp.com/post/allPosts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
        },
      })
      .then((res) => {
        this.setState({
          dataList: res.data,
        });
      });
  }

  addRedirection = () => {
    window.location.replace("https://blogsystem-app.herokuapp.com/");
  };

  componentDidUpdate() {
    this.handleFollow();
  }
 
  handleFollow = (authorId, postId) => {
    fetch("https://blog-system-backend-app.herokuapp.com/user/follow/" + authorId, {
      method: "GET",
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
        window.location.replace("https://blogsystem-app.herokuapp.com/blogs");
      }) 
      .catch((error) => {  
        console.error(error);
      });
  };

  render() {
    const renderData = this.state.dataList.map((item) => {
      const day = new Date(item.createdAt);
      var date =
        day.toLocaleString("en-us", { month: "long" }) +
        " " +
        day.getDate() +
        ", " +
        day.getFullYear();
      var time =
        day.getHours() + ":" + day.getMinutes() + ":" + day.getSeconds();
      var dateTime = date + " " + time;
      return (
        <div className="card" key={item._id}>
          <div className="post">
            <img
              className="post-image"
              src={`https://res.cloudinary.com/duk7mhud6/image/upload/v1620044795/${item.imageUrl}`}
            />

            <div className="post-content">
              <p className="post-header">
                {" "}
                <a href="#"> {item.title}</a>{" "}
              </p>
              <p className="post-text">{item.description}</p>
              <div className="author">
                <img
                  src="https://spng.subpng.com/20180329/zte/kisspng-computer-icons-user-profile-person-5abd853044f6e3.8042428015223698402825.jpg"
                  alt=""
                  className="author-image"
                />
                <div className="author-content">
                  <p className="author-name">
                    {item.author
                      ? item.author.firstName + " " + item.author.userName
                      : "Post Author"}
                  </p>
                  <p className="date">{dateTime}</p>
                </div>
              </div>

              <div className="author-follow">
                {item.mine ? (
                  ""
                ) : (
                  <input
                    type="button"
                    className="mt-4"
                    onClick={(author, postId) =>
                      this.handleFollow(item.author._id, item._id)
                    }
                    value={item.follow ? "Un Follow" : "Follow"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div
        className="blog-box"
        style={{
          display: "flex",
          justifyContent: "Right",
          alignItems: "Right",
        }}
      >
        <div className="main container card-box">
          {this.state.dataList && this.state.dataList.length > 0 ? (
            renderData
          ) : (
            <h1 className="alert-text">No Posts Available Now ..</h1>
          )}
        </div>

        <div className="add" onClick={this.addRedirection}>
          +
        </div>
      </div>
    );
  }
}

export default Blogs;
