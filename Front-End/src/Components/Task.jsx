import React, { useState } from "react";
import "../Style/Task.css";
import TaskEdit from "./TaskEdit";

export const Task = ({ id, name, completed, onDelete, onEdit, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        onDelete(id);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const handleEdit = () => {
    console.log(id);
    setIsEditing(true);
  };

  const handleBack = () => {
    setIsEditing(false);
  };

  const handleTaskEdit = (editedTask) => {
    console.log("Task edited:", editedTask.task._id);
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <TaskEdit id={id} handleBack={handleBack} onEdit={handleTaskEdit} />
      ) : (
        <>
          <h3 className="task-name">{name}</h3>
          <div className="buttons">
            <input
              className="edit-button button"
              type="button"
              value="Edit"
              onClick={handleEdit}
            />
            <input
              className="delete-button button"
              type="button"
              value="Delete"
              onClick={handleDelete}
            />
          </div>
          <input
            type="checkbox"
            className="checkbox"
            checked={completed}
            onChange={() => {
              const updatedCompleted = !completed;

              fetch(`http://localhost:3000/api/v1/tasks/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ completed: updatedCompleted }),
              })
                .then((response) => response.json())
                .then(() => {
                  onComplete(id, updatedCompleted);
                })
                .catch((error) => {
                  console.error("Error updating task:", error);
                });
            }}
          />
        </>
      )}
    </div>
  );
};

export default Task;
