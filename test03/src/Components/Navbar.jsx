import React, { useContext, useEffect, useState } from "react";
import "../Components/CSS Files/Home.css";
import { AuthContext } from "./Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const {state, Logout}=useContext(AuthContext);
    const [userData, setUserData]=useState({});
    const router = useNavigate();

    useEffect(()=>{
        if(state){
            setUserData(state?.user)
        }
    }, [state]);

  return (
    <div id="navbar">
      <div>
        <h3 onClick={() => router("/")}>Logo</h3>
      </div>
      <div>
        <h3 onClick={() => router("/addtodo")}>Add Todo</h3>
        <h3 onClick={() => router("/alltodo")}>All Todo</h3>
        <h3 onClick={() => router("/ownedtodo")}>Owned Todo</h3>
        {userData ? <h3 onClick={Logout}>Logout</h3> : <h3 onClick={()=> router('/login')}>Login</h3>}
      </div>
    </div>
  );
};

export default Navbar;
