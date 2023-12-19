import React, { Component } from 'react';
import axios from 'axios';
import {useState, useRef} from 'react';

function CreateUser(){
  const [username, setUsername] = useState('');
  const usernameRef = useRef(null);


  function onChangeUsername() {
    setUsername(usernameRef.current.value);
    console.log(username);
  }

  function onSubmit(e) {
    e.preventDefault();

    const user = {
      username: username
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    setUsername('');
  }

  return (
    <div>
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <input  type="text"
              required
              className="form-control"
              ref = {usernameRef}
              onChange={onChangeUsername}
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