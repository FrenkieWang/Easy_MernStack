import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

// Create a styled span for the red asterisk
const RequiredStar = styled.span`
  color: red;
`;

function CreateSession() {
  const [session, setSession] = useState({
    sessionDate: '',
    sessionTime: '',
    clients: [],
    therapist: '',
    fee: '',
    sessionNumber: '',
    sessionAttendance: '',
    sessionType: '',
    sessionTypeOther: '',
    sessionNotes: ''
  });

  const [allTherapists, setTherapists] = useState([]); // 新状态来存储Therapist数据
  const [allClients, setClients] = useState([]); // 新状态来存储Client数据

  useEffect(() => {
    // 组件加载时获取Client数据
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:5000/clients/');
        setClients(response.data); // 假设response.data是Client数组
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []); // 空依赖数组意味着这个effect只会在组件加载时运行一次

  useEffect(() => {
    // 组件加载时获取Therapist数据
    const fetchTherapists = async () => {
      try {
        const response = await axios.get('http://localhost:5000/therapists/');
        setTherapists(response.data); // 假设response.data是Therapist数组
      } catch (error) {
        console.error('Error fetching therapists:', error);
      }
    };

    fetchTherapists();
  }, []); // 空依赖数组意味着这个effect只会在组件加载时运行一次

  // Handler for changes 
  function onChangeSession(e){
    const { name, value, checked } = e.target;

    if (name === "clients") {
      if (checked) {
        // 添加客户ID到数组中
        setSession(prevSession => ({
          ...prevSession,
          clients: [...prevSession.clients, {
            _id: value,
            firstName: allClients.find(c => c._id === value).firstName,
            lastName: allClients.find(c => c._id === value).lastName
        }]
        }));
      } else {
        // 从数组中移除客户ID
        setSession(prevSession => ({
          ...prevSession,
          clients: prevSession.clients.filter(client => client._id !== value)
        }));
      }
    // 处理Therapist 勾选...
    } else if (name === "therapist"){
      // 查找选中的治疗师对象
      setSession(prevSession => ({
        ...prevSession,
        therapist: {
          _id: value,
          firstName: allTherapists.find(t => t._id === value).firstName,
          lastName: allTherapists.find(t => t._id === value).lastName
        }
      }));
    // 处理其他输入字段...
    } else {  
      setSession(prevSession => ({
        ...prevSession,
        [name]: value
      }));    
    }
  };

  function onSubmit(e) {
    e.preventDefault();

    // 准备提交的数据，确保只包含 ObjectId 字符串数组
    const submitData = {
      ...session,
      therapist: session.therapist._id , // 确保总是发送 therapist 的 _id
      clients: session.clients.map(client => client._id)  // 仅发送客户的 ObjectId
    };

    console.log(submitData);

    axios.post('http://localhost:5000/sessions/add', submitData)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));

    window.location = '/session';
  }

  return (
    <div>
      <h3>Create New Session</h3>
      <form onSubmit={onSubmit}>
        
        {/* Session Information */}        
        <div className="form-group">
          <label>Session Date:<RequiredStar>*</RequiredStar> </label>
          <input 
            required
            type="date" 
            name="sessionDate" 
            value={session.sessionDate} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Session Time:<RequiredStar>*</RequiredStar> </label>
          <input 
            required
            type="time" 
            name="sessionTime" 
            value={session.sessionTime} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        {/* Select clients -- checkbox */}
        <div className="form-group">
          <label>Clients:<RequiredStar>*</RequiredStar> </label>
          {allClients.map(c => (
            <div key={c._id}>
              <input
                type="checkbox"
                name="clients"
                value={c._id}
                onChange={onChangeSession}
                checked={session.clients.includes(c._id)}
                // 如果已选中的复选框数量达到3个且当前复选框未被选中，则禁用该复选框
                disabled={session.clients.length >= 3 
                  && !session.clients.includes(c._id)}
              />
              {c.firstName + " " + c.surName}
            </div>
          ))}
        </div>

        {/* Select Therapist -- radio box */}
        <div className="form-group">
          <label>Therapist:<RequiredStar>*</RequiredStar> </label>
          {allTherapists.map(t => (
            <div key={t._id}>
              <input
                type="radio"
                name="therapist"
                value={t._id}
                onChange={onChangeSession}
                checked={session.therapist._id === t._id}
              />
              {t.firstName + " " + t.surName}
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>Fee (€): </label>
          <input 
            type="number" 
            name="fee" 
            value={session.fee} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Session Number:<RequiredStar>*</RequiredStar> </label>
          <input 
            required
            type="number" 
            name="sessionNumber" 
            value={session.sessionNumber} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Session Attendance:<RequiredStar>*</RequiredStar> </label>
          <select 
            required
            name="sessionAttendance" 
            value={session.sessionAttendance} 
            onChange={onChangeSession} 
            className="form-control"
          >
            <option value="">Select Attendance</option>
            <option value="Attended">Attended</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No Show">No Show</option>
          </select>
        </div>

        <div className="form-group">
          <label>Session Type:<RequiredStar>*</RequiredStar> </label>
          <select 
            required
            name="sessionType" 
            value={session.sessionType} 
            onChange={onChangeSession} 
            className="form-control"
          >
            <option value="">Select Type</option>
            <option value="Intake">Intake</option>
            <option value="Psychotherapy">Psychotherapy</option>
            <option value="Assessment">Assessment</option>
            <option value="Other">Other (specify below)</option>
          </select>
        </div>

        {session.sessionType === 'Other' && (
          <div className="form-group">
            <label>Specify Other Session Type:<RequiredStar>*</RequiredStar> </label>
            <input 
              required
              type="text" 
              name="sessionTypeOther" 
              value={session.sessionTypeOther} 
              onChange={onChangeSession} 
              className="form-control"
            />
          </div>
        )}

        <div className="form-group">
          <label>Session Notes:<RequiredStar>*</RequiredStar> </label>
          <textarea 
            required
            name="sessionNotes" 
            value={session.sessionNotes} 
            onChange={onChangeSession} 
            className="form-control"
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Create Session" className="btn btn-primary" />
        </div>
        <Link to="/session" >Back to Session List</Link>
      </form>
    </div>
  )  
}

export default CreateSession;