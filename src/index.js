import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/index.css";

import Home from "./pages/Home";
import NavBarMenu from "./components/NavBarMenu";
import NavBarFooter from "./components/NavBarFooter";
import Test from "./pages/Test";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Router>
         <NavBarMenu />
         <NavBarFooter />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
         </Routes>
      </Router>
   </React.StrictMode>
);
