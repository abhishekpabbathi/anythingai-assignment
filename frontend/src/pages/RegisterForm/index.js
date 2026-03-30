import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./index.css";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showError, setShowError] = useState(false);

  const history = useHistory();

  const submitForm = async (e) => {
    e.preventDefault();
    setShowError(false);

    try {
      const response = await fetch("http://localhost:5000/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        history.push("/");
      } else {
        setShowError(true);
        setErrorMsg(data.msg || "Registration failed.");
      }
    } catch (err) {
      setShowError(true);
      setErrorMsg("Backend not reachable. Check your server.");
    }
  };

  return (
    <div className="register-container">
      <form className="form-card" onSubmit={submitForm}>
        <h1>Create Account</h1>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn">Register</button>

        {showError && <p className="error">{errorMsg}</p>}

        <p className="switch" onClick={() => history.push("/")}>
          Already have an account? Login
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;