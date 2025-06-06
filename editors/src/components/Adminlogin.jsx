import React, { useState } from 'react';
import './Adminlogin.css';

function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Logged in as Admin');
          localStorage.setItem('userid','admin')
          window.location.href='/home'
        } else {
          alert(data.message || 'Login failed');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error');
      });
  };

  return (
    <div id='form2'>
      <div id='form1'>
        <form onSubmit={handleSubmit}>
          <h2>Admin Login</h2>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;
