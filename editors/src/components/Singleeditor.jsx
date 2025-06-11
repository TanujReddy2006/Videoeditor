import React, { useEffect, useState } from 'react'
import './Singleeditor.css'
import { useParams } from 'react-router-dom'
function Singleeditor() {
   const {id}=useParams()
    const [editor,setEditor]=useState([])
    
    useEffect(()=>{
        fetch(`http://localhost:3000/editor/${id}`,{
            method:'GET',
            headers: { 'Content-Type': 'application/json' },
        }).then(res=> res.json()).then(data=>{
            if(data.success){
                 setEditor(data.result[0]);
                 console.log(data.result)
            }
            else{
                alert('error while fetching data')
            } 
        })
    },[id])
    function handlecontact(){
      let editorid=id;
      let userid=localStorage.getItem('userid');
      let message="you have to edit my video";
      fetch('http://localhost:3000/reqcontact',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({editorid:editorid,userid:userid,message:message})
      }).then(res=>res.json()).then(data=>{
        if(data.success){
          alert('Requested Successfully');
        }
        else{
          alert(data.message);
        }
      })
    }
  return (
  <div className="editor-details-wrapper">
    {editor ? (
      <div className="editor-profile-card">
        <div className="editor-image-section">
          <img
            src={`http://localhost:3000/uploads/${editor.image}`}
            alt={editor.name}
            className="editor-image"
          />
        </div>
        <div className="editor-info-section">
          <h2 className="editor-name">{editor.name}</h2>
          <p className="editor-type">{editor.type} Editor</p>
          <p className="editor-dob">
            <strong>Date of Birth:</strong> {new Date(editor.dob).toLocaleDateString()}
          </p>
          <p className="editor-extra">
            <strong>About:</strong> {editor.extra}
          </p>
          <div className="editor-contact">
            <p><strong>Email:</strong> {editor.email}</p>
            <p><strong>Phone:</strong> {editor.phone}</p>
          </div>
          <a onClick={handlecontact}
            className="contact-editor-button"
          >
            Contact Editor
          </a>
        </div>
      </div>
    ) : (
      <p className="loading-message">Loading editor details...</p>
    )}
  </div>

);

}

export default Singleeditor
