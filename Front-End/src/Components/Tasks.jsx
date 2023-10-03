import React from "react";
import Task from "./Task";
const Tasks = ({ tasks, setTasks }) => {
  const handleTaskDelete = (taskId) => {
    console.log("delete", taskId);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };
  const handleEditTask = (editedTask) => {
    console.log("Edited Task:", editedTask);

    const updatedTasks = tasks.map((task) =>
      task._id === editedTask.task._id
        ? { ...task, name: editedTask.task.name }
        : task
    );

    setTasks(updatedTasks);
  };

  const handleTaskComplete = (taskId, completed) => {
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, completed } : task
    );

    setTasks(updatedTasks);
  };
  return (
    <div className="tasks-div">
      {tasks.map((task) => (
        <Task
          key={task._id}
          id={task._id}
          name={task.name}
          completed={task.completed}
          onDelete={handleTaskDelete}
          onEdit={handleEditTask}
          onComplete={handleTaskComplete}
        />
      ))}
    </div>
  );
};

export default Tasks;
