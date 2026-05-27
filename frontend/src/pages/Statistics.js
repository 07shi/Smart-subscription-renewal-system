import "./Statistics.css";
import Sidebar from "../components/Sidebar";

function Statistics() {
  return (
    <div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ marginLeft: "240px", padding: "20px" }}>

        <h1>📊 Statistics</h1>
        <p>Overview of your tracked items</p>

        <div className="stats-container">

          <div className="stat-card">
            <h3>Total Items</h3>
            <p>25</p>
          </div>

          <div className="stat-card">
            <h3>Expiring Soon</h3>
            <p>5</p>
          </div>

          <div className="stat-card">
            <h3>Expired</h3>
            <p>3</p>
          </div>

          <div className="stat-card">
            <h3>Active Subscriptions</h3>
            <p>12</p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Statistics;