import React from 'react';
import './App.css';
import TestIcon from '@/pages/test-icon/test-icon'
import home from '@/assets/svg/home.svg'
import logo from '@/assets/svg/logo.svg'

function App() {
  return (
    <div className="App">
     <div>
      正常引入：
      <img src={home} alt="" />
      <img src={logo} alt="" />
     </div>
    
     <TestIcon />
    </div>
  );
}

export default App;
