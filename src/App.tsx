import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import CheckOut from "./Components/CheckOut/CheckOut";
import Footer from "./Components/Footer/Footer";
import Home from "./Components/Home/Home";
import Pending from "./Components/Dashboard/Pending";
import Nav from "./Components/Navbar/Nav";
import Success from "./Components/Success/Success";
import Completed from "./Components/Dashboard/Completed";

function App() {
  return (
    <div className="App" style={{ minHeight: "100vh" }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard/pending" element={<Pending />} />
        <Route path="/dashboard/completed" element={<Completed />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
