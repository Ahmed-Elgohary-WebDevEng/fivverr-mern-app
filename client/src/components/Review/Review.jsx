import React, { useEffect, useState } from "react";
import "./Review.scss";
import { useQuery } from "react-query";
import ReviewsApi from "../../api/reviews/reviews-api";
import UsersApi from "../../api/users/users-api";

function Review({ review }) {
  // For country flags

  const {
    isLoading,
    error,
    data: user,
  } = useQuery(`${review.userId}`, async () => {
    return UsersApi.getUser(review.userId);
  });

  /**
   * ------------ JSX Code --------------
   */
  return (
    <div className="review">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "Something went wrong"
      ) : (
        <div className="item">
          <div className="user">
            <img className="pp" src={user.img || "./img/noavatar.jpg"} alt="" />
            <div className="info">
              <span>{user.username}</span>
              <div className="country">
                <span>{user.country}</span>
              </div>
            </div>
          </div>

          <div className="stars">
            {Array(review.star)
              .fill()
              .map((item, index) => (
                <img src="/img/star.png" alt="" key={index} />
              ))}
            <span>{review.star}</span>
          </div>

          <p>{review.description}</p>
          <div className="helpful">
            <span>Helpful?</span>
            <img src="/img/like.png" alt="" />
            <span>Yes</span>
            <img src="/img/dislike.png" alt="" />
            <span>No</span>
          </div>
        </div>
      )}
      <hr />
    </div>
  );
}

export default Review;
