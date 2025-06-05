import React from 'react'
import './User.css'
import { useNavigate } from 'react-router-dom';

function User() {
  const navigate = useNavigate();
  return (
    <div id='main2'>
      <div id='main1'>
        <h1>Welcome To EditPro </h1>
        <h3>You can login as a User, or Admin</h3>
        <div id='main'> 
          <button id='Admin' onClick={() => navigate('/Adminlogin')}>
            Admin
          </button>
          <button id='User' onClick={() => navigate('/Userlogin')}>
            User
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default User;