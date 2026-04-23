import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const nav = useNavigate();

  const token = localStorage.getItem("token");

  const [list, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Academic");
  const [name, setName] = useState("Student");
  const [search, setSearch] = useState("");

  const headers = {
    headers: { authorization: token },
  };

  /* =========================
      LOAD DATA
  ========================= */

  const load = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/grievances",
        headers
      );
      setList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
      LOAD USER NAME
  ========================= */

  useEffect(() => {
    if (!token) {
      nav("/login");
      return;
    }

    const savedName = localStorage.getItem("name");

    if (savedName) {
      setName(savedName);
    }

    load();
  }, []);

  /* =========================
      ADD GRIEVANCE
  ========================= */

  const add = async () => {
    if (!title || !description || !category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/grievances",
        {
          title,
          description,
          category,
        },
        headers
      );

      setTitle("");
      setDescription("");
      setCategory("Academic");

      load();
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
      DELETE
  ========================= */

  const del = async (id) => {
    try {
      await axios.delete(
        "http://localhost:5000/api/grievances/" + id,
        headers
      );

      load();
    } catch (error) {
      console.log(error);
    }
  };

  /* =========================
      LOGOUT
  ========================= */

  const logout = () => {
    localStorage.clear();
    nav("/login");
  };

  /* =========================
      COUNTS
  ========================= */

  const total = list.length;

  const pending = list.filter(
    (item) => item.status === "Pending"
  ).length;

  const resolved = list.filter(
    (item) => item.status === "Resolved"
  ).length;

  /* =========================
      SEARCH FILTER
  ========================= */

  const filteredList = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.status.toLowerCase().includes(search.toLowerCase())
  );

  /* =========================
      UI
  ========================= */

  return (
    <div className="dashboard-page">

      {/* Navbar */}

      <div className="topbar">
        <div>
          <h1>Student Grievance Portal</h1>
          <p>Welcome back, {name} 👋</p>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Stats */}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{total}</h3>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>{resolved}</h3>
          <p>Resolved</p>
        </div>

        <div className="stat-card">
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </div>

      {/* Main Layout */}

      <div className="dashboard-grid">

        {/* Left Form */}

        <div className="form-box">
          <h2>Submit New Complaint</h2>

          <input
            value={title}
            placeholder="Complaint Title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            value={description}
            placeholder="Complaint Description"
            onChange={(e) =>
              setDescription(e.target.value)
            }
          ></textarea>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option>Academic</option>
            <option>Hostel</option>
            <option>Transport</option>
            <option>Other</option>
          </select>

          <button className="submit-btn" onClick={add}>
            Submit Complaint
          </button>
        </div>

        {/* Right Complaints */}

        <div className="complaint-box">

          <h2>Your Complaints</h2>

          <input
            className="search-box"
            placeholder="Search complaints..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {filteredList.length === 0 ? (
            <div className="empty-box">
              No complaints found.
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item._id}
                className="complaint-card"
              >
                <div className="card-top">
                  <h3>{item.title}</h3>

                  <span
                    className={
                      item.status === "Resolved"
                        ? "status resolved"
                        : "status pending"
                    }
                  >
                    {item.status}
                  </span>
                </div>

                <p>{item.description}</p>

                <div className="meta-row">
                  <span>{item.category}</span>

                  <span>
                    {new Date(
                      item.date
                    ).toLocaleDateString()}
                  </span>
                </div>

                <button
                  className="delete-btn"
                  onClick={() => del(item._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;