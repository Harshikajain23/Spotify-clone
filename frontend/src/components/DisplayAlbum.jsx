import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { timeAgo } from './formatTime';

export const DisplayAlbum = ({album}) => {
    console.log("createdAt:", album.createdAt, "converted:", new Date(album.createdAt));
    const { id } = useParams();
    const { playWithId, albumsData, songsData } = useContext(PlayerContext);

    const [albumData, setAlbumData] = useState("");
    const [songs, setSongs] = useState([]);

    // Set album data
    useEffect(() => {
        const album = albumsData.find(item => item._id === id);
        if (album) setAlbumData(album);
    }, [albumsData, id]);

    // Sync songs data
    useEffect(() => {
        setSongs(songsData);
    }, [songsData]);

    const handlePlay = (songId) => {
        playWithId(songId);
        setSongs(prevSongs =>
            prevSongs.map(song =>
                song.id === songId ? { ...song, playCount: (song.playCount || 0) + 1 } : song
            )
        );
    };

    if (!albumData) return null;

 
  

    return  (
     <div
  style={{
    background: `linear-gradient(to bottom, ${albumData.bgColor}90, #000000)`
  }}
>

            
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-40 md:w-48 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-3">{albumData.name}</h2>
                    <h4>{albumData.name}</h4>
                    <p className="mt-1 mr-5">
                        <img className="inline-block w-5 gap-4" src={assets.spotify_logo} alt="" />
                        <b className="mr-2 ml-2">Spotify </b>
                        • 1,323,154 likes
                        • <b className="mr-3">50 songs</b>
                        about 2 hr 30 min
                    </p>
                </div>
            </div>

            <div className="grid mt-10 mb-4 text-[#a7a7a7]  grid-cols-[1fr_auto]
sm:grid-cols-[2fr_1fr_auto]
lg:grid-cols-[2fr_1fr_1fr_1fr_0.5fr]">
                <p className="flex items-center gap-4 overflow-hidden"> <b className="m-4">#</b> Title </p>
               <p className="items-center hidden lg:flex ml-2">Album</p>
                <p className="items-center hidden lg:flex">Date Added</p>
                <p className="hidden items-center lg:flex mt-0.5">Times Played</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
               
            </div>

            <hr />

            {songsData.filter((item)=> item.album === albumData.name ).map((item, index) => (
                <div
                    onClick={() => playWithId(item._id)}
                    key={index}
                    className="grid p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer  grid-cols-[1fr_auto]
sm:grid-cols-[2fr_1fr_auto]
lg:grid-cols-[2fr_1fr_0.5fr_1fr_0.5fr]"
                
                >
                    <p className="flex items-center gap-4 text-white overflow-hidden">
                        <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                        <img className=" w-10 mr-5" src={item.image} alt="" />
                        <span className="truncate">{item.name}</span>
                    </p>
                    <p className="hidden lg:block text-sm truncate">
  {albumData.name}
</p>
                    <p className="hidden lg:block text-sm">{timeAgo(item.createdAt)}</p>
                    
                    <p className="hidden lg:block text-sm text-center">
  {item.playCount || 0}
</p>
                   <p className="text-sm text-right">{item.duration}</p>
                </div>
            ))}
        </div>
    );
};
