import React from 'react';
import axios from 'axios';
import {useState, useRef} from 'react';

function CreateUser(){
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);


  function onChangeFirstname() {
    setFirstname(firstnameRef.current.value);
    console.log(firstname);
  }

  function onChangeLastname() {
    setLastname(lastnameRef.current.value);
    console.log(lastname);
  }

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      fname: firstname,
      lname: lastname
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    setFirstname('');
    setLastname('');
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>First name: </label>
          <input  type="text"
              required
              className="form-control"
              value = {firstname}
              ref = {firstnameRef}
              onChange={onChangeFirstname}
              />
        </div>
        <div className="form-group"> 
          <label>Last name: </label>
          <input  type="text"
              required
              className="form-control"
              value = {lastname}
              ref = {lastnameRef}
              onChange={onChangeLastname}
              />
        </div>
        <div className="form-group">
          <input type="submit" value="Create User" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
}
export default CreateUser;