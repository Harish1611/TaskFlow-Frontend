import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAPI } from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await registerAPI(form);
      alert("Registration successful");
      navigate("/login");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", marginTop: 100 }}>
      <h2>Register</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>

      <p>
        Already have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
}