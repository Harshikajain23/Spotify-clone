import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { NavLink } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate()
  return (

      <>
    <div className='w-full flex justify-between items-center font-semibold'>
        <div className='flex items-center gap-2'>
            <img onClick={()=> navigate(-1)} className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_left} alt=""/>

              <img onClick={()=> navigate(+1)}className="w-8 bg-black p-2 rounded-2xl cursor-pointer" src={assets.arrow_right} alt=""/>
        </div>

        <div className='flex items-center gap-4'>
              <a
          href="https://spotify-clone-admin-528z.onrender.com"
          className="bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer hover:bg-gray-200 transition-colors">
              Go to Admin Panel
            </a>
            <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex items-center justify-center'>D</p>
        </div>

        


    </div>

    <div className='flex items-center mt-4 gap-2'>
            <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
            <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
             <p className='bg-black px-4 py-1 rounded-2xl cursor-pointer'>Podcast</p>
        </div>

  </>
  )
}
