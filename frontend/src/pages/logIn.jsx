
import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const logIn = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/'); // Navigate to Home page on successful login
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError("An error occurred. Please try again.");
    }
  };


    return (
  <>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  
        <div className="w-1/2 bg-white p-5 rounded shadow">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back!</h1>
          <p className="text-gray-600 mb-8 text-center">Login Using Your UserName and Password</p>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="user-name" className="block mb-1 font-medium">UserName</label>
            <input type="text" id="user-name" placeholder="Enter your UserName" className="w-full p-2 border rounded-md"
             value={username} 
             onChange={(e) => setUsername(e.target.value)}  />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input type="password" id="password" placeholder="Enter Your Password" className="w-full p-2 border rounded-md"
             value={password} 
             onChange={(e) => setPassword(e.target.value)}  />
          </div>
         
          <a href="#" className="text-gray-600 underline text-sm">Forget password?</a>
          {error && <p style={{color: 'red'}}>{error}</p>}
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md mt-8 w-full">Login</button>
          </form>
          <h3>Dont have an Account?</h3>
          <NavLink to={"/ Registration"}><button className="bg-violet-200 hover:bg-purple-500 text-primary px-4 py-2 rounded-md mt-8 w-full">Signup</button></NavLink>
        </div>
      </div>
  
  </>
    );
  }
  
  export default logIn;