import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async () => {
    await axios.post(
      "https://divyansh-yadav-086-aifsdmse2.onrender.com/api/register",
      form
    );

    alert("Registered Successfully");
    nav("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1>Register</h1>

        <input
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

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

        <button onClick={submit}>Register</button>

        <p className="auth-text">
          Already have account?{" "}
          <span onClick={() => nav("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;