import React from "react";
import { NavLink, Link } from "react-router-dom";
import Task from '../assets/task-removebg-preview.png'
import Best from '../assets/best.webp'

export const Home = () => {
    return(
<>
<section className='flex justify-around h-screen bg-gradient-to-tr from-purple-800 to-purple-500'>
            <div className='mt-40 ml-12'>
                <h1 className='lg:font-bold text-[white] lg:text-6xl lg:tracking-wider ssm:font-normal ssm:text-lg mb-6 ssm:flex ssm:flex-col ssm:mr-2'>Take control of<br/>
                 your project and <br/>
                task Effortlessy
                </h1>
                <h4 className='lg:size-6 lg:font-normal lg:text-4xl text-[white] ssm:font-normal ssm:text-base inline mb-4'>Stay on top of every task</h4>
                <div>
                <NavLink to={"/ Registration"}>
        <button className="mt-24 bg-slate-800  hover:bg-rose-400 text-white font-bold py-2 px-6 rounded lg:py-3 lg:px-8 ssm:py-1,5 ssm:px-4 mr-1">
          Create account
        </button>
        </NavLink>
        <NavLink to={'/logIn'}>
        <button className="mt-24 bg-slate-800  hover:bg-rose-400 text-white font-bold py-2 px-6 rounded lg:py-3 lg:px-8 ssm:py-1,5 ssm:px-4 ">
          Log In
        </button>
        </NavLink>
                </div>
                 
            </div>
            <div className="mt-40">
                <img src={Best} alt="hero" className='mr-4 rounded-lg  lg:w-fit lg:h-96 ssm:h-32 ssm:w-36' />
            </div>
            
        </section>
</>
    );
};
