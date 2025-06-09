import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    setError("");
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}user/signin`, {
        username,
        password,
      });

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        navigate("/tasks");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        const message = err.response.data?.message || "An error occurred";

        if (status === 401) {
          setError("Incorrect username or password.");
        } else if (status === 404) {
          setError("User not found.");
        } else {
          setError(message);
        }
      } else if (err.request) {
        setError("No response from server. Please try again later.");
      } else {
        setError("Error setting up request.");
      }

      console.error("Signin error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "auto", padding: "20px" }}>
      <h2>Sign In</h2>

      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button onClick={handleSignin} style={{ width: "100%", padding: "10px" }}>
        Sign In
      </button>

      {/* Signup button added */}
      <button
        onClick={() => navigate("/user/signup")}
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Signin;
