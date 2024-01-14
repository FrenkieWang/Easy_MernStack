import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import TherapistsList from "./components/therapist/TherapistsList";
import EditTherapist from "./components/therapist/EditTherapist";
import CreateTherapist from "./components/therapist/CreateTherapist";
import CreateUser from "./components/CreateUser";

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
        <Route path="/user" element={<CreateUser/>} />
      </Routes>
       </div>
    </Router>
  );
}

export default App;
