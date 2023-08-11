import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllTodo = () => {
  const [isTodoExist, setIsTodoExist] = useState(false);
  const [todos, setTodos] = useState([]);
  const router = useNavigate();

  useEffect(() => {
    const todoFromDb = JSON.parse(localStorage.getItem("Todos"));
    if (todoFromDb) {
      setIsTodoExist(true);
      setTodos(todoFromDb);
    } else {
      setIsTodoExist(false);
    }
  });

  const redirect = (id) => {
    router(`/singletodo/${id}`);
  };

  return (
    <div>
      {!isTodoExist ? (
        <div>
          <h1>No TODOS!</h1>
        </div>
      ) : (
        <div style={{display:"flex", justifyContent:"space-around", marginTop:"20px"}}>
          {todos &&
            todos.map((tod) => (
              <div onClick={() => redirect(tod.id)}   style={{width:"200px", height:"250px",border:"1px solid blue", padding:"20px"}}>
                <h3><u>{tod.subject}</u></h3>
                <h3 style={{marginTop:"20px"}}>{tod.description}</h3>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllTodo;
