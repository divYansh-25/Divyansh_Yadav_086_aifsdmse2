import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/login",
      form
    );

    localStorage.setItem("token", res.data.token);
    nav("/dashboard");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Login</h1>

        <input
          placeholder="Email"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={submit}>Login</button>

        <p className="auth-text">
          New user? <span onClick={() => nav("/")}>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Login;