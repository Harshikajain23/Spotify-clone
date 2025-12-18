import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar flex justify-between w-full border-b-2 border-gray-800 px-5 sm:px-12 py-4 text-lg'>
        <p>Admin panel</p>
       <a href="https://spotify-clone-frontend-hyn0.onrender.com" className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer">
         Back to Home </a>
    </div>
  )
}

export default Navbar
