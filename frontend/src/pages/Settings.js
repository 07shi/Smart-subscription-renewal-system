import "./Settings.css";
import Sidebar from "../components/Sidebar";

function Settings() {
  return (
    <div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ marginLeft: "240px", padding: "20px" }}>

        <h1>⚙️ Settings</h1>
        <p>Manage your preferences</p>

        <div className="settings-card">
          <h3>NOTIFICATIONS</h3>
          <p>Default reminder: 7 days before expiry</p>
          <p>Customize individual reminders for each item</p>
        </div>

        <div className="settings-card">
          <h3>ACCOUNT</h3>
          <p>Theme: Burgundy & Plum</p>
          <p>Storage: Secure Cloud</p>
        </div>

        <div className="settings-card">
          <h3>PRIVACY</h3>
          <p>
            Your data is encrypted and never shared with third parties.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Settings;