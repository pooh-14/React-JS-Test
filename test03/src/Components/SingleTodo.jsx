import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const SingleTodo = () => {
  const { state } = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [todoData, setTodoData] = useState({
    subject: "",
    description: "",
  });
  const [isTodoExist, setIsTodoExist] = useState(false);
  const [todos, setTodos] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [single, setSingle] = useState([]);
  const [forEdit, setForEdit] = useState(false);
  const { id } = useParams();
  const router = useNavigate();

  useEffect(() => {
    if (state) {
      setUserData(state?.user);
    }
  }, [state]);

  useEffect(() => {
    const todoFromDb = JSON.parse(localStorage.getItem("Todos"));
    if (todoFromDb) {
      setIsTodoExist(true);
      setTodos(todoFromDb);
    } else {
      setIsTodoExist(false);
    }
  });

  useEffect(() => {
    if (isTodoExist) {
      if (id && todos.length) {
        const res = todos.find((tod) => tod.id == id);
        setSingle(res);
      }
    }
  }, [id, todos]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("Current-user"));
    if (user) {
      setIsUserLoggedIn(true);
      setCurrentUserEmail(user.email);
    }
  });

  function ownTodo() {
    if (isUserLoggedIn) {
      const allUsers = JSON.parse(localStorage.getItem("User"));
      for (let i = 0; i < allUsers.length; i++) {
        if (allUsers[i].email == currentUserEmail) {
          allUsers[i].own.push(single);
          localStorage.setItem("User", JSON.stringify(allUsers));
          break;
        }
      }
      alert("Todo owned successfully!");
      router("/ownedtodo");
    } else {
      alert("You are not a logged in user!");
      router("/login");
    }
  }


//   -------------------------****--------------------------------


  const handleChange = (event) => {
    setTodoData({ ...todoData, [event.target.name]: event.target.value });
  };

//   const handleEdit = (event) => {
//     event.preventDefault();
//     const allTodo = JSON.parse(localStorage.getItem("Todos"));
//     for (let i = 0; i < allTodo.length; i++) {
//       if (allTodo[i].id === id) {
//         allTodo[i].subject === todos.subject;
//         allTodo[i].description === todos.description;
//         single[i].subject === todos.subject;
//         single[i].description === todos.description;

//         localStorage.setItem("Todos", JSON.stringify(allTodo[i]));
//         setTodoData({ subject: "", description: "" });
//         alert("Todo edited successfully!");
//       }
//     }
//   };

  function editOpen() {
    setForEdit(true);
  }

  function editClose() {
    setForEdit(false);
  }

  return (
    <div>
      {forEdit ? (
        <div onMouseLeave={ editClose} style={{width:"290px", height:"260px", border:"1px solid black", margin:"auto", marginTop:"100px"}}>
          <form >
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
            <button>Edit Todo</button>
          </form>
        </div>
      ) : null}
      <div style={{width:"290px", height:"260px", border:"1px solid black", margin:"auto", marginTop:"100px"}}>
      <div style={{padding:"20px"}}>
        <h3>{single.subject}</h3>
        <h4 style={{marginTop:"20px"}}>{single.description}</h4>
      </div>
      <div style={{marginTop:"20px"}}>
        <button style={{height:"30px",width:"100px", marginLeft:"20px"}} onClick={ownTodo}>Own Todo</button>
        <button style={{height:"30px",width:"100px", marginLeft:"20px"}} onClick={editOpen}>Edit Todo</button>
      </div>
    </div>

      </div>

      
  );
};

export default SingleTodo;
