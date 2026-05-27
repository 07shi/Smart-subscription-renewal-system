import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Medicines.css";

const getDaysLeft = (date) => {
  const today = new Date();
  const expiry = new Date(date);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

function Medicines() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/api/items?category=medicines", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setItems(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    const token = localStorage.getItem("token");

    await API.delete(`/api/items/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setItems(items.filter((item) => item._id !== id));
  };

  if (loading) return <p>Loading medicines...</p>;

  return (
    <div className="med-container">
      <h2>💊 Medicines</h2>

      <div className="med-grid">
        {items.map((item) => {
          const days = getDaysLeft(item.expiryDate);

          return (
            <div className="med-card" key={item._id}>
              <h3>{item.name}</h3>

              <p>Expiry: {new Date(item.expiryDate).toLocaleDateString()}</p>

              <p
                className={
                  days <= 2
                    ? "red"
                    : days <= 7
                    ? "orange"
                    : "green"
                }
              >
                {days > 0 ? `Expires in ${days} days` : "Expired"}
              </p>

              <button onClick={() => deleteItem(item._id)}>
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Medicines;