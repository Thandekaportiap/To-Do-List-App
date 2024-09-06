import './App.css';
import './index.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/Contect-us';
import { Home } from './pages/Home';
import Registration from './pages/Registration';
import Footer from "./components/Footer";
import LogIn from './pages/logIn';
import Homelist from './pages/Homelist';


function App() {

  const [userId, setUserId] = useState(null); // State to hold current user's ID

  const handleLogin = (id) => {
    setUserId(id); // Set the userId upon successful login
  };

  return (
    <>
   <BrowserRouter>
   <div className='w-full  mx-[20px]'>
    <Navbar />
    <Routes>
      <Route path='/' element={ <Home/>} /> 
      <Route index element={<Homelist/>}/>
      <Route path='/about-us' element={ <AboutUs/> } /> 
      <Route path='/contact-us' element={ <ContactUs/> } />
      <Route path='/logIn' element={ <LogIn onLogin={handleLogin}/> } />
      <Route path='/ Registration' element={ < Registration/> } /> 
      <Route path='/Homelist' element={ <Homelist userId={userId}/> } />
     
    </Routes>
    <Footer/>
    </div> 
   </BrowserRouter>

    </>
  )
}

export default App
