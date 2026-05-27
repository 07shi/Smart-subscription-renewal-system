import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Auth Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Main Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import MyItems from "./pages/MyItems";
import About from "./pages/About";
import Statistics from "./pages/Statistics";
import Settings from "./pages/Settings";

// Category Pages
import Grocery from "./pages/Grocery";
import OTT from "./pages/OTT";
import Medicines from "./pages/Medicines";
import Documents from "./pages/Documents";
import Warranty from "./pages/Warranty";
import AddItem from "./pages/AddItem";

// Protected Route
const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check token on refresh
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  // Loading screen
  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <Router>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />

        {/* Signup */}
        <Route
          path="/signup"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Signup />
            )
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Home setIsLoggedIn={setIsLoggedIn} />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* My Items */}
        <Route
          path="/my-items"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MyItems />
            </ProtectedRoute>
          }
        />

        {/* About */}
        <Route
          path="/about"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <About />
            </ProtectedRoute>
          }
        />

        {/* Statistics */}
        <Route
          path="/statistics"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Statistics />
            </ProtectedRoute>
          }
        />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Grocery */}
        <Route
          path="/grocery"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Grocery />
            </ProtectedRoute>
          }
        />

        {/* OTT */}
        <Route
          path="/ott"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <OTT />
            </ProtectedRoute>
          }
        />

        {/* Medicines */}
        <Route
          path="/medicines"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Medicines />
            </ProtectedRoute>
          }
        />

        {/* Documents */}
        <Route
          path="/documents"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Documents />
            </ProtectedRoute>
          }
        />

        {/* Warranty */}
        <Route
          path="/warranty"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Warranty />
            </ProtectedRoute>
          }
        />

        {/* Add Item */}
        <Route
          path="/add-item"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <AddItem />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <Navigate to={isLoggedIn ? "/home" : "/login"} />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
