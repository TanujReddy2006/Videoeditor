import React, { useState } from 'react';
import './Addneweditor.css';

function Addneweditor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    image: null,
    type: '',
    extra: ''
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('dob', formData.dob);
    payload.append('image', formData.image);
    payload.append('type', formData.type);
    payload.append('extra', formData.extra);
    fetch('http://localhost:3000/addneweditor',{
      method:'POST',
      body:payload
    }).then(res=>res.json()).then(data=>{
      if(data.success){
        alert("Editor data inserted successfully");
      }
      else{
        alert(data.message);
      }
    })
  };

  return (
    <div className="add-editor-container">
      <h2>Add New Editor</h2>
      <form className="editor-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </label>

        <label>
          Profile Image:
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </label>

        <label>
          Type of Editor:
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
            <option value="thumbnail">Thumbnail</option>
            <option value="shorts">Shorts</option>
          </select>
        </label>

        <label>
          Extra Notes:
          <textarea name="extra" value={formData.extra} onChange={handleChange} placeholder="Any additional info..." />
        </label>

        <button type="submit">Add Editor</button>
      </form>
    </div>
  );
}

export default Addneweditor;
