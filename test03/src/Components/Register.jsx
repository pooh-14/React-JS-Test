import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setuserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useNavigate();

  const handleChange = (event) => {
    setuserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.name && userData.email && userData.password) {
      const userArray = JSON.parse(localStorage.getItem("Users")) || [];
      const object = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
      };
      userArray.push(object);
      localStorage.setItem("Users", JSON.stringify(userArray));
      setuserData({ name: "", email: "", password: "" });
      alert("Registration Successfull!");
      router("/login");
    } else {
      alert("Fill all Credentials");
    }
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit}>
        <label>Enter Name :</label>
        <br />
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
        />
        <br />
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
        <button>Register</button>
        <p>
          Already have an account? <u onClick={() => router("/login")}>Login</u>
        </p>
      </form>
    </div>
  );
};

export default Register;
