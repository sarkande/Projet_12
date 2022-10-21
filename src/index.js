import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import Home from "./pages/Home";
import NavBarMenu from "./components/NavBarMenu";
import NavBarFooter from "./components/NavBarFooter";

import UserProfile from "./pages/UserProfile";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   //<React.StrictMode>
   <Router>
      <NavBarMenu />
      <NavBarFooter />
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
   </Router>
   //</React.StrictMode>
);
