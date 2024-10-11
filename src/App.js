import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import Home from './components/Home';
import CasterPortfolio from './components/CasterPortfolio';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caster/:id" element={<CasterPortfolio />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
