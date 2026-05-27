import "./Home.css";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Home({ setIsLoggedIn }) {
  const navigate = useNavigate();

  // USER STATE
  const [user, setUser] = useState(null);

  // STATS STATE
  const [stats, setStats] = useState({
    total: 0,
    expiringSoon: 0,
    expired: 0,
  });

  // SEARCH STATE
  const [search, setSearch] = useState("");

  // FETCH USER + STATS
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await API.get("/items/stats");
        setStats(res.data);
      } catch (err) {
        console.log("Error fetching stats:", err);
      }
    };

    fetchUser();
    fetchStats();

    // Notification
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    } else {
      new Notification("Welcome!", {
        body: "Track your expiry items easily 🚀",
      });
    }
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // CATEGORY DATA
  const categories = [
    {
      title: "OTT SUBSCRIPTIONS",
      icon: "📺",
      route: "/ott",
    },
    {
      title: "GROCERY ITEMS",
      icon: "🛒",
      route: "/grocery",
    },
    {
      title: "MEDICINES",
      icon: "💊",
      route: "/medicines",
    },
    {
      title: "DOCUMENTS & LICENSES",
      icon: "📄",
      route: "/documents",
    },
    {
      title: "GADGET WARRANTY",
      icon: "⚙️",
      route: "/warranty",
    },
  ];

  // FILTERED CATEGORIES
  const filteredCategories = categories.filter((cat) =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: "240px", padding: "20px" }}>

        {/* USER INFO + LOGOUT */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "15px",
          }}
        >
          {user && (
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: "bold" }}>
                {user.name}
              </div>

              <div
                style={{
                  fontSize: "12px",
                  color: "gray",
                }}
              >
                {user.email}
              </div>
            </div>
          )}

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="home-container">

          {/* TOP BANNER */}
          <div className="banner">
            <h1>Subscription and Expiry Tracker</h1>

            <p>
              Never miss an important date. Track subscriptions,
              groceries, medicines, documents, and warranties
              in one elegant interface.
            </p>
          </div>

          {/* STATS */}
          <div className="stats-container">

            <div className="stat-card">
              <h3>Total Items</h3>
              <p>{stats.total}</p>
            </div>

            <div className="stat-card warning">
              <h3>Expiring Soon</h3>
              <p>{stats.expiringSoon}</p>
            </div>

            <div className="stat-card danger">
              <h3>Expired</h3>
              <p>{stats.expired}</p>
            </div>

          </div>

          {/* SEARCH BAR */}
          <input
            type="text"
            placeholder="Search category..."
            className="search-bar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CATEGORY CARDS */}
          <div className="card-grid">

            {filteredCategories.map((cat, index) => (
              <div
                key={index}
                className="card"
                onClick={() => navigate(cat.route)}
              >
                <div className="icon">
                  {cat.icon}
                </div>

                <h3>{cat.title}</h3>

                <p>
                  Track and manage your{" "}
                  {cat.title.toLowerCase()}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* FLOATING BUTTON */}
        <button
          className="fab"
          onClick={() => navigate("/add-item")}
        >
          +
        </button>

      </div>
    </div>
  );
}

export default Home;