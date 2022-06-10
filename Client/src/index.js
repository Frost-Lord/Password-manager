import react from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom";

import './index.css';
/////////////////////////////////////////////////////////////
import Home from './App';
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
/////////////////////////////////////////////////////////////
import reportWebVitals from './reportWebVitals';


ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard/:Userdata" element={<Dashboard />} />
    </Routes>
  </Router>,

  document.getElementById("root")
);


reportWebVitals();
