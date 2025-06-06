import React from 'react';
import logo from './logo.jpg'; 
import './nav.css'

function Nav() {
  const userlogined=localStorage.getItem('userid')
   function isadmin(){
      const admin=localStorage.getItem('userid');
      if(admin==='admin'){
        return true;
      }
      else{
        return false;
      }
  }
  return (
    <div id='back1'>
      <nav className="navbar">
        <div className="nav-left">
          <img src={logo} alt="EditPro Logo" className="logo" />
        </div>
        <div className="nav-right">
          <a id='home' href="/home">Home</a>
          <a  id='aboutus' href="/aboutus">About Us</a>
          <a  id='alleditors 'href='/alleditors'>Editors</a>
          {
          (userlogined)&&!isadmin()?
          <a  id='profile' href="/profile">Profile</a>
          :
            <button onClick={()=>{window.location.href='/userlogin'}}>Create Account</button>}
        </div>
      </nav>
    </div>
  );
}

export default Nav;
