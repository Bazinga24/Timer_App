import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import "./App.css"; // Global styles for layout, typography, etc.

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1 className="app-title">Timer App</h1>
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/history" className="nav-link">
                History
              </Link>
            </li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
