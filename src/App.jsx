// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import Home from "./Pages/home/Home";
import Show from "./Pages/show/Show";
import Create from "./Pages/create/Create";

import Edit from "./Pages/edit/Edit";

import "./styles/app.scss";
import NotFound from "./Pages/notFound/NotFound";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/transactions" replace />} />
        <Route path="/transactions" element={<Home />} />
        <Route path="/transactions/new" element={<Create />} />
        <Route path="/transactions/:id" element={<Show />} />
        <Route path="/transactions/:id/edit" element={<Edit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
