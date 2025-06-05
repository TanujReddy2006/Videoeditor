import React, { useEffect, useState } from 'react'
import pr from './pr.jpg'
import './Profile.css'
function Profile() {
  const [data,Setdata]=useState({
    name:'',
    email:'',
    dob:'',
    loc:''
  })
  function handleChange(e){
    const {name,value}=e.target;
    Setdata({...data,[name]:value})
  }
  useEffect(()=>{
    const userid=localStorage.getItem('userid');
    fetch(`http://localhost:3000/fetch/1`,{
      method:'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(res=>res.json()).then(data=>{
      if (data.success){
        Setdata({
          name:data.name,
          email:data.email
        })
      }
      else{
        alert('error while fetching data')
      }
    })
  })
  return (
    <div id='p5'>
        <h1>Profile</h1>
        <div id='p1'>
            <div id='p2'>
              <div id='p3'>
                <img src={pr} alt="" />
              </div>
              <div id='p4'>
                <form>
                    <div id='okati'>
                        <label htmlFor="name">Name</label><span></span>
                        <input type="text" name="name" id="name" value={data.name}  onChange={handleChange}/>
                    </div >
                     <div id='okati' >
                        <label htmlFor="email">Email</label><span></span>
                        <input type="text" name="email" id="email" value={data.email}  onChange={handleChange}/>
                    </div> <div id='okati'>
                        <label htmlFor="dob">dob</label><span></span>
                        <input type="date" name="dob" id="dob" value={data.dob}  onChange={handleChange} />
                    </div> <div id='okati'>
                        <label htmlFor="loc">Location</label><span></span>
                        <input type="loc" name="loc" id="loc" value={data.loc}  onChange={handleChange}/>
                    </div>
                      <div id='butts'>
                        <button type='reset'>Edit </button>
                        <button type='submit'>Save</button>
                      </div>

                </form>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
