import { useState } from "react";
import API from "../services/api";

function AddSubscription({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    category: "OTT",
    price: "",
    renewalDate: "",
    billingCycle: "monthly"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/subscriptions/add", form);
      console.log(res.data);

      onAdd();
      alert("Subscription Added ✅");

      setForm({
        name: "",
        category: "OTT",
        price: "",
        renewalDate: "",
        billingCycle: "monthly"
      });
    } catch (err) {
      console.log(err);
      alert("Error adding subscription ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Subscription</h2>

      {/* NAME */}
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      {/* CATEGORY */}
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="OTT">📺 OTT</option>
        <option value="Software">💻 Software</option>
        <option value="Cloud">☁️ Cloud</option>
        <option value="Bills">💡 Bills</option>
        <option value="Education">📚 Education</option>
        <option value="Membership">🎫 Membership</option>
        <option value="Vehicle">🚗 Vehicle</option>
        <option value="Documents">📄 Documents</option>
        <option value="Finance">💰 Finance</option>

        {/* ✅ NEW ONES */}
        <option value="Groceries">🛒 Groceries</option>
        <option value="Medicines">💊 Medicines</option>
        <option value="Gadgets">⚙️ Gadgets</option>
      </select>

      {/* BILLING */}
      <select
        name="billingCycle"
        value={form.billingCycle}
        onChange={handleChange}
      >
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* PRICE */}
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
      />

      {/* DATE */}
      <input
        type="date"
        name="renewalDate"
        value={form.renewalDate}
        onChange={handleChange}
        required
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddSubscription;