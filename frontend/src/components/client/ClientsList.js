import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import ClientAddress from './ClientAddress';

function ClientsList(){
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(( ) => {
    axios.get('http://localhost:5000/clients/')
    .then(response => {
      setClients(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  function deleteClient(id) {
    axios.delete('http://localhost:5000/clients/'+id)
      .then(response => { console.log(response.data)});

    setClients(clients.filter(el => el._id !== id));
  }

  function showAddressModal(client){
    setSelectedClient(client);
    setIsModalOpen(true);
  }

  function closeModal(){
    setIsModalOpen(false);
  }

  return (
    <div>
      <h3>Logged Clients</h3>
      <Link to="/client/create" >Create Client</Link>
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
          {clients.map(currentclient =>(
            <tr key = {currentclient._id}>
              <td>{currentclient.title === 'Other' ? currentclient.titleOther : currentclient.title}</td>
              <td>{currentclient.firstName + " " + currentclient.surName}</td>
              <td>{currentclient.phoneNumber}</td>
              <td>{currentclient.email}</td>
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

      {/* The PopUp Window of Address */}
      {isModalOpen && selectedClient && 
        <ClientAddress
          selectedClient={selectedClient} 
          closeModal={closeModal}
        />
      }
    </div>
  )  
}

export default ClientsList;