import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CasterPortfolio from './components/CasterPortfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/caster/:id" element={<CasterPortfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
