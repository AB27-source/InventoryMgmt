import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home2 from './components/Home2';
import Other1 from './components/other1';
import Other2 from './components/other2';
import SnackShelfStock from './components/SnackshelfStock';
import Beverages from './components/Beverages';
import Freezer from './components/Freezer';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home2" element={<Home2 />} />
          <Route path="/other1" element={<Other1 />} />
          <Route path="/other2" element={<Other2 />} />
          <Route path="/snackshelfstock" element={<SnackShelfStock />} />
          <Route path="/beverages" element={<Beverages />} />
          <Route path="/freezer" element={<Freezer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;