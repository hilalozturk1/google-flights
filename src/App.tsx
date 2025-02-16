import './index.css';

import React from 'react';
import FlightsSearch from './pages/FlightsSearch';

const App: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold text-center mb-4">
        Google Flights Clone
      </h1>
      <FlightsSearch />
    </div>
  );
};

export default App;
