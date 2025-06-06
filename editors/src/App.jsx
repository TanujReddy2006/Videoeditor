import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './components/User'
import Adminlogin from './components/Adminlogin'
import Userlogin from './components/Userlogin'
import Usersignup from './components/Usersignup'
import Nav from './components/Nav'
import Start from './components/Start'
import Types from './components/Types'
import Editors from './components/Editors'
import Addneweditor from './components/Addneweditor'
import Profile from './components/Profile'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<User/>}/>
      <Route path='/Adminlogin' element={<Adminlogin/>}/>
      <Route path='/Userlogin' element={<Userlogin/>}/>
      <Route path='/Usersignup' element={<Usersignup/>}/>
      <Route path='/Home' element={<><Nav/><Start/><Types/></>}/>
      <Route path='/Admin/Home' element={<Nav/>}/>
      <Route path='/alleditors' element={<><Nav/><Editors/></>}/>
      <Route path='/aboutus' element={<Nav/>}/>
      <Route path='/profile' element={<><Nav/> <Profile/></>}/>
      <Route path='/alleditors/addnew' element={<><Nav/><Addneweditor/></>}/>
    </Routes>
    
    </BrowserRouter>
    </>
  )
}

export default App