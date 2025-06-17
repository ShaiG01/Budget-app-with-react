import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LogInForm from './forms/login'
import AppBudget from './backpage/appbudget'

function App() {
  const [mode, setMode] = useState('')
  const [username, setusername] = useState('')
 
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('newUser'))

    if(user?.username){
      setMode('budget')
      setusername(user.username)
      console.log(user)
    }
  })

  return (
    <>
     {/* {FrontPage} */}
     <div className="overflow-hidden bg-linear-to-b from-transparent to-blue-300 frontPage flex-col w-screen h-screen flex justify-center items-center gap-[2vw] text-shadow-lg">
      <b><h1 className="header text-blue-500 text-[7vw]">My Budget App</h1></b>
      <button onClick={()=>{setMode('login')}} className="frontPageButton  text-blue-700 bg-white shadow-md px-[5vw] py-[1vw] rounded cursor-pointer hover:bg-yellow-500 transition duration-300 ease">Log in</button>
      <button onClick={()=>{setMode('signup')}} className="frontPageButton  text-blue-700 bg-white shadow-md px-[4vw] py-[1vw] rounded cursor-pointer hover:bg-yellow-500 transition duration-300 ease">Get Started</button>
      <LogInForm mode={mode}></LogInForm>
      
     
     </div>

     {/* {Backpage} */}
     <div className={`w-screen h-screen absolute top-0 ${mode === 'budget' ? 'pointer-events-all' : 'pointer-events-none'}`}>
     <AppBudget mode={mode} username={username}></AppBudget>
</div>
    </>
  )
}

export default App
