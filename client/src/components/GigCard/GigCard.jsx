import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import UsersApi from "../../api/users/users-api";

function GigCard({ gig }) {
  const {
    status,
    data: gigUser,
    isLoading,
    error,
  } = useQuery("gigUser", async () => {
    return UsersApi.getUser(gig.userId);
  });


  return (
    <Link to={`/gig/${gig._id}`} className="link">
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="gigCard">
          <img src={gig.cover} alt="" />
          <div className="info">
            <div className="user">
              <img src={gigUser?.img || "./img/noavatar.jpg"} alt="" />
              <span>{gig.username}</span>
            </div>
            <p>{gig.description.slice(0, 50)}</p>
            <div className="star">
              <img src="./img/star.png" alt="" />
              <span>
                {!isNaN(gig.totalStars / gig.starNumber) &&
                  Math.round(gig.totalStars / gig.starNumber)}
              </span>
            </div>
          </div>
          <hr />
          <div className="detail">
            <img src="./img/heart.png" alt="" />
            <div className="price">
              <span>STARTING AT</span>
              <h2>
                $ {gig.price}
                <sup>99</sup>
              </h2>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default GigCard;
