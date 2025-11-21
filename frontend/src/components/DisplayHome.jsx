import React from 'react'
import { Navbar } from './Navbar'
import { AlbumItem } from './AlbumItem' 
import { SongItem } from './SongItem'  
import { PlayerContext } from '../context/PlayerContext'
import { useContext } from 'react'
import { createContext, useState } from "react";

export const DisplayHome = () => {


// const [songsData, setSongsData] = useState([]); 
// const [albumsData, setAlbumsData] = useState([]);  
const {songsData, albumsData} = useContext(PlayerContext);


  return (
    <div> <Navbar/> 

        <div className='mb-4 '>
        <h1 className='my-5 font-bold text-2xl'>Featured Charts </h1>
        <div className='flex overflow-auto'>
                     {albumsData.map((item, index)=> (<AlbumItem key={index} name={item.name} desc={item.desc} id={item._id} image={item.image}/>))}
        </div>
        </div>
    <div className='mb-4 '>
        <h1 className='my-5 font-bold text-2xl'>Today's biggest hit </h1>
        <div className='flex overflow-auto'>
               {songsData.map((item, index)=> (<SongItem key={index} name={item.name} desc={item.desc} playCount={item.playCount} id={item._id} image={item.image}/>))}
        </div>
 
        </div>
        
        </div>

   

  )
}

