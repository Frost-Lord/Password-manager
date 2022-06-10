//import './Register.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Getpassdata } from "../api/routes";

function App() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (!localStorage.getItem("LOCALHOST_KEY")) {
      navigate("/");
    }
  }, []);
  

  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////// API //////////////////////////////////////////

  useEffect(async () => {
      try {
        const dataa = JSON.parse(localStorage.getItem("LOCALHOST_KEY"));
        const response = await axios.post(Getpassdata, {
          name: dataa.name ? dataa.name : "",
          email: dataa.email ? dataa.email : "",
         }).catch(error => {
          console.log(error);
          toast.error("Error getting your data!", toastOptions);
         })
      }
      catch (error) {
        console.log(error);
      }
  }, []);



  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

  async function getdata() {
    try {
      const dataa = JSON.parse(localStorage.getItem("LOCALHOST_KEY"));
      return await dataa;
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <FormContainer>
    <div className="App">
      <header className="App-header">
      <h1>Spark Flow</h1>
      </header>

      <div className="sidebar">
        <div className="sidebar-header">
          <h3>User Data</h3>

          <datauser>
            <p>Name: {getdata().name}</p>
            <script>
              //get the response from getdata
              const dataa = JSON.parse(localStorage.getItem("LOCALHOST_KEY"));
              console.log(dataa);
              
            </script>
          </datauser>
          <datauser>
            <p>Email: {getdata().name}</p>
          </datauser>
          </div>
        </div>
    </div>
    
    </FormContainer>
    <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #0b0a15;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default App;
