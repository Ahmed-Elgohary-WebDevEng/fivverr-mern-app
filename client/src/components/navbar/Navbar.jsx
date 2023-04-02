import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sendRequest from "../../utils/send-request.util";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // Get the current user from localstorage
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  async function handleLogout() {
    try {
      const response = await sendRequest.post("/auth/logout");
      console.log(response);
      localStorage.removeItem("currentUser");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to={"/"} className={"link"}>
            <span className="text">fiverr</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Fiverr Business</span>
          <span>Explore</span>
          <span>English</span>
          {currentUser?.isSeller && <span>Become a seller</span>}
          {!currentUser && (
            <>
              <Link to={"/register"} className={"link"}>
                Join
              </Link>
              <Link to={"/login"} className={"link"}>
                Sign In
              </Link>
            </>
          )}
          {currentUser && (
            <div className={"user"} onClick={() => setOpen(!open)}>
              <img src={currentUser.image || "/img/noavatar.jpg"} alt="" />
              <span>{currentUser.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link className={"link"} to="/mygigs">
                        Gigs
                      </Link>
                      <Link className={"link"} to="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className={"link"} to="/orders">
                    Orders
                  </Link>
                  <Link className={"link"} to="/messages">
                    Messages
                  </Link>
                  <Link className={"link"} onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <span>Test</span>
            <span>Test 1</span>
            <span>Test 2</span>
            <span></span>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
