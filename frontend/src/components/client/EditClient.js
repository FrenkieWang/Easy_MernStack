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

function EditClient() {
  const [client, setClient] = useState({
    title: 'Mx',
    titleOther: '',
    firstName: '',
    surname: '',
    phoneNumber: '',
    email: '',
    homeAddress: {
      addressLine1: '',
      addressLine2: '',
      town: '',
      countyCity: '',
      eircode: ''
    }
  });

  let { id } = useParams();

  useEffect(( ) => {
    axios.get('http://localhost:5000/clients/'+ id)
      .then(response => {
        setClient(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })

  },[id])

  function onChangeClient(e){
    const { name, value } = e.target;
    if (name.startsWith("homeAddress.")) {
      setClient(prevClient => ({
        ...prevClient,
        homeAddress: {
          ...prevClient.homeAddress,
          [name.split(".")[1]]: value
        }
      }));
    } else {
      setClient(prevClient => ({
        ...prevClient,
        [name]: value
      }));
    }
  };

  function onSubmit(e) {
    e.preventDefault();

    console.log(client);

    axios.post('http://localhost:5000/clients/update/' + id, client)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    window.location = '/client';
  }


  return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={onSubmit}>        
        {/* Client Information */}
        <div className="form-group">
          <label>Title:<RequiredStar>*</RequiredStar> </label>
          <select
            required
            name="title"
            className="form-control"
            value={client.title}
            onChange={onChangeClient}
          >
            <option value="Mx">Mx</option>
            <option value="Ms">Ms</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {client.title === 'Other' && (
          <div className="form-group"> 
            <label>Title Other: </label>
            <input
              type="text"
              name="titleOther"
              className="form-control" 
              value={client.titleOther} 
              onChange={onChangeClient}
            />
          </div>
        )}
        <div className="form-group"> 
          <label>First Name:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="firstName"
            className="form-control" 
            value={client.firstName} 
            onChange={onChangeClient}
          />
        </div>
        <div className="form-group"> 
          <label>Last Name:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="surName"
            className="form-control" 
            value={client.surName} 
            onChange={onChangeClient}
          />
        </div>
        <div className="form-group"> 
          <label>Phone Number:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="phoneNumber"
            className="form-control" 
            value={client.phoneNumber} 
            onChange={onChangeClient} 
          />
        </div>
        <div className="form-group"> 
          <label>Email:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="email"
            name="email"
            className="form-control" 
            value={client.email} 
            onChange={onChangeClient}
          />
        </div>

        {/* Address Fields */}
        <div className="form-group">
          <label>Address Line 1:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.addressLine1"
            className="form-control"
            value={client.homeAddress.addressLine1}
            onChange={onChangeClient}
          />
        </div>
        <div className="form-group">
          <label>Address Line 2:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.addressLine2"
            className="form-control"
            value={client.homeAddress.addressLine2}
            onChange={onChangeClient}
          />
        </div>
        <div className="form-group">
          <label>Town:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.town"
            className="form-control"
            value={client.homeAddress.town}
            onChange={onChangeClient}
          />
        </div>
        <div className="form-group">
          <label>County/City:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.countyCity"
            className="form-control"
            value={client.homeAddress.countyCity}
            onChange={onChangeClient}
          />
        </div>
        <div className="form-group">
          <label>Eircode: </label>
          <input
            type="text"
            name="homeAddress.eircode"
            className="form-control"
            value={client.homeAddress.eircode}
            onChange={onChangeClient}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
        <Link to="/client" >Back to Client List</Link>
      </form>
    </div>
  )  
}

export default EditClient;