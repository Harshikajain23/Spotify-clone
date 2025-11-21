import React, { useContext } from 'react'
import  { useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

export const SongItem = ({name, image, desc, playCount, id}) => {

  const { playWithId } = useContext(PlayerContext)

  return (
    <div 
      onClick={() => playWithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-45 h-45" src={image} alt="" />
      <p className="font-bold mt-2 mb-1">{name}</p>
      <p className="text-slate-200 text-sm">{desc}</p>
    </div>
  )
}