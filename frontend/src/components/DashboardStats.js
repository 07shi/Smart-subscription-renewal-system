import React from "react";

const DashboardStats = ({ data }) => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Items</h3>
        <p>{data.total}</p>
      </div>

      <div className="stat-card warning">
        <h3>Expiring Soon</h3>
        <p>{data.expiringSoon}</p>
      </div>

      <div className="stat-card danger">
        <h3>Expired</h3>
        <p>{data.expired}</p>
      </div>
    </div>
  );
};

export default DashboardStats;