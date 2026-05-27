import Sidebar from "../components/Sidebar";

function About() {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "30px" }}>
        
        {/* TITLE */}
        <h1 style={styles.title}>About</h1>
        <p style={styles.subtitle}>
          Learn more about Expiry Tracker
        </p>

        {/* SECTION 1 */}
        <div style={styles.card}>
          <h3>WHAT IS EXPIRY TRACKER?</h3>
          <p>
            Expiry Tracker helps you manage all important dates in your life.
            Track subscriptions, groceries, medicines, documents, and warranties
            with smart reminders and elegant simplicity.
          </p>
        </div>

        {/* SECTION 2 */}
        <div style={styles.card}>
          <h3>FEATURES</h3>
          <ul style={styles.list}>
            <li>✔ Multi-category tracking system</li>
            <li>✔ Smart reminders before expiry</li>
            <li>✔ Detailed statistics and insights</li>
            <li>✔ Secure cloud storage</li>
            <li>✔ Clean, minimal interface</li>
          </ul>
        </div>

        {/* SECTION 3 */}
        <div style={styles.card}>
          <h3>SUPPORT</h3>
          <p>Email: support@expirytracker.com</p>
          <p>Version: 1.0.0</p>
          <p>© 2024 Expiry Tracker</p>
        </div>

      </div>
    </div>
  );
}

const styles = {
  title: {
    fontSize: "28px",
    marginBottom: "5px",
  },

  subtitle: {
    color: "#777",
    marginBottom: "25px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },

  list: {
    marginTop: "10px",
    lineHeight: "1.8",
  },
};

export default About;