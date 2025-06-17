import React, { useState, useEffect } from 'react';

function LogInForm(props) {
  const [form, setForm] = useState('');
  const [passwordInput, setPasswordInput] = useState('')
  const [email, setEmail] = useState('')
  const [userName, setUsername] = useState('')
  
  function SetUser(){
    const user = {username: userName,
                email: email,
                password: passwordInput,
            
                }
    localStorage.setItem('newUser', JSON.stringify(user))

    setTimeout(()=>{
        window.location.reload();
    }, 3000)
  }

  useEffect(() => {
    setForm(props.mode);
  }, [props.mode]);

  return (
    <>
      <div className={`gap-5 bg-gradient-to-b from-blue-200 to-blue-500 flex flex-col justify-center items-center scale-0 absolute w-screen h-screen transition duration-1000 ease-in-out ${props.mode === 'login' || props.mode === 'signup' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}> 

        {/* LOGIN FORM */}
        <div className={`opacity-0 absolute w-screen h-screen flex justify-center items-center flex-col transition duration-500 ease-in-out ${form === 'signup' ? 'translate-x-[-100%] opacity-0' : 'translate-x-0 opacity-100'}`}>
          <h1 className="text-[5vw] text-white">Log in</h1>
          <div className="p-5 loginForm w-[30vw] h-auto bg-white shadow-lg rounded">
            <label className="text-blue-500 text-[2vw]">Username/Email:</label>
            <input type="text" required className="text-gray-400 p-2 w-full h-[3vw] bg-gray-200 rounded" />
            <label className="text-blue-500 text-[2vw]">Password:</label>
            <input type="password" required className="text-gray-400 p-2 w-full h-[3vw] bg-gray-200 rounded" />
            <h3 className="mt-3 text-gray-500 cursor-pointer">Forgot Password?</h3>
            <button className="formButton mb-2 text-blue-200 w-full h-[3vw] bg-blue-500 mt-5 rounded hover:bg-blue-400">Submit</button>
          </div>
        </div>

        {/* SIGNUP FORM */}
        <div className={`opacity-0 absolute w-screen h-screen flex justify-center items-center flex-col transition duration-500 ease-in-out ${form === 'signup' ? 'translate-x-0 opacity-100' : 'opacity-0 translate-x-[100%]'}`}>
          <h1 className="text-[5vw] text-white">Sign up</h1>
          <div className="signUpForm p-5 loginForm w-[30vw] h-auto bg-white shadow-lg rounded">
            <label className="text-blue-500 text-[1.5vw]">Username:</label>
            <input onChange={(e)=> setUsername(e.target.value)} type="text" required className="text-gray-400 p-2 w-full h-[3vw] bg-gray-200 rounded" />
             <label  className="text-blue-500 text-[1.5vw]">Email:</label>
            <input onChange={(e)=> setEmail(e.target.value)} type="email" required className="text-gray-400 p-2 w-full h-[3vw] bg-gray-200 rounded" />
            <label className="text-blue-500 text-[1.5vw]">Password:</label>
            <input onChange={(e)=>{setPasswordInput(e.target.value)}} required  type="password" className="text-gray-400 p-2 w-full h-[3vw] bg-gray-200 rounded" />
            <button onClick= {SetUser} disabled={passwordInput.length > 6 && email !== '' && userName !== '' ? false : true} 
            className={`SignFormButton text-blue-200 mt-10 w-full h-[3vw] bg-blue-300 rounded hover:bg-blue-400 ${passwordInput.length > 6 && email !== '' && userName !== '' ? 'bg-blue-500' : 'bg-blue-300'}`}>
                Submit</button>
            <h3 className="mt-5 text-center">{passwordInput.length > 0 && passwordInput.length < 6 ? 'Password must be at least 6 characters' : ''}</h3>
          </div>
        </div>

         <h3
          onClick={() => setForm(form === 'login' ? 'signup' : 'login')}
          className="instead absolute bottom-[3vw] text-white cursor-pointer hover:text-gray-200"
        >
          {form === 'login' ? 'Sign up instead' : form === 'signup' ? 'Log in instead' : 'Sign up instead'}
       
        </h3>

      </div>
    </>
  );
}

export default LogInForm;
