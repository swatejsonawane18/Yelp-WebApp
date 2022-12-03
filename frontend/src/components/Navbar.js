import React from 'react'
import {  NavLink } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {

  return (
    <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <div className=" nav ms-auto navbar-right " id="navbarSupportedContent">

                  <NavLink className="btn mx-1" to='/search' type="submit">Search</NavLink>
                  
                  <NavLink className="btn mx-1"  to='/bookings' type="submit">My Bookings</NavLink> 

                </div>
              </div>
            </nav>
  )
}
