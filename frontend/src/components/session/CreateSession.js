import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

// Create a styled span for the red asterisk
const RequiredStar = styled.span`
  color: red;
`;

function CreateSession() {
  const [session, setSession] = useState({
    sessionDate: '',
    sessionTime: '',
    clients: [],
    therapist: '',
    fee: '',
    sessionNumber: '',
    sessionAttendance: 'Attended"',
    sessionType: 'Intake',
    sessionTypeOther: '',
    sessionNotes: ''
  });

  // Get the information of all therapists and clients
  const [allTherapists, setTherapists] = useState([]); 
  const [allClients, setClients] = useState([]); 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://mern-stack-crud-3-tables-backend.vercel.app/clients/');
        setClients(response.data); 
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []); 

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get('https://mern-stack-crud-3-tables-backend.vercel.app/therapists/');
        setTherapists(response.data); 
      } catch (error) {
        console.error('Error fetching therapists:', error);
      }
    };

    fetchTherapists();
  }, []); 


  // Handler for changes 
  function onChangeSession(e){
    const { name, value, checked } = e.target;

    // Handle changes for checkbox - clients
    if (name === "clients") {
      // Put client_id into Array.
      if (checked) {
        setSession(prevSession => ({
          ...prevSession,
          clients: [...prevSession.clients, {
            _id: value,
            firstName: allClients.find(c => c._id === value).firstName,
            lastName: allClients.find(c => c._id === value).lastName
        }]
        }));
        // Remove client_id from Array.
      } else {
        setSession(prevSession => ({
          ...prevSession,
          clients: prevSession.clients.filter(client => client._id !== value)
        }));
      }
    // Handle changes for radiobox - therapist
    } else if (name === "therapist"){
      // Change selected therapist
      setSession(prevSession => ({
        ...prevSession,
        therapist: {
          _id: value,
          firstName: allTherapists.find(t => t._id === value).firstName,
          lastName: allTherapists.find(t => t._id === value).lastName
        }
      }));
    // Handling other input fields...
    } else {  
      setSession(prevSession => ({
        ...prevSession,
        [name]: value
      }));    
    }
  };

  // If Hour is 1 digit, preceded by 0
  function formatSessionTime(timeStr) {
    let [hours, minutes] = timeStr.split(':');
    hours = hours.length === 1 ? `0${hours}` : hours; 
  
    return `${hours}:${minutes}`;
  }

  const generateSession = async () => {
    const response = await fetch('https://mern-stack-crud-3-tables-backend.vercel.app/sessions/generate-session'); 
    const data = await response.json();

    let sessionData = data;

    // Random select 1 Therapist
    let selectedTherapist;
    if (allTherapists && allTherapists.length > 0) {
      const randomIndex = Math.floor(Math.random() * allTherapists.length); 
      selectedTherapist = allTherapists[randomIndex]; 
    }

    // Random select 1-3 Clients
    let selectedClients = [];
    if (allClients && allClients.length > 0) {
      const numberOfClients = Math.floor(Math.random() * 3) + 1; 
      let indexes = new Set();  // Avoid duplicate 

      while (selectedClients.length < numberOfClients) {
        let randomIndex = Math.floor(Math.random() * allClients.length);
        if (!indexes.has(randomIndex)) {
          indexes.add(randomIndex);
          selectedClients.push(allClients[randomIndex]);
        }
      }
    }

    sessionData = {
      ...sessionData,
      sessionDate: sessionData.sessionDate.split('T')[0], // "YYYY-MM-DD"
      sessionTime: formatSessionTime(sessionData.sessionTime), // "HH:mm"
      clients: selectedClients.map(client => ({
        _id: client._id, 
        firstName: client.firstName,
        lastName: client.lastName 
      })),
      therapist: {
        _id: selectedTherapist._id,
        firstName: selectedTherapist.firstName,
        lastName: selectedTherapist.lastName
      },
      sessionNumber: sessionData.sessionNumber.toString().padStart(4, '0') // 4 digits
    };

    setSession(sessionData);
  };

  function onSubmit(e) {
    e.preventDefault();

    // Make sure select at least one client
    if (session.clients.length < 1) {
      alert('Please select at least one client.');
      return; // Do not submit the form and exit the function
    }
    // Make sure select at least one therapist
    if (!session.therapist || !session.therapist._id) {
      alert('Please select a therapist.');
      return; // Do not submit the form and exit the function
    }

    // Only submit _id of clients and therapist
    const submitData = {
      ...session,
      therapist: session.therapist._id , 
      clients: session.clients.map(client => client._id)  
    };
    
    console.log(submitData);

    axios.post('https://mern-stack-crud-3-tables-backend.vercel.app/sessions/add', submitData)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    window.location = '/session';
  }

  return (
    <div>
      <h3>Create New Session</h3>
      <form onSubmit={onSubmit}>
        <button type="button" onClick={generateSession} className="btn btn-secondary">
          Generate a Session
        </button>
        
        {/* Session Information */}        
        <div className="form-group">
          <label>Session Date:<RequiredStar>*</RequiredStar> </label>
          <input 
            required
            type="date" 
            name="sessionDate" 
            value={session.sessionDate} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Session Time:<RequiredStar>*</RequiredStar> </label>
          <input 
            required
            type="time" 
            name="sessionTime" 
            value={session.sessionTime} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        {/* Select clients -- checkbox */}
        <div className="form-group">
          <label>Clients:<RequiredStar>*</RequiredStar> </label>
          {allClients.map(c => (
            <div key={c._id}>
              <input
                type="checkbox"
                name="clients"
                value={c._id}
                onChange={onChangeSession}
                checked={session.clients.map(item => item._id).includes(c._id)}
                /* Disable the checkbox if the number reaches 3 
                   and the current checkbox is unchecked */
                disabled={session.clients.length >= 3 
                  && !session.clients.map(item => item._id).includes(c._id)}
              />
              {c.firstName + " " + c.surName}
            </div>
          ))}
        </div>

        {/* Select Therapist -- radio box */}
        <div className="form-group">
          <label>Therapist:<RequiredStar>*</RequiredStar> </label>
          {allTherapists.map(t => (
            <div key={t._id}>
              <input
                type="radio"
                name="therapist"
                value={t._id}
                onChange={onChangeSession}
                checked={session.therapist._id === t._id}
              />
              {t.firstName + " " + t.surName}
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Fee (€): </label>
          <input 
            type="number" 
            name="fee" 
            value={session.fee} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Session Number:<RequiredStar>*</RequiredStar> </label>
          <input 
            required
            type="number" 
            name="sessionNumber" 
            value={session.sessionNumber} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Session Attendance:<RequiredStar>*</RequiredStar> </label>
          <select 
            required
            name="sessionAttendance" 
            value={session.sessionAttendance} 
            onChange={onChangeSession} 
            className="form-control"
          >
            <option value="Attended">Attended</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
        </div>

        <div className="form-group">
          <label>Session Type:<RequiredStar>*</RequiredStar> </label>
          <select 
            required
            name="sessionType" 
            value={session.sessionType} 
            onChange={onChangeSession} 
            className="form-control"
          >
            <option value="Intake">Intake</option>
            <option value="Psychotherapy">Psychotherapy</option>
            <option value="Assessment">Assessment</option>
            <option value="Other">Other (specify below)</option>
          </select>
        </div>

        {session.sessionType === 'Other' && (
          <div className="form-group">
            <label>Specify Other Session Type:<RequiredStar>*</RequiredStar> </label>
            <input 
              required
              type="text" 
              name="sessionTypeOther" 
              value={session.sessionTypeOther} 
              onChange={onChangeSession} 
              className="form-control"
            />
          </div>
        )}

        <div className="form-group">
          <label>Session Notes:<RequiredStar>*</RequiredStar> </label>
          <textarea 
            required
            name="sessionNotes" 
            value={session.sessionNotes} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Session" className="btn btn-primary" />
        </div>
        <Link to="/session" >Back to Session List</Link>
      </form>
    </div>
  )  
}

export default CreateSession;