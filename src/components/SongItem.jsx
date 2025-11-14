import React from 'react'
import { songsData } from '../assets/assets'

export const SongItem = ({name, image, desc, id}) => {
  return (
    <div className='min-w-[180px] p-2 px-3 rounded cursor-pointer hover: bg-[#fffff26]'>
       <img className='rounded' src={image} alt=""/>
       <p className='font-bold mt-2 mb-1'>{name}</p>
       <p className='text-slate-200 text-sm'></p>
       {songsData.map((item, index)=>(<SongItem key={index} name={item.name}  desc={item.desc} id={item.id} image={item.image}/>))}
    </div>
  )
}
