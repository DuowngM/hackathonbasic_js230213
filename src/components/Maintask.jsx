import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Main.css";

function Maintask() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    content: "",
    newDate: "",
    taskStatus: "",
    createdBy: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const { content, newDate, taskStatus, createdBy } = newTask;

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const loadTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/tasks");
      setTasks(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/tasks", {
        newTask,
      });
      loadTasks();
      setNewTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (id) => {
    setIsEditing(true);
    const selectedTask = tasks.find((task) => task.taskId === id);
    setNewTask(selectedTask);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3000/api/v1/tasks/${newTask.taskId}`, {
        updatedTask: newTask,
      });
      setIsEditing(false);
      setNewTask({
        content: "",
        newDate: "",
        taskStatus: "",
        createdBy: "",
      });
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="form-input">
        <form onSubmit={handleAdd}>
          <input
            type="text"
            name="content"
            value={content}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="newDate"
            value={newDate}
            onChange={handleInputChange}
          />
          <select
            name="taskStatus"
            value={taskStatus}
            onChange={handleInputChange}
          >
            <option value="">Choose...</option>
            <option value="Pending">Pending</option>
            <option value="Refill">Refill</option>
            <option value="Reject">Reject</option>
          </select>
          <input
            type="text"
            name="createdBy"
            value={createdBy}
            onChange={handleInputChange}
          />
          {isEditing ? (
            <button type="button" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </form>
      </div>
      <div className="table-infor">
        <div className="table-infor">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Content</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Assigned to</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => {
                const dueDate = new Date(task.newDate);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{task.content}</td>
                    <td>{dueDate.toLocaleDateString("en-GB")}</td>
                    <td>{task.taskStatus}</td>
                    <td>{task.createdBy}</td>
                    <td>
                      {isEditing ? (
                        <button disabled>Edit</button>
                      ) : (
                        <button
                          className="buttonEdit"
                          onClick={() => handleEdit(task.taskId)}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        className="buttonDelete"
                        onClick={() => handleDelete(task.taskId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Maintask;
