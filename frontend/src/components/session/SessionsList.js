import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import SessionNote from './SessionNote';

function SessionsList(){
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(( ) => {
    axios.get('https://mern-stack-crud-3-tables-backend.vercel.app/sessions/')
    .then(response => {
      setSessions(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  function deleteSession(id) {
    axios.delete('https://mern-stack-crud-3-tables-backend.vercel.app/sessions/'+id)
      .then(response => { console.log(response.data)});

    setSessions(sessions.filter(el => el._id !== id));
  }

  function showNoteModal(session){
    setSelectedSession(session);
    setIsModalOpen(true);
  }

  function closeModal(){
    setIsModalOpen(false);
  }

  function parseDate(dateString){
    // Parse String to Date
    const date = new Date(dateString);
    // Get the String part before T
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate
  }

  return (
    <div>
      <h3>Logged Sessions</h3>
      <Link to="/session/create" >Create Session</Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Session No.</th> 
            <th>Date</th>
            <th>Name</th>
            <th>Therapist</th>
            <th>Clients</th>
            <th>Attendance</th>
            <th>Type</th>
            <th>Notes</th>
            <th>Fee</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(currentsession =>(
            <tr key = {currentsession._id}>
              <td>{currentsession.sessionNumber}</td>
              <td>{parseDate(currentsession.sessionDate)}</td>
              <td>{currentsession.sessionTime}</td>
              <td>
                <Link to={"/therapist/edit/"+currentsession.therapist._id}>
                  {currentsession.therapist.firstName + " " + currentsession.therapist.surName}
                </Link>
              </td>
              <td>{currentsession.clients.map((client)=>(
                  <p key={client._id}>
                    <Link to={"/client/edit/"+client._id}>
                     {client.firstName + " " + client.surName}
                    </Link>
                  </p>
                ))}
              </td>
              <td>{currentsession.sessionAttendance}</td>
              <td>{currentsession.sessionType}</td>
              <td>
                <button onClick={() => showNoteModal(currentsession)}>Show Note</button>
              </td>
              
              <td>{currentsession.fee}</td>

              <td>
                <Link to={"/session/edit/"+currentsession._id}>edit</Link> | 
                <a href="#" onClick={() => {deleteSession(currentsession._id) }}>delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* The PopUp Window of Note */}
      {isModalOpen && selectedSession && 
        <SessionNote
          selectedSession={selectedSession} 
          closeModal={closeModal}
        />
      }
    </div>
  )  
}

export default SessionsList;