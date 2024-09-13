import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Home from './components/Home';
import Contact_us from './components/Contact_us';
import About_us from './components/About_us';
import Footer from './components/Footer';
import Login from './components/Login';

const App = () => {
  return (
    <div>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Contact" element={<Contact_us/>} />
        <Route path="/About" element={<About_us/>} />
        <Route path="/Footer" element={<Footer/>} />
        <Route path="/Login" element={<Login/>} />
     </Routes>
    </div>
  )
}

export default App