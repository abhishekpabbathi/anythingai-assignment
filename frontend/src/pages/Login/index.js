import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    setShowError(false);

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Cookies.set("jwt_token", data.token);
        history.replace("/dashboard");
      } else {
        setShowError(true);
        setErrorMsg(data.msg || "Invalid credentials");
      }
    } catch (err) {
      setShowError(true);
      setErrorMsg("Backend not reachable. Check your server.");
    }
  };

  return (
    <div className="login-container">
      <form className="form-card" onSubmit={submitForm}>
        <h1>Login</h1>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn">Login</button>

        {showError && <p className="error">{errorMsg}</p>}

        <p className="switch" onClick={() => history.push("/registerForm")}>
          Don't have an account? Register
        </p>
      </form>
    </div>
  );
};

export default Login;