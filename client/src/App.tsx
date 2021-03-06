import React from 'react';
import './App.scss'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Login/Auth';
import Registration from './pages/Auth/Registration/Registration';

function App() {
  const token = false

  if (!!token) {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/registration' element={<Registration />} />
      </Routes>


    )
  }

}

export default App;
