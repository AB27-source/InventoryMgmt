import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home2 from './components/Home2';
import Other1 from './components/other1';
import Other2 from './components/other2';
import { ConfigProvider } from './ConfigContext';

const config = {
  varianceCalculatorEndpoint: "http://localhost:8000/api/variancecalculator/",
  snackshelfEndpoint: "http://localhost:8000/api/snackshelf/",
  freezerEndpoint: "http://localhost:8000/api/freezer/",
  beveragesEndpoint: "http://localhost:8000/api/beverages/"
}

function App() {
  return (
    <ConfigProvider value={config}>
      <Router>
        <div>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/other1" element={<Other1 />} />
            <Route path="/other2" element={<Other2 />} />
          </Routes>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;