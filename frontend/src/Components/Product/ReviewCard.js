import React, { Fragment } from "react";
import Profile from "../../images/Profile.png";
import ReactStar from "react-rating-stars-component";
import { useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { Rating } from "@mui/material";

const ReviewCard = ({ reviews }) => {
  const { loading } = useSelector((state) => state.productDetails);
  const options = {
    size: "small",
    value: reviews?.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="reviewCard">
          <img src={Profile} alt="User" />
          <p>{reviews?.name}</p>
          <Rating {...options} />
          <span className="reviewCardComment">{reviews?.comment}</span>
        </div>
      )}
    </Fragment>
  );
};

export default ReviewCard;
