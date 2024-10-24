import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ username: "", password: "" });

  const validateForm = () => {
    let valid = true;
    let newErrors = { username: "", password: "" };

    if (!USER_REGEX.test(username)) {
      newErrors.username = "Username must be 4-24 characters long and start with a letter.";
      valid = false;
    }
    if (!PWD_REGEX.test(password)) {
      newErrors.password = "Password must be 8-24 characters long and include upper/lowercase letters, a number, and a special character.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('https://to-do-list-app-6-lrky.onrender.com/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/Homelist');
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-1/2 p-3 bg-white rounded shadow">
          <h1 className="mb-2 text-3xl font-bold text-center">Register</h1>
          <p className="mb-8 text-center text-gray-600">Create your new account with TDList</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="userName" className="block mb-1 font-medium">User-Name</label>
              <input 
                type="text" 
                id="userName" 
                placeholder="Enter Your New UserName" 
                className="w-full p-2 border rounded-md" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
            </div>
            <p className="text-red-600">{errors.username}</p>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter Your E-mail" 
                className="w-full p-2 border rounded-md" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-1 font-medium">Password</label>
              <input 
                type="password" 
                id="password" 
                placeholder="Create Your Password" 
                autoComplete='off' 
                className="w-full p-2 border rounded-md" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <p className="text-red-600">{errors.password}</p>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block mb-1 font-medium">Confirm Password</label>
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="Confirm password" 
                className="w-full p-2 border rounded-md" 
              />
            </div>
            <div className="flex items-center mb-4">
              <input type="checkbox" id="keep-signed-in" className="mr-2" />
              <label htmlFor="keep-signed-in">Remember my password</label>
            </div>
            <button type='submit' className="w-full px-4 py-2 mt-8 text-black bg-purple-500 rounded-md">Register</button>
          </form>
          <h3 className="mt-4">Already have an Account?</h3>
          <NavLink to={'/logIn'}>
            <button className="w-full px-4 py-2 mt-8 rounded-md bg-violet-200 hover:bg-purple-500 text-primary">Log-In</button>
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Registration;
