import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setErrorMessage("");

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}user/signup`,
        { username, password }
      );
      console.log("Signup success:", res.data);

      navigate("/user/signin");
    } catch (err) {
      console.error("Signup error:", err);

      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>

      {/* Signin button added */}
      <button
        onClick={() => navigate("/user/signin")}
        style={{ marginTop: "10px" }}
      >
        Sign In
      </button>

      {errorMessage && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
      )}
    </div>
  );
};

export default Signup;
