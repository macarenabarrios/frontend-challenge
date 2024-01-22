import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomNavbar from './components/Navbar';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import NewProject from './pages/newProject/newProject';
import EditProject from './pages/editProject/editProject';

function App() {
  return (
    <Router>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<NewProject />} />
        <Route path="/edit/:id" element={<EditProject />} />
      </Routes>
    </Router>
  );
}

export default App;
