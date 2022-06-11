import "./dashboard.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { Getpassdata } from "../api/routes";
import { createRoute } from "../api/routes";

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
  let [arraydata, setArraydata] = useState([]);
  useEffect(() => {
    try {
      const dataa = JSON.parse(localStorage.getItem("LOCALHOST_KEY"));
      const data = axios
        .post(Getpassdata, {
          name: dataa.name ? dataa.name : "",
          email: dataa.email ? dataa.email : "",
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error getting your data!", toastOptions);
        });
        console.log(data);
        //get the array of passwords and set it to the state
        console.log(data.data);
        
      setArraydata(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  /////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  const [data, setData] = useState([]);
  const [usernamecreate, setUsername] = useState("");
  const [passwordcreate, setPassword] = useState("");

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem("LOCALHOST_KEY")));
  }, []);

  if (window.location.pathname) {
    let checkdata = window.location.pathname.split("/");
    if (checkdata[2] == data.name) {
    } else {
      navigate("/?invalid=true");
    }
  }

  const handleSubmit = async (event) => {
    try {
      const dataa = JSON.parse(localStorage.getItem("LOCALHOST_KEY"));
      const response = await axios
        .post(createRoute, {
          email: dataa.email ? dataa.email : "",
          setname: usernamecreate,
          setpassword: passwordcreate,
        })
        .catch((error) => {
          console.log(error);
          toast.error("Error creating your data!", toastOptions);
        });
      if (response.status == 200) {
        toast.success("Successfully created your data!", toastOptions);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FormContainer>
        <div className="App">
          <div class="sidenav">
            <a>Profile</a>
            <a>Name: {data.name}</a>
            <a>Registered: {data.registeredAt}</a>
          </div>
        </div>
        <div>
          <div class="main">
            <form onSubmit={handleSubmit}>
              <label>
                <a className="textadd">Add Password:</a> <br></br>
                <a className="textadd">New Password:</a>
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(event) => setUsername(event.target.value)}
                  value={usernamecreate}
                  min="3"
                />
              </label>
              <label>
                <a className="textadd">Confirm Password:</a>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  value={passwordcreate}
                  min="3"
                />
              </label>
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
        <div class="main">
          <form2>
            <label>
              <a className="textadd">Remove Password:</a> <br></br>
              <a className="textadd">Password name:</a>
              <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={event => setUsername(event.target.value)}
            value={usernamecreate}
            min="3"
          />
            </label>
            <input type="submit" value="Submit" />
          </form2>
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
    position: absolute;
    right: 300px;
    flex-direction: column;
    gap: 2rem;
    object-fit: cover;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 5rem;
  }
  form2 {
    display: flex;
    position: absolute;
    left: 400px;
    object-fit: cover;
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
