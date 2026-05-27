import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function MyItems() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // 📥 Fetch data
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/subscriptions");
      setItems(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔍 Filter logic
  useEffect(() => {
    let temp = items;

    if (category !== "All") {
      temp = temp.filter((item) => item.category === category);
    }

    if (search) {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(temp);
  }, [search, category, items]);

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "20px" }}>
        <h1>My Items</h1>
        <p style={{ color: "#777" }}>
          Filter by category to view specific items
        </p>

        {/* 🔍 SEARCH + DROPDOWN */}
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.select}
          >
            <option value="All">All</option>
            <option value="OTT">OTT</option>
            <option value="Groceries">Groceries</option>
            <option value="Medicines">Medicines</option>
            <option value="Documents">Documents</option>
            <option value="Gadgets">Gadgets</option>
          </select>
        </div>

        {/* CATEGORY FILTER BUTTON */}
        <div style={styles.filterBox}>
          <button style={styles.filterBtn}>
            All ({filtered.length})
          </button>
        </div>

        {/* ITEMS */}
        {filtered.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "50px" }}>
            No items in this category
          </p>
        ) : (
          <div style={styles.grid}>
            {filtered.map((item) => (
              <div key={item._id} style={styles.card}>
                <h3>{item.name}</h3>
                <p>{item.category}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  searchBox: {
    display: "flex",
    gap: "10px",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginTop: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
  },

  select: {
    padding: "10px",
  },

  filterBox: {
    marginTop: "20px",
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
  },

  filterBtn: {
    background: "#6a1b3f",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    width: "200px",
  },
};

export default MyItems;