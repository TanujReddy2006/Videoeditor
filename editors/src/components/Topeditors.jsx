import React, { useEffect, useState } from 'react';
import './Topeditors.css';

function Topeditors() {
  const [editors, setEditors] = useState([]);

  function isadmin() {
    const admin = localStorage.getItem('userid');
    return admin === 'admin';
  }

  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const res = await fetch('http://localhost:3000/alleditors');
        const data = await res.json();
        if (data.success) {
          setEditors(data.editors);
        } else {
          alert(data.message || 'Failed to fetch editors');
        }
      } catch (error) {
        alert('Error fetching editors: ' + error.message);
      }
    };

    fetchEditors();
  }, []);

  return (
    <div>
      <hr />
      <div id='editors-head'>
        <h1>Our Editors</h1>
      </div>
      <div id='alleditors2'>
        <div id="alleditors">
          <div id="all">
            {editors.length > 0 ? (
              editors.map((editor, index) => (
                <div className="editor-card" key={index}>
                  <div id='img1'>
                    <img src={`http://localhost:3000/uploads/${editor.image}`} alt={editor.name} />
                  </div>
                  <hr className="editor-divider" />
                  <div id='details'>
                    <p>{editor.name}</p>
                    <p>{editor.type} Editor</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No editors found</p>
            )}
          </div>
     
        
        </div>
      </div>
    </div>
  );
}

export default Topeditors;
