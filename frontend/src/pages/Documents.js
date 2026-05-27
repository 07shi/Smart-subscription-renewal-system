import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Documents.css";

const getDaysLeft = (date) => {
  const today = new Date();
  const expiry = new Date(date);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

function Documents() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("token");

      const res = await API.get("/api/items?category=documents", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems(res.data);
    };

    fetchItems();
  }, []);

  return (
    <div className="doc-container">
      <h2>📄 Documents & Licenses</h2>

      <div className="doc-grid">
        {items.map((item) => {
          const days = getDaysLeft(item.expiryDate);

          return (
            <div className="doc-card" key={item._id}>
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

export default Documents;