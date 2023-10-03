import React, { useState } from "react";
import "../Style/TaskEdit.css";
const TaskEdit = ({ handleBack, id, onEdit, name }) => {
  const [editedTaskName, setEditedTaskName] = useState("");

  const handleEditTask = () => {
    const editedTask = {
      name: editedTaskName,
    };

    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task edited:", data);

        onEdit(data);
      })
      .catch((error) => {
        console.error("Error editing task:", error);
      });
  };

  return (
    <div className="edit-task">
      <input
        type="text"
        className="edit-text"
        placeholder="Enter new task name"
        value={editedTaskName}
        onChange={(e) => setEditedTaskName(e.target.value)}
      />
      <div className="edit-buttons">
        <input
          type="button"
          value="Edit"
          className="button"
          onClick={handleEditTask}
        />
        <input
          type="button"
          value="Back"
          className="button"
          onClick={handleBack}
        />
      </div>
    </div>
  );
};

export default TaskEdit;
