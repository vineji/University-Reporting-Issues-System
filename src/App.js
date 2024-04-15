import React, { useState } from 'react';
import "./App.css";
import Login from './Login.js';


function App() {
  return (
    <div className="App">
      <nav className='nav12'> 
        <ul className='nav1'>
          <li>Queen Mary Issues Portal</li>
        </ul>
      </nav>
      <Login/>
    </div>
  );
}

export default App;