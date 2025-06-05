import React, { useState } from 'react';
import './Userlogin.css';

function Userlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Login successful!');
          localStorage.setItem('userid',data.userid)
          console.log(data.userid)
          window.location.href='/profile'
        } else {
          alert(data.message || 'Login failed');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Server error');
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/auth/google';
  };

  const handleMicrosoftLogin = () => {
    window.location.href = 'http://localhost:3000/auth/microsoft';
  };

  const handleSignup = () => {
    window.location.href = '/Usersignup';
  };

  return (
    <div id="forrm2">
      <div id="forrm1">
        <form onSubmit={handleEmailLogin}>
          <h2>User Login</h2>
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
          <div id='login'>
            <button type="submit">Login</button>
            <button type="button" onClick={handleGoogleLogin}>Login with Google</button>
            <button type="button" onClick={handleMicrosoftLogin}>Login with Microsoft</button>
            <div id='sign'>
              <h4>No Account..?</h4>
              <button type="button" onClick={handleSignup}>Signup</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Userlogin;
