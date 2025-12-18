import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar flex justify-between w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg'>
        <p>Admin panel</p>
       <a className="text-[15px] !text-gray-300 hover:text-black px-4 py-1 hidden md:block cursor-pointer" href="https://spotify-clone-frontend-hyn0.onrender.com" 
            target="_blank"   // optional: opens in a new tab
  rel="noopener noreferrer">
         Back to Home </a>
    </div>
  )
}

export default Navbar
