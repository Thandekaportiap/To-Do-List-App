import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const registration = () => {

  
  
    return (
  <>
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="w-1/2 p-3 bg-white rounded shadow">
          <h1 className="mb-2 text-3xl font-bold text-center">Register</h1>
          <p className="mb-8 text-center text-gray-600">Create your new account with TDList</p>
          <div className="mb-4">
            <label htmlFor="userName" className="block mb-1 font-medium">User-Name</label>
            <input type="text" id="userName" placeholder="Enter Your New UserName" className="w-full p-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">Email Address</label>
            <input type="email" id="email" placeholder="Enter Your E-mail" className="w-full p-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input type="password" id="password" placeholder="Create Your Password" className="w-full p-2 border rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm password" className="block mb-1 font-medium">Confirm Password</label>
            <input type="password" id="confirm password" placeholder="confirm password" className="w-full p-2 border rounded-md" />
          </div>
          <div className="flex items-center mb-4">
            <input type="checkbox" id="keep-signed-in" className="mr-2" />
            <label htmlFor="keep-signed-in">Remember my password</label>
          </div>
          
          <button className="w-full px-4 py-2 mt-8 text-black bg-purple-500 rounded-md">Register</button>
          <h3>Already have an Account?</h3>
          <NavLink to={'/logIn'}><button className="w-full px-4 py-2 mt-8 rounded-md bg-violet-200 hover:bg-purple-500 text-primary">Log-In</button></NavLink>
        </div>
      </div>
  
  </>
    );
  }
  
  export default registration;