import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';
import styled from 'styled-components';

// Create a styled span for the red asterisk
const RequiredStar = styled.span`
  color: red;
`;

function CreateTherapist() {
  const [therapist, setTherapist] = useState({
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
    }
  });

  // Handler for changes 
  function onChangeTherapist(e){
    const { name, value } = e.target;
    if (name.startsWith("homeAddress.")) {
      setTherapist(prevTherapist => ({
        ...prevTherapist,
        homeAddress: {
          ...prevTherapist.homeAddress,
          [name.split(".")[1]]: value
        }
      }));
    } else {
      setTherapist(prevTherapist => ({
        ...prevTherapist,
        [name]: value
      }));
    }
  };

  const generateTherapist = async () => {
    const response = await fetch('http://localhost:5000/therapists/generate-therapist'); // 确保URL与你的后端路由匹配
    const data = await response.json();
    console.log(data);
    setTherapist(data);
  };

  function onSubmit(e) {
    e.preventDefault();

    console.log(therapist);

    axios.post('http://localhost:5000/therapists/add', therapist)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    window.location = '/therapist';
  }

  return (
    <div>
      <h3>Create New Therapist</h3>
      <form onSubmit={onSubmit}>
        <button type="button" onClick={generateTherapist} className="btn btn-secondary">Generate a Therapist</button>
        {/* Therapist Information */}
        <div className="form-group">
          <label>Title:<RequiredStar>*</RequiredStar> </label>
          <select
            required
            name="title"
            className="form-control"
            value={therapist.title}
            onChange={onChangeTherapist}
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
        {therapist.title === 'Other' && (
          <div className="form-group"> 
            <label>Title Other: </label>
            <input
              type="text"
              name="titleOther"
              className="form-control" 
              value={therapist.titleOther} 
              onChange={onChangeTherapist}
            />
          </div>
        )}
        <div className="form-group"> 
          <label>First Name:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="firstName"
            className="form-control" 
            value={therapist.firstName} 
            onChange={onChangeTherapist}
          />
        </div>
        <div className="form-group"> 
          <label>Last Name:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="surName"
            className="form-control" 
            value={therapist.surName} 
            onChange={onChangeTherapist}
          />
        </div>
        <div className="form-group"> 
          <label>Phone Number:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="phoneNumber"
            className="form-control" 
            value={therapist.phoneNumber} 
            onChange={onChangeTherapist} 
          />
        </div>
        <div className="form-group"> 
          <label>Email:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="email"
            name="email"
            className="form-control" 
            value={therapist.email} 
            onChange={onChangeTherapist}
          />
        </div>

        {/* Address Fields */}
        <div className="form-group">
          <label>Address Line 1:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.addressLine1"
            className="form-control"
            value={therapist.homeAddress.addressLine1}
            onChange={onChangeTherapist}
          />
        </div>
        <div className="form-group">
          <label>Address Line 2:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.addressLine2"
            className="form-control"
            value={therapist.homeAddress.addressLine2}
            onChange={onChangeTherapist}
          />
        </div>
        <div className="form-group">
          <label>Town:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.town"
            className="form-control"
            value={therapist.homeAddress.town}
            onChange={onChangeTherapist}
          />
        </div>
        <div className="form-group">
          <label>County/City:<RequiredStar>*</RequiredStar> </label>
          <input required
            type="text"
            name="homeAddress.countyCity"
            className="form-control"
            value={therapist.homeAddress.countyCity}
            onChange={onChangeTherapist}
          />
        </div>
        <div className="form-group">
          <label>Eircode: </label>
          <input
            type="text"
            name="homeAddress.eircode"
            className="form-control"
            value={therapist.homeAddress.eircode}
            onChange={onChangeTherapist}
          />
        </div>
        
        <div className="form-group">
          <input type="submit" value="Create Therapist" className="btn btn-primary" />
        </div>
        <Link to="/therapist" >Back to Therapist List</Link>
      </form>
    </div>
  )  
}

export default CreateTherapist;