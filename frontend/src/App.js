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
      </Routes>
       </div>
    </Router>
  );
}

export default App;
