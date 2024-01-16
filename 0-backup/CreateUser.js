import React from 'react';
import axios from 'axios';
import {useState, useRef} from 'react';

function CreateUser(){
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);


  function onChangeFirstname() {
    setFirstname(firstnameRef.current.value);
  }

  function onChangeLastname() {
    setLastname(lastnameRef.current.value);
  }

  function onChangeEmail() {
    setEmail(emailRef.current.value);
  }

  function onChangePassword() {
    setPassword(passwordRef.current.value);
  }

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      fname: firstname,
      lname: lastname,
      email: email,
      password: password
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
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
          <label>Email Address: </label>
          <input  type="email"
              required
              className="form-control"
              value = {email}
              ref = {emailRef}
              onChange={onChangeEmail}
          />
        </div>
        <div className="form-group"> 
          <label>Password: </label>
          <input  type="password"
              required
              className="form-control"
              value = {password}
              ref = {passwordRef}
              onChange={onChangePassword}
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