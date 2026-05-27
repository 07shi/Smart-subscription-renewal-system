import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Success:", res.data);

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);

      navigate("/home");
    } catch (err) {
      console.log(err);
      alert("Invalid email or password ❌");
    }
  };

  return (
    <div className="login-container">

      {/* LEFT SIDE */}
      <div className="left-panel">
        <h1>Welcome Back</h1>
        <p>
          Keep your subscriptions, medicines, and warranties organized in one place.
        </p>

        <ul>
          <li>✔ Multi-Category Tracking</li>
          <li>✔ Smart Notifications</li>
          <li>✔ Warranty Management</li>
          <li>✔ Organized Dashboard</li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-panel">
        <div className="login-card">

          <h2>🔐 Login</h2>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="eye-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </span>
          </div>

          <button onClick={handleLogin}>
            Login
          </button>

          {/* ✅ NEW: CREATE ACCOUNT OPTION */}
          <p className="signup-text">
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className="signup-link">
              Create Account
            </span>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Login;