import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import TherapistAddress from './TherapistAddress';

function TherapistsList(){
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(( ) => {
    axios.get('https://mern-stack-crud-3-tables.vercel.app//therapists/')
    .then(response => {
      setTherapists(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  function deleteTherapist(id) {
    axios.delete('https://mern-stack-crud-3-tables.vercel.app//therapists/'+id)
      .then(response => { console.log(response.data)});

    setTherapists(therapists.filter(el => el._id !== id));
  }

  function showAddressModal(therapist){
    setSelectedTherapist(therapist);
    setIsModalOpen(true);
  }

  function closeModal(){
    setIsModalOpen(false);
  }

  return (
    <div>
      <h3>Logged Therapists</h3>
      <Link to="/therapist/create" >Create Therapist</Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {therapists.map(currenttherapist =>(
            <tr key = {currenttherapist._id}>
              <td>{currenttherapist.title === 'Other' ? currenttherapist.titleOther : currenttherapist.title}</td>
              <td>{currenttherapist.firstName + " " + currenttherapist.surName}</td>
              <td>{currenttherapist.phoneNumber}</td>
              <td>{currenttherapist.email}</td>
              <td>
                <button onClick={() => showAddressModal(currenttherapist)}>Show Address</button>
              </td>
              <td>
                <Link to={"/therapist/edit/"+currenttherapist._id}>edit</Link> | 
                <a href="#" onClick={() => {deleteTherapist(currenttherapist._id) }}>delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* The PopUp Window of Address */}
      {isModalOpen && selectedTherapist && 
        <TherapistAddress
          selectedTherapist={selectedTherapist} 
          closeModal={closeModal}
        />
      }
    </div>
  )  
}

export default TherapistsList;