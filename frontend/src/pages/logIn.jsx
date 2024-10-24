import { NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogIn = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://to-do-list-app-3-c106.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully Logged In",
          showConfirmButton: false,
          timer: 1500
        });
        localStorage.setItem('userId', data.userId);
        onLogin(data.userId);
        navigate('/Homelist'); 
      } else {
        const data = await response.json(); // Fetch the error message
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
        <div className="w-1/2 p-5 bg-white rounded shadow">
          <h1 className="mb-2 text-3xl font-bold text-center">Welcome Back!</h1>
          <p className="mb-8 text-center text-gray-600">Login Using Your UserName and Password</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="user-name" className="block mb-1 font-medium">UserName</label>
              <input 
                type="text" 
                id="user-name" 
                placeholder="Enter your UserName" 
                className="w-full p-2 border rounded-md"
                value={username} 
                onChange={(e) => setUsername(e.target.value)}  
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Enter Your Password" 
                className="w-full p-2 border rounded-md"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}  
              />
            </div>
            <a href="#" className="text-sm text-gray-600 underline">Forgot password?</a>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button className="w-full px-4 py-2 mt-8 text-white bg-purple-500 rounded-md">Login</button>
          </form>
          <h3>Don't have an Account?</h3>
          <NavLink to={"/Registration"}>
            <button className="w-full px-4 py-2 mt-8 rounded-md bg-violet-200 hover:bg-purple-500 text-primary">Signup</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default LogIn;
