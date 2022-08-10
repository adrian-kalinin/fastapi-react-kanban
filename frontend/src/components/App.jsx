import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./Board";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Board />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
