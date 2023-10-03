import "./App.css";
import TaskEdit from "./Components/TaskEdit";
import TaskInput from "./Components/TaskInput";
import Tasks from "./Components/Tasks";
import React, { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  return (
    <div className="main-div">
      <h1 className="title">Task Manger</h1>
      <TaskInput addTask={addTask} />
      <Tasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
