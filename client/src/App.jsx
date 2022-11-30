import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";

function App() {
  const token = false;

  if (!!token) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    );
  }
}

export default App;
