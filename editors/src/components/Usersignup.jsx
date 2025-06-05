import React, { useState } from 'react';
import './Userlogin.css';

function Usersignup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('Signup successful!');
          window.location.href = '/Userlogin';
        } else {
          alert(data.message || 'Signup failed');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Server error');
      });
  };

  const handleLoginRedirect = () => {
    window.location.href = '/Userlogin';
  };

  return (
    <div id="forrm2">
      <div id="forrm1">
        <form onSubmit={handleSignup}>
          <h2>User Signup</h2>

          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Signup</button>

          <div id="sign">
            <h4>Already have an account?</h4>
            <button type="button" onClick={handleLoginRedirect}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Usersignup;
