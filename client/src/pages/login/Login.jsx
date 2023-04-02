import React, { useState } from "react";

import "./Login.scss";
import axios from "axios";
import sendRequest from "../../utils/send-request.util";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = {
        username: username,
        password: password,
      };
      // Send request login to api
      const response = await sendRequest.post("/auth/login", userData);
      // Store the current user in localstorage
      localStorage.setItem("currentUser", JSON.stringify(response.data.user));
      // redirect to the home page
      navigate("/");
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="login">
      <form>
        <h1>Sign in</h1>
        <label htmlFor="">Username</label>
        <input
          name="username"
          type="text"
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="">Password</label>
        <input
          name="password"
          type="password"
          placeholder={"Enter Password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
        <div className="error">{error && error}</div>
      </form>
    </div>
  );
}

export default Login;
