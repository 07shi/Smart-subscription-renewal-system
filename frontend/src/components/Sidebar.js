import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <div style={styles.sidebar}>

      {/* LOGO */}
      <h2 style={styles.logo}>Expiry Tracker</h2>

      <ul style={styles.menu}>

        {/* HOME */}
        <li style={location.pathname === "/home" ? styles.active : styles.item}>
          <Link to="/home" style={getLinkStyle(location.pathname === "/home")}>
            🏠 Home
          </Link>
        </li>

        {/* DASHBOARD */}
        <li style={location.pathname === "/dashboard" ? styles.active : styles.item}>
          <Link to="/dashboard" style={getLinkStyle(location.pathname === "/dashboard")}>
            📊 Dashboard
          </Link>
        </li>

        {/* MY ITEMS */}
        <li style={location.pathname === "/my-items" ? styles.active : styles.item}>
          <Link to="/my-items" style={getLinkStyle(location.pathname === "/my-items")}>
            📦 My Items
          </Link>
        </li>

        {/* ABOUT */}
        <li style={location.pathname === "/about" ? styles.active : styles.item}>
          <Link to="/about" style={getLinkStyle(location.pathname === "/about")}>
            ℹ️ About
          </Link>
        </li>

        {/* STATISTICS */}
        <li style={location.pathname === "/statistics" ? styles.active : styles.item}>
          <Link to="/statistics" style={getLinkStyle(location.pathname === "/statistics")}>
            📈 Statistics
          </Link>
        </li>

        {/* ✅ FIXED: SETTINGS */}
        <li style={location.pathname === "/settings" ? styles.active : styles.item}>
          <Link to="/settings" style={getLinkStyle(location.pathname === "/settings")}>
            ⚙️ Settings
          </Link>
        </li>

      </ul>

    </div>
  );
}

// ✅ Dynamic link style
const getLinkStyle = (isActive) => ({
  textDecoration: "none",
  color: isActive ? "#fff" : "#333",
  fontWeight: isActive ? "bold" : "normal",
});

// 🎨 Styles
const styles = {
  sidebar: {
    width: "220px",
    height: "100vh",
    background: "#f8f9fb",
    padding: "20px",
    position: "fixed",
    left: 0,
    top: 0,
    borderRight: "1px solid #eee",
  },

  logo: {
    marginBottom: "30px",
    fontWeight: "bold",
  },

  menu: {
    listStyle: "none",
    padding: 0,
  },

  item: {
    margin: "15px 0",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  active: {
    margin: "15px 0",
    background: "#7b2d4f",
    padding: "10px",
    borderRadius: "8px",
  },

  link: {
    textDecoration: "none",
    color: "#333",
  },
};

export default Sidebar;