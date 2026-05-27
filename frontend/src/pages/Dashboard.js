import { useEffect, useState } from "react";
import API from "../services/api";
import AddSubscription from "../components/AddSubscription";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // ✅ NEW: stats state
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expiring: 0,
    expired: 0,
  });

  const navigate = useNavigate();

  // 🚀 Initial load
  useEffect(() => {
    fetchSubscriptions();
    fetchTotal();
  }, []);

  // 🔔 Expiry Alert
  useEffect(() => {
    const expiring = subs.filter((sub) => {
      const daysLeft = getDaysLeft(sub.renewalDate);
      return daysLeft > 0 && daysLeft <= 2;
    });

    if (expiring.length > 0) {
      const message = expiring
        .map((sub) => {
          const daysLeft = getDaysLeft(sub.renewalDate);
          return `⚠️ ${sub.name} (${daysLeft} days left)`;
        })
        .join("\n");

      alert(message);
    }
  }, [subs]);

  // 📄 Get all subscriptions
  const fetchSubscriptions = async () => {
    try {
      const res = await API.get("/subscriptions");
      const data = res.data;

      setSubs(data);

      // ✅ CALCULATE STATS
      let total = data.length;
      let active = 0;
      let expiring = 0;
      let expired = 0;

      data.forEach((sub) => {
        const days = getDaysLeft(sub.renewalDate);

        if (days <= 0) {
          expired++;
        } else if (days <= 3) {
          expiring++;
          active++;
        } else {
          active++;
        }
      });

      setStats({ total, active, expiring, expired });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 💰 Get total expense
  const fetchTotal = async () => {
    try {
      const res = await API.get("/subscriptions/total-expense");
      setTotal(res.data.totalExpense);
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete subscription
  const handleDelete = async (id) => {
    try {
      await API.delete(`/subscriptions/${id}`);
      fetchSubscriptions();
      fetchTotal();
    } catch (err) {
      console.log(err);
      alert("Error deleting");
    }
  };

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // 🧠 Calculate days left
  const getDaysLeft = (renewalDate) => {
    const today = new Date();
    const renewal = new Date(renewalDate);

    const diffTime = renewal - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div>
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div style={{ marginLeft: "240px", padding: "20px" }}>
        <div style={styles.container}>

          {/* HEADER */}
          <div style={styles.header}>
            <h1>📊 Subscription & Expiry Tracker</h1>
            <button style={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </div>

          {/* 💰 TOTAL */}
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            💰 Monthly Expense: ₹{total}
          </h2>

          {/* ✅ STATS CARDS */}
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <h2>{stats.total}</h2>
              <p>Total Items</p>
            </div>

            <div style={styles.statCard}>
              <h2>{stats.active}</h2>
              <p>Active</p>
            </div>

            <div style={styles.statCard}>
              <h2>{stats.expiring}</h2>
              <p>Expiring Soon</p>
            </div>

            <div style={styles.statCard}>
              <h2>{stats.expired}</h2>
              <p>Expired</p>
            </div>
          </div>

          {/* ADD FORM */}
          <div style={styles.formContainer}>
            <AddSubscription
              onAdd={() => {
                fetchSubscriptions();
                fetchTotal();
              }}
            />
          </div>

          <h2>Your Subscriptions</h2>

          {loading ? (
            <p>Loading...</p>
          ) : subs.length === 0 ? (
            <p>No subscriptions found</p>
          ) : (
            <div style={styles.grid}>
              {subs.map((sub) => {
                const daysLeft = getDaysLeft(sub.renewalDate);

                return (
                  <div key={sub._id} style={styles.card}>
                    <h3>{sub.name}</h3>

                    <p><b>Category:</b> {sub.category}</p>
                    <p><b>Price:</b> ₹{sub.price}</p>

                    {/* ✅ NEW */}
                    <p><b>Billing:</b> {sub.billingCycle}</p>

                    <p>
                      <b>Renewal:</b>{" "}
                      {new Date(sub.renewalDate).toDateString()}
                    </p>

                    <p>
                      <b>Status:</b>{" "}
                      <span
                        style={{
                          color:
                            daysLeft <= 0
                              ? "gray"
                              : daysLeft <= 3
                              ? "red"
                              : "green",
                          fontWeight: "bold",
                        }}
                      >
                        {daysLeft > 0
                          ? `${daysLeft} days left`
                          : "Expired ❌"}
                      </span>
                    </p>

                    <button
                      onClick={() => handleDelete(sub._id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 🎨 Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f5f7fa",
    minHeight: "100vh",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logoutBtn: {
    background: "#333",
    color: "#fff",
    border: "none",
    padding: "8px 15px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  statsGrid: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
  },

  statCard: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    flex: 1,
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  formContainer: {
    marginBottom: "30px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "12px",
    width: "250px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
  },

  deleteBtn: {
    marginTop: "10px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Dashboard;