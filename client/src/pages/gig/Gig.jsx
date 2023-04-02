import React, { useState } from "react";
import "./Gig.scss";
import Slider from "infinite-react-carousel";
import { useQuery } from "react-query";
import GigsApi from "../../api/gigs/gigs-api";
import { Link, useParams } from "react-router-dom";
import sendRequest from "../../utils/send-request.util";
import UsersApi from "../../api/users/users-api";
import Reviews from "../../components/Reviews/Reviews";

function Gig(props) {
  const { id } = useParams();
  // Fetch gig with id
  const {
    status,
    data: gig,
    error,
    isLoading,
  } = useQuery("gig", async () => {
    return GigsApi.showGig(id);
  });

  const userId = gig?.userId;

  const {
    status: userStatus,
    data: userData,
    error: userError,
    isLoading: isUserLoading,
  } = useQuery(
    "userData",
    async () => {
      return UsersApi.getUser(gig.userId);
    },
    { enabled: !!userId }
  );

  /**
   * ------------------- JSX Code --------------------
   */
  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Liverr &gt; Graphics & Design &gt;
            </span>
            <h1>{gig.title}</h1>
            {/****************** Seller Data ***************/}
            {isUserLoading ? (
              "Loading..."
            ) : userError ? (
              "Something went wrong"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={userData.img || "./img/noavatar.jpg"}
                  alt=""
                />
                <span>{userData.username}</span>
                {!isNaN(gig.totalStars / gig.starNumber) && (
                  <div className="stars">
                    {Array(Math.round(gig.totalStars / gig.starNumber))
                      .fill()
                      .map((item, index) => (
                        <img src="/img/star.png" alt="" key={index} />
                      ))}
                    <span>{Math.round(gig.totalStars / gig.starNumber)}</span>
                  </div>
                )}
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {gig.images.map((image) => (
                <img src={image} key={image} alt="" />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{gig.description}</p>
            {/****************** Seller Data ***************/}
            {isUserLoading ? (
              "loading"
            ) : userError ? (
              "Something went wrong!"
            ) : (
              <div className="seller">
                <h2>About The Seller</h2>
                <div className="user">
                  <img src={userData.img || "/img/noavatar.jpg"} alt="" />
                  <div className="info">
                    <span>{userData.username}</span>
                    {!isNaN(gig.totalStars / gig.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(gig.totalStars / gig.starNumber))
                          .fill()
                          .map((item, i) => (
                            <img src="/img/star.png" alt="" key={i} />
                          ))}
                        <span>
                          {Math.round(gig.totalStars / gig.starNumber)}
                        </span>
                      </div>
                    )}
                    <button>Contact Me</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">From</span>
                      <span className="desc">{userData.country}</span>
                    </div>
                    <div className="item">
                      <span className="title">Member since</span>
                      <span className="desc">Aug 2022</span>
                    </div>
                    <div className="item">
                      <span className="title">Avg. response time</span>
                      <span className="desc">4 hours</span>
                    </div>
                    <div className="item">
                      <span className="title">Last delivery</span>
                      <span className="desc">1 day</span>
                    </div>
                    <div className="item">
                      <span className="title">Languages</span>
                      <span className="desc">English</span>
                    </div>
                  </div>
                  <hr />
                  <p>{userData.desc}</p>
                </div>
              </div>
            )}

            {/*  Reviews Component */}
            <Reviews gigId={id} />
            {/*  End of Reviews Component */}
          </div>
          <div className="right">
            <div className="price">
              <h3>{gig.shortTitle}</h3>
              <h2>$ {gig.price}</h2>
            </div>
            <p>{gig.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>2 {gig.deliveryTime}</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>3 {gig.revisionNumber}</span>
              </div>
            </div>
            <div className="features">
              {gig.features.map((feature, index) => (
                <div className="item" key={index}>
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Link to={`/pay/${id}`}>
              <button>Continue</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
