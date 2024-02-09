import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';

// Create a styled span for the red asterisk
const RequiredStar = styled.span`
  color: red;
`;

function EditSession() {
  const [session, setSession] = useState({
      sessionDate: '',
      sessionTime: '',
      clients: [],
      therapist: '',
      fee: '',
      sessionNumber: '',
      sessionAttendance: 'Attended',
      sessionType: 'Intake',
      sessionTypeOther: '',
      sessionNotes: ''
  });

  let { id } = useParams();
  
  // Get the information of all therapists and clients
  const [allTherapists, setTherapists] = useState([]); 
  const [allClients, setClients] = useState([]); 

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('https://mern-stack-crud-3-tables.vercel.app//clients/');
        setClients(response.data); 
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();    
  }, [id]); 

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const response = await axios.get('https://mern-stack-crud-3-tables.vercel.app//therapists/');
        setTherapists(response.data);        
      } catch (error) {
        console.error('Error fetching therapists:', error);
      }
    };

    fetchTherapists();    
  }, [id]); 

  // Get the information of the session according to session_id
  useEffect(( ) => {
    axios.get('https://mern-stack-crud-3-tables.vercel.app//sessions/'+ id)
      .then(response => {
        const sessionData = response.data;
        // Format Date to "YYYY-MM-DD"
        if (sessionData.sessionDate) {
          sessionData.sessionDate = sessionData.sessionDate.split('T')[0];
        }
        setSession(sessionData);
      })
      .catch(function (error) {
        console.log(error);
      })

  },[id])  

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
    } else if (name === "therapist") {
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

  function onSubmit(e) {
    e.preventDefault();

    // Make sure select at least one client
    if (session.clients.length < 1) {
      alert('Please select at least one client.');
      return; // Do not submit the form and exit the function
    }

    // Only submit _id of clients and therapist
    const submitData = {
      ...session,
      therapist: session.therapist._id , 
      clients: session.clients.map(client => client._id)  
    };

    console.log(submitData);

    axios.post('https://mern-stack-crud-3-tables.vercel.app//sessions/update/' + id, submitData)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    window.location = '/session';
  }


  return (
    <div>
      <h3>Edit Session Log</h3>
      <form onSubmit={onSubmit}>  

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
          <input type="submit" value="Edit Session Log" className="btn btn-primary" />
        </div>
        <Link to="/session" >Back to Session List</Link>
      </form>
    </div>
  )  
}

export default EditSession;