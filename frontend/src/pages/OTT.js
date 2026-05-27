import React, { useEffect, useState } from "react";
import API from "../services/api";

function OTT() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {

        // ✅ Correct API route
        const res = await API.get("/category/OTT");

        console.log("OTT Items:", res.data);

        setItems(res.data);

      } catch (err) {
        console.log("Error fetching OTT items:", err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>OTT Subscriptions</h2>

      {items.length === 0 ? (
        <p>No OTT subscriptions found</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{item.name}</h3>

            <p>
              Expiry:{" "}
              {new Date(item.renewalDate).toLocaleDateString()}
            </p>

            <p>Price: ₹{item.price}</p>

            <p>Billing Cycle: {item.billingCycle}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default OTT;