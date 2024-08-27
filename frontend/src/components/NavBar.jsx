import React, { useState } from 'react'; // Import React and useState hook
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Import menu icons
import { NavLink } from 'react-router-dom';
import Logo  from '../assets/logo.jfif'

const Navbar = () => {
    // State to handle the navbar's open/close status
    const [openNav, setOpenNav] = useState(true);

    // Function to toggle the navbar's visibility
    const ToggleNavBar = () => {
        setOpenNav(!openNav);
    };

    return (
        <>
            {/* Main Navigation Bar */}
            <nav className='bg-purple-700 " text-white w-full flex justify-between items-center h-20 mx-auto px-5'>
                
                {/* Logo */}
                {/* <img src={Logo} alt="" style={{width:"5%",height:"80%"}} /> */}
                <h1 className="text-[white]">TDList</h1>
                {/* Desktop Navigation Links */}
                <ul className='hidden md:flex space-x-6 text-xl text-[white] font-semibold'>

                   <li> <NavLink to={"/"}> Home </NavLink> </li>
                   <li> <NavLink to={"/about-us"}> About Us </NavLink> </li>
                    <li><NavLink to={"/contact-us"}> Contact Us </NavLink></li>
                    <li><NavLink to={"/Homelist"}> Homelist </NavLink></li>
                   
                </ul>
                
                {/* Desktop Buttons */}
                <div className='hidden space-x-4 md:flex'>
                <NavLink to={'/logIn'}><button className='bg-violet-200 px-4 py-2 text-[black] font-bold rounded-md'>Login</button></NavLink>
                    <NavLink to={"/ Registration"}><button className='bg-violet-200 px-4 py-2 text-[black] font-bold rounded-md'>Register</button></NavLink>
                </div>
                
                {/* Hamburger Menu Icon for Mobile */}
                <div className='fixed md:hidden right-6' onClick={ToggleNavBar}>
                    {/* Toggle between open and close icons based on openNav state */}
                    {!openNav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20}/>}
                </div>

                {/* Mobile Navigation Menu */}
                <div className={!openNav ? 'left-[0%] fixed top-0 w-[60%] bg-purple-700 h-full block pl-4 pt-4 ease-in-out duration-500 md:hidden' : "fixed left-[100%] ease-in-out duration-500"}>
                    {/* Logo in Mobile Menu */}
                    <h1 className='text-[27px] bg-purple-800 font-bold'>TDList</h1>
                    
                    {/* Mobile Navigation Links */}
                    <ul className='block pt-8 space-y-4'>
                        <li className='border-b border-[#232323]'> <NavLink to={"/"}> Home </NavLink>  </li>
                        <li className='border-b border-[#232323]'> <NavLink to={"/about-us"}> About Us </NavLink>  </li>
                        <li className='border-b border-[#232323]'> <NavLink to={"/contact-us"}> Contact Us </NavLink> </li>
                        <li className='border-b border-[#232323]'> <NavLink to={"/Homelist"}> Homelist </NavLink> </li>
                    </ul>
                    
                    {/* Mobile Buttons */}
                    <div className='block pt-5 space-y-4'>
                    <NavLink to={'/logIn'}><button className='bg-violet-200 w-full py-2 text-[black] font-bold rounded-md block'>Login</button></NavLink>
                    <NavLink to={"/ Registration"}><button className='bg-violet-200 w-full py-2 text-[black] font-bold rounded-md'>Register</button></NavLink>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar; // Export Navbar component
