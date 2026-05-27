import React, { useEffect, useState } from "react";
import API from "../services/api";
import "./Grocery.css";

// ✅ Helper function for expiry
const getDaysLeft = (date) => {
  const today = new Date();
  const expiry = new Date(date);
  return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
};

function Grocery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch grocery items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get("/api/items?category=grocery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setItems(res.data);
      } catch (err) {
        console.log("Error fetching grocery items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // ✅ Delete item
  const deleteItem = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/api/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // update UI after delete
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      console.log("Error deleting item:", err);
    }
  };

  if (loading) return <p>Loading grocery items...</p>;

  return (
    <div className="grocery-container">
      <h2>🛒 Grocery Items</h2>

      {items.length === 0 ? (
        <p>No grocery items found.</p>
      ) : (
        <div className="grocery-grid">
          {items.map((item) => {
            const daysLeft = getDaysLeft(item.expiryDate);

            let statusColor = "green";
            if (daysLeft <= 2) statusColor = "red";
            else if (daysLeft <= 7) statusColor = "orange";

            return (
              <div className="grocery-card" key={item._id}>
                <h3>{item.name}</h3>

                <p>
                  Expiry Date:{" "}
                  {new Date(item.expiryDate).toLocaleDateString()}
                </p>

                <p style={{ color: statusColor, fontWeight: "bold" }}>
                  {daysLeft > 0
                    ? `Expires in ${daysLeft} days`
                    : "Expired"}
                </p>

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Grocery;