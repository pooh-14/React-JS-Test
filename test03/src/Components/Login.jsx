import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

const Login = () => {
    const {Login}=useContext(AuthContext)
  const [userData, setuserData] = useState({ email: "", password: "" });
  const router = useNavigate();

  const handleChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.email && userData.password) {
      const allUsers = JSON.parse(localStorage.getItem("Users"));
      for (let i = 0; i < allUsers.length; i++) {
        if (
          allUsers[i].email == userData.email &&
          allUsers[i].password == userData.password
        ) {
          setuserData(allUsers[i]);
        }
        Login(allUsers[i])
        localStorage.setItem("Current-user", JSON.stringify(allUsers[i]));
        setuserData({email: "", password: ""})
        alert("Login Successfull!");
        router("/");
      }
    } else {
      alert("Please fill all the Credentials!");
    }
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <label>Enter Email ID :</label>
        <br />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <br />
        <label>Enter Password :</label>
        <br />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <br />
        <button>Login</button>
        <p>
          New User? <u onClick={() => router("/register")}>Register</u>
        </p>
      </form>
    </div>
  );
};

export default Login;
