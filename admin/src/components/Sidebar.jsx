import React from 'react'
import "./Sidebar.css";  
import {assets} from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw]'>

    <img src={assets.logo} className='mr-7 mt-5 w-[max(15vw,30px)] hidden sm:block' />

    <img src={assets.logo_small} className='mt-5 w-[max(10vw,20px)] mr-5 block sm:hidden ' />

    <div className='flex flex-col gap-5 mt-10'>

        <NavLink to='/add-song' className=' flex items-center gap-2.5 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium '>
            <img src={assets.add_song} className='w-5' alt=""  />

            <p className='hidden sm:block text-gray-800'>Add Song</p>
        </NavLink>

        <NavLink to='/list-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium '>
            <img src={assets.song_icon} className='w-5' alt=""  />

            <p className='hidden sm:block text-gray-800'>List Song</p>
        </NavLink>

        <NavLink to='/add-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium '>
            <img src={assets.add_album} className='w-5' alt=""  />

            <p className='hidden sm:block text-gray-800'>Add Album</p>
        </NavLink>

        <NavLink to='/list-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium '>
            <img src={assets.album_icon} className='w-5' alt=""  />

            <p className='hidden sm:block text-gray-800'>List Album</p>
        </NavLink>
    </div>

    </div>
  )
}

export default Sidebar