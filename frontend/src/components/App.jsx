import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Board from "./Board";
import Navbar from "./Navbar";
import Register from "./Register";
import Login from "./Login";
import Index from "./Index";

function App() {
  const [token, setToken] = useState();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route exact path="/board" element={<Board />} />
          <Route
            exact
            path="/signup"
            element={<Register setToken={setToken} />}
          />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
