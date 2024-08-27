import React from 'react'
import { NavLink } from 'react-router-dom';

const logIn = () => {
    return (
  <>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-1/2 bg-white p-5 rounded shadow">
          <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back!</h1>
          <p className="text-gray-600 mb-8 text-center">Login Using Your UserName and Password</p>
          <div className="mb-4">
            <label htmlFor="user-name" className="block mb-1 font-medium">UserName</label>
            <input type="user-name" id="user-name" placeholder="Enter your UserName" className="w-full p-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input type="password" id="password" placeholder="Enter Your Password" className="w-full p-2 border rounded-md" />
          </div>
         
          <a href="#" className="text-gray-600 underline text-sm">Forget password?</a>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md mt-8 w-full">Login</button>
          <h3>Dont have an Account?</h3>
          <NavLink to={"/ Registration"}><button className="bg-violet-200 hover:bg-purple-500 text-primary px-4 py-2 rounded-md mt-8 w-full">Signup</button></NavLink>
        </div>
      </div>
  
  </>
    );
  }
  
  export default logIn;