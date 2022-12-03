import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import SearchBox from './components/SearchBox';
import MyBookings from './components/MyBookings'
import { LoadScript } from '@react-google-maps/api';


function App(){
  
  const [reservations,setReservation]=useState([]); 


    return (
      
      <div id='mask'>
        <div className='inner-mask'>
      <>
      
      <BrowserRouter>
      <Navbar/>
      <LoadScript
          googleMapsApiKey={"GCloudApiKey"}
          >
        <Routes>
            <Route path="/search" element={<SearchBox reservations={reservations} setReservation={setReservation}/> } />
            <Route path="/bookings" element={<MyBookings reservations={reservations} setReservation={setReservation}/>} />
        </Routes>
        </LoadScript>
      </BrowserRouter>
        
          
          
      </>
      </div>
      </div>
    

    );
  }


export default App;
