import React, { useEffect, useState } from 'react'
import './Singleeditor.css'
import { useParams } from 'react-router-dom'
function Singleeditor() {
    const [editor,setEditor]=useState([])
    
    const {id}=useParams()
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
          <a
            href={`mailto:${editor.email}?subject=Contacting you via Editor Platform`}
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
