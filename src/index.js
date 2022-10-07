import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import NavBarMenu from "./components/NavBarMenu";
import App from "./pages/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <React.StrictMode>
      <Router>
         <NavBarMenu />
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<App />} />
         </Routes>
      </Router>
   </React.StrictMode>
);
