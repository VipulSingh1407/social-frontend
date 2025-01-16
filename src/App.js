// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserSubmission from '../src/components/userSubmission';
import AdminLogin from './components/adminLogin';
import AdminDashboard from './components/adminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserSubmission />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />


      </Routes>
    </Router>
  );
}

export default App;
