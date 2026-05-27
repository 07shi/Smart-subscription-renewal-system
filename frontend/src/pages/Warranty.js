import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Warranty.css";

const getDaysLeft = (date) => {
  const today = new Date();
  const expiry = new Date(date);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

function Warranty() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/items?category=warranty", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(res.data);
    };

    fetchItems();
  }, []);

  return (
    <div className="war-container">
      <h2>⚙️ Warranty</h2>

      <div className="war-grid">
        {items.map((item) => {
          const days = getDaysLeft(item.expiryDate);

          return (
            <div className="war-card" key={item._id}>
              <h3>{item.name}</h3>

              <p>{new Date(item.expiryDate).toLocaleDateString()}</p>

              <p className={days <= 2 ? "red" : days <= 7 ? "orange" : "green"}>
                {days > 0 ? `${days} days left` : "Expired"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Warranty;