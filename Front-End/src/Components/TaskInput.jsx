import React, { useState } from "react";
import "../Style/TaskInput.css";
const TaskInput = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");

  const handleAddTask = () => {
    const newTask = {
      name: taskName,
      completed: false,
    };

    fetch("http://localhost:3000/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => response.json())
      .then((data) => {
        newTask._id = data.task._id;
        addTask(newTask);
        setTaskName("");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div className="tasks-edit-div">
      <input
        type="text"
        placeholder="Enter task name"
        className="task-input"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <button onClick={handleAddTask} className="add-button">
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;
