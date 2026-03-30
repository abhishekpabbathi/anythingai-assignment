import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import "./index.css";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = Cookies.get("jwt_token");
  const history = useHistory();

  const getTasks = async () => {
    const response = await fetch("http://localhost:5000/api/v1/tasks", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return;

    const url = editingId
      ? `http://localhost:5000/api/v1/tasks/${editingId}`
      : "http://localhost:5000/api/v1/tasks";

    const method = editingId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    setEditingId(null);
    getTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/v1/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    getTasks();
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditingId(task._id);
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    history.replace("/");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>My Tasks</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <form className="task-form" onSubmit={handleSubmit}>
        <input
          className="task-input"
          value={title}
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit" className="btn">
          {editingId ? "Update" : "Add"} Task
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <span>{task.title}</span>
            <div>
              <button className="edit-btn" onClick={() => handleEdit(task)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;