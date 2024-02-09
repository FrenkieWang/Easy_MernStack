import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

// Create a styled span for the red asterisk
const RequiredStar = styled.span`
  color: red;
`;

function CreateClient() {
  const [client, setClient] = useState({
    title: 'Mx',
    titleOther: '',
    firstName: '',
    surName: '',
    phoneNumber: '',
    email: '',
    homeAddress: {
      addressLine1: '',
      addressLine2: '',
      town: '',
      countyCity: '',
      eircode: ''
    },
    dateOfBirth: '', 
    parentGuardianName: '', 
    permissionToLeaveMessage: 'N', 
    gender: 'Female',
    maritalStatus: 'Never Married',
    referrer: '',
  });

  // Function to Calculate the Age
  const calculateAge = dateOfBirth => {
    const birthday = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthday.getFullYear();
    const m = today.getMonth() - birthday.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
      age--;
    }
    return age;
  };
  // Show the input of Parent/Guardian Name, when the Date of Birth has changed.
  const showGuardianField = client.dateOfBirth ? calculateAge(client.dateOfBirth) < 18 : false;

  // Handler for changes 
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

  /* If the guardian field is not displayed,
     clear the value of parentGuardianName */
  useEffect(() => {
    if (!showGuardianField && client.parentGuardianName) {
      setClient(prevClient => ({
        ...prevClient,
        parentGuardianName: '', 
      }));
    }
  }, [showGuardianField]); 

  const generateClient = async () => {
    const response = await fetch('https://mern-stack-crud-3-tables-backend.vercel.app/clients/generate-client'); 
    const data = await response.json();
    // console.log(data);

    // Get the Date without Time
    const clientData = data;
    if (clientData.dateOfBirth) {
      clientData.dateOfBirth = clientData.dateOfBirth.split('T')[0]; 
    }
    setClient(clientData);
  };

  function onSubmit(e) {
    e.preventDefault();

    console.log(client);

    axios.post('https://mern-stack-crud-3-tables-backend.vercel.app/clients/add', client)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    // window.location = '/client';
  }

  return (
    <div>
      <h3>Create New Client</h3>
      <form onSubmit={onSubmit}>
        <button type="button" onClick={generateClient} className="btn btn-secondary">
          Generate a Client
        </button>
        
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

        {/* Additional personal details */}
        <div className="form-group">
          <label>Date of Birth:<RequiredStar>*</RequiredStar></label>
          <input required type="date" name="dateOfBirth" className="form-control" value={client.dateOfBirth} onChange={onChangeClient} />
        </div>

        {showGuardianField && (
          <div className="form-group">
            <label>Parent/Guardian Name (if under 18):<RequiredStar>*</RequiredStar></label>
            <input type="text" name="parentGuardianName" className="form-control" value={client.parentGuardianName} onChange={onChangeClient} />
          </div>
        )}

        <div className="form-group">
          <label>Permission to Leave Message (Y/N):<RequiredStar>*</RequiredStar></label>
          <select name="permissionToLeaveMessage" className="form-control" value={client.permissionToLeaveMessage} onChange={onChangeClient}>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>

        <div className="form-group">
          <label>Gender:<RequiredStar>*</RequiredStar></label>
          <select name="gender" className="form-control" value={client.gender} onChange={onChangeClient}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>

        <div className="form-group">
          <label>Marital Status:<RequiredStar>*</RequiredStar></label>
          <select name="maritalStatus" className="form-control" value={client.maritalStatus} onChange={onChangeClient}>
            <option value="Never Married">Never Married</option>
            <option value="Domestic Partnership">Domestic Partnership</option>
            <option value="Married">Married</option>
            <option value="Separated">Separated</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Referrer:</label>
          <input type="text" name="referrer" className="form-control" value={client.referrer} onChange={onChangeClient} />
        </div>
        
        <div className="form-group">
          <input type="submit" value="Submit Client Information" className="btn btn-primary" />
        </div>
        <Link to="/client" >Back to Client List</Link>
      </form>
    </div>
  )  
}

export default CreateClient;