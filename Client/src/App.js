import "./App.css";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import swal from "sweetalert";

function App() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = (username, password) => {
    if (username == "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password == "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let dataa = validateForm(username, password);
    console.log(dataa);

    const post = await axios
      .post("http://localhost:7777/api/login/", {
        name: username ? username : "",
        password: password ? password : "",
      })
      .catch((error) => {
        console.log(error);
        swal("error", "Invalid detalis", "error");
      });
    if (post.status == 200) {
      swal("success", "Logging in!", "success");

      localStorage.setItem("LOCALHOST_KEY", JSON.stringify(post.data.user));
      if (post.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(post.user)
        );
      }

      navigate("/chat");
    }

    console.log("Username 👉️", username);
    console.log("Passowrd 👉️", password);

    setUsername("");
    setPassword("");
  };

  return (
    <>
      <FormContainer>
        <div className="App">
          <header className="App-header">
            <h1>Spark Flow</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Username"
                name="username"
                onChange={(event) => setUsername(event.target.value)}
                value={username}
                min="3"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                min="3"
              />
              <button type="submit">Log In</button>
              <span>
                Don't have an account ? <a href="/register">Register</a>
              </span>
            </form>
          </header>
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
