import React, { useParams } from "react";
import { NavLink } from "react-router-dom";
import "../style/404.css";

const NotFound = (props) => {

  return (
    <div>
      <div class="td_error">
        <div class="td_error_">
          Oops!!!
          <br />
          <br /> the page you are looking for is corrupt or has been removed.
          <div class="td_error_404">
            404
            <div class="td_error_404_">404</div>
            <div class="td_error_404_">404</div>
          </div>
          <h4 className="back">
            <NavLink to="/blogs">Back To Home</NavLink>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
