import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import ClientAddress from './ClientAddress';
import ClientAdditionalList from './ClientAdditionalList';

function ClientsList(){
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAdditionalModalOpen, setIsAdditionalModalOpen] = useState(false);

  useEffect(( ) => {
    axios.get('https://mern-stack-crud-3-tables.vercel.app//clients/')
    .then(response => {
      setClients(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  function deleteClient(id) {
    axios.delete('https://mern-stack-crud-3-tables.vercel.app//clients/'+id)
      .then(response => { console.log(response.data)});

    setClients(clients.filter(el => el._id !== id));
  }

  function showAdditionalModal(client){
    setSelectedClient(client);
    setIsAdditionalModalOpen(true);
  }

  function showAddressModal(client){
    setSelectedClient(client);
    setIsAddressModalOpen(true);
  }

  function closeModal(){
    setIsAdditionalModalOpen(false);
    setIsAddressModalOpen(false);
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
      <h3>Logged Clients</h3>
      <Link to="/client/create" >Create Client</Link>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Create Time</th>
            <th>Title</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Additional Info</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(currentclient =>(
            <tr key = {currentclient._id}>
              <td>{parseDate(currentclient.recordCreationDate)}</td>
              <td>{currentclient.title === 'Other' ? currentclient.titleOther : currentclient.title}</td>
              <td>{currentclient.firstName + " " + currentclient.surName}</td>
              <td>{currentclient.phoneNumber}</td>
              <td>{currentclient.email}</td>
              <td>
                <button onClick={() => showAdditionalModal(currentclient)}>Show More Info</button>
              </td>
              <td>
                <button onClick={() => showAddressModal(currentclient)}>Show Address</button>
              </td>
              <td>
                <Link to={"/client/edit/"+currentclient._id}>edit</Link> | 
                <a href="#" onClick={() => {deleteClient(currentclient._id) }}>delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* The PopUp Window of Additional Information */}
      {isAdditionalModalOpen && selectedClient && 
        <ClientAdditionalList
          selectedClient = {selectedClient} 
          closeModal = {closeModal}
          parseDate = {parseDate}
        />
      }

      {/* The PopUp Window of Address */}
      {isAddressModalOpen && selectedClient && 
        <ClientAddress
          selectedClient = {selectedClient} 
          closeModal = {closeModal}         
        />
      }
    </div>
  )  
}

export default ClientsList;