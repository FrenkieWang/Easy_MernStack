import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(){

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
      <Link to="/therapist" className="navbar-brand">Therapist Tracker</Link> &nbps;
      <Link to="/client" className="navbar-brand">Client Tracker</Link> &nbps;
      <Link to="/session" className="navbar-brand">Session Tracker</Link>
    </nav>
  );  
}

export default Navbar;