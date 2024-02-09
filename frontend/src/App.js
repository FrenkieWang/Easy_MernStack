import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import TherapistsList from "./components/therapist/TherapistsList";
import EditTherapist from "./components/therapist/EditTherapist";
import CreateTherapist from "./components/therapist/CreateTherapist";
import ClientsList from "./components/client/ClientsList";
import EditClient from "./components/client/EditClient";
import CreateClient from "./components/client/CreateClient";
import SessionsList from "./components/session/SessionsList";
import EditSession from "./components/session/EditSession";
import CreateSession from "./components/session/CreateSession";


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
        <Route path="/therapist" element={<TherapistsList/>} />
        <Route path="/therapist/edit/:id" element={<EditTherapist/>} />
        <Route path="/therapist/create" element={<CreateTherapist/>} />
        <Route path="/client" element={<ClientsList/>} />
        <Route path="/client/edit/:id" element={<EditClient/>} />
        <Route path="/client/create" element={<CreateClient/>} />
        <Route path="/session" element={<SessionsList/>} />
        <Route path="/session/edit/:id" element={<EditSession/>} />
        <Route path="/session/create" element={<CreateSession/>} />
      </Routes>
       </div>
    </Router>
  );
}

export default App;

/*
  Local Host: http://localhost:5000
  Deployed Host: https://mern-stack-crud-3-tables.vercel.app/
*/