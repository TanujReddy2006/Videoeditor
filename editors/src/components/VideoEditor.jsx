import React, { useEffect, useState } from 'react';
import './Editors.css';
import pr from './pr.jpg';
import ph from './ph1editor3.jpg'

function VideoEditor() {
  const [editors, setEditors] = useState([]);

  function isadmin(){
      const admin=localStorage.getItem('userid');
      if(admin==='admin'){
        return true;
      }
      else{
        return false;
      }
  }

  useEffect(() => {
    const fetchEditors = async () => {
      try {
        const res = await fetch('http://localhost:3000/videoeditors');
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
    <div id='box1'>
      <div id='box2'>
        <ul>
        <li onClick={()=>window.location.href='/alleditors'}>All Editors</li>
         <li onClick={()=>window.location.href='/Photoeditors'}>Photo Editor</li>
        <li onClick={()=>window.location.href='/Videoeditors'}>Video Editor</li>
        <li onClick={()=>window.location.href='/Thumbnaileditors'}>Thumbnail Editor</li>
       <li onClick={()=>window.location.href='/Shortseditors'}>Shorts Editor</li>
        </ul>
      </div>
      <div id='alleditors2'>
        <div id="alleditors">
          <div id="all">
            {editors.length > 0 ? (
              editors.map((editor, index) => (
                <div className="editor-card" key={index}>
                  <div id='img1'><img src={`http://localhost:3000/uploads/${editor.image}`} alt={editor.name} /></div>
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
          <div id="addneweditor" onClick={() => window.location.href = '/alleditors/addnew'}>
            { isadmin()?<h1>+Add</h1>:<></>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoEditor;
