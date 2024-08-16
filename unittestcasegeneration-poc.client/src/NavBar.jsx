import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import GenerateUnitTestFromFile from './components/GenerateUnitTestFromFile.jsx'
import GenerateUnitTestFromSnippet from './components/GenerateUnitTestFromSnippet.jsx'

function NavBar() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Unit Test Generator
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/snippet">
                  From Snippet
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/file">
                  From File
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Redirect to /snippet when the page loads */}
      <Routes>
        <Route path="/" element={<Navigate to="/snippet" />} />
        <Route path="/file" element={<GenerateUnitTestFromFile />} />
        <Route path="/snippet" element={<GenerateUnitTestFromSnippet />} />
      </Routes>
    </Router>
  );
}

export default NavBar;