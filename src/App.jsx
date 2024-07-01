// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Home from "./Pages/home/Home";
import New from "./Pages/new/New";
import Show from "./Pages/show/Show";
import "./styles/app.scss";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/transactions" replace />} />
        <Route path="/transactions" element={<Home />} />
        <Route path="/transactions/new" element={<New />} />
        <Route path="/transactions/:id" element={<Show />} />
      </Routes>
    </div>
  );
}
