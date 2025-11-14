import React from 'react'
import { DisplayHome } from './DisplayHome'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Display = () => {
  return (

    <div className='w-[100%] m-2 px-6 rounded pt-4 bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
        <Routes>
            <Route path='/' element = {<DisplayHome/>}/>
        </Routes>
    </div>
  )
}

