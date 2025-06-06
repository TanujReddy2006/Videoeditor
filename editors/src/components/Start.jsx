import React from 'react';
import home from './start1.jpg';
import './Start.css';

function Start() {
  return (
    <div id="st3">
      <div id="st2">
        <div id="st1">
          <div className="text-container">
            <h1>Welcome to Editpro</h1>
            <p>Contact Best Editors
            </p>
            <div id="clk">Click Me</div>
          </div>
          <img src={home} alt="Editor Theme" className="home-img" />
        </div>
      </div>
    </div>
  );
}

export default Start;
