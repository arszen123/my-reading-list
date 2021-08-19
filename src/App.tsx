import React from 'react';
import Card from './components/Card';
import Navbar from './components/navbar/Navbar';

const App: React.FC = () => (
  <>
    <Navbar />
    <div style={{
      padding: '10px',
      margin: 'auto',
      maxWidth: 'fit-content',
    }}
    >
      <Card />
    </div>
  </>
);

export default App;
