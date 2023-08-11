import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddTodo = () => {
  const [todoData, setTodoData] = useState({
    subject: "",
    description: "",
  });
  const router = useNavigate();

  const handleChange = (event) => {
    setTodoData({ ...todoData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (todoData.subject && todoData.description) {
      const todoArray = JSON.parse(localStorage.getItem("Todos")) || [];
      const randomId = uuidv4();
      todoData["id"] = randomId;
      todoArray.push(todoData);
      localStorage.setItem("Todos", JSON.stringify(todoArray));
      setTodoData({ subject: "", description: "" });
      alert("Todo Added Successfully!");
      router("/alltodo");
    } else {
      alert("Fill all fields!");
    }
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <label>Enter SUBJECT :</label>
        <br />
        <input
          type="text"
          name="subject"
          value={todoData.subject}
          onChange={handleChange}
        />
        <br />
        <label>Enter DESCRIPTION :</label>
        <br />
        <input
          type="text"
          name="description"
          value={todoData.description}
          onChange={handleChange}
        />
        <br />
        <button>Add Todo</button>
      </form>
    </div>
  );
};

export default AddTodo;
