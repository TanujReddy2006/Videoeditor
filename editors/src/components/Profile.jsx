import React, { useEffect, useState } from 'react';
import pr from './pr.jpg';
import './Profile.css';

function Profile() {
  const [editing,setEditing]=useState(false)
  const [data, Setdata] = useState({
    name: '',
    email: '',
    dob: '',
    loc: '',
    imageUrl: pr,
  });

  function handleChange(e) {
    const userid = localStorage.getItem('userid');
    let { name, value } = e.target;
    let username=document.getElementById('name').value;
    Setdata({ ...data, [name]: value });
    
  }
  
function handleSave(e) {
  e.preventDefault();
  setEditing(false)
  const userid = localStorage.getItem('userid');
  const { name } = data;

  fetch('http://localhost:3000/profileupdate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: name, userid: userid }),
  })
    .then(res => {
      if (!res.ok) throw new Error("Failed to update");
      return res.json();
    })
    .then(data => {
      if (data.success) {
        alert('Updated successfully');
        setEditing(false);
      } else {
        alert('Error while updating');
      }
    })
    .catch(err => {
      console.error('Update Error:', err);
      alert('Server error while updating');
    });
}
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        Setdata({ ...data, imageUrl: reader.result });
        localStorage.setItem('profileImage', reader.result);
      };
    }
  }

  useEffect(() => {
    const userid = localStorage.getItem('userid');
    fetch(`http://localhost:3000/fetch/${userid}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          Setdata({ 
            name: data.name, 
            email: data.email,
            imageUrl: localStorage.getItem('profileImage') || pr
          });
        } else {
          alert('Error while fetching data');
        }
      });
  }, []);

  return (
    <div id='p5'>
      <h1>Profile</h1>
      <div id='p1'>
        <div id='p2'>
          <div id='p3'>
            <img 
              src={data.imageUrl} 
              alt="Profile" 
              
              onClick={() =>{ if (editing){document.getElementById('fileInput').click()}}} 
            />
            <input 
              type="file" 
              id="fileInput" 
              style={{ display: 'none' }} 
              accept="image/*" 
              onChange={handleImageUpload} 
            />
          </div>
          <div id='p4'>
            <form>
              <div id='okati'>
                <label htmlFor="name">Name</label><span></span>
                <input type="text" name="name" id="name" value={data.name} onChange={handleChange} disabled={!editing}/>
              </div>
              <div id='okati'>
                <label htmlFor="email">Email</label><span></span>
                <input type="text" name="email" id="email" value={data.email} onChange={handleChange} disabled/>
              </div>
              <div id='okati'>
                <label htmlFor="dob">DOB</label><span></span>
                <input type="date" name="dob" id="dob" value={data.dob} onChange={handleChange} disabled={!editing}/>
              </div>
              <div id='okati'>
                <label htmlFor="loc">Location</label><span></span>
                <input type="text" name="loc" id="loc" value={data.loc} onChange={handleChange} disabled={!editing}/>
              </div>
              <div id='butts'>
                  {editing ? <button  onClick={handleSave}>Save</button> : <button onClick={(e)=>{ e.preventDefault(); setEditing(true)}} >Edit</button>}
                <button type='button' onClick={() => {
                  localStorage.removeItem('userid');
                  window.location.href='/home';
                }}>Logout</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;