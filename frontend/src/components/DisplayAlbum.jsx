import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

export const DisplayAlbum = ({album}) => {
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
                <img className="w-48 rounded" src={albumData.image} alt="" />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">{albumData.name}</h2>
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

            <div className="grid mt-10 mb-4 text-[#a7a7a7]  grid-cols-[2fr_1fr_1fr_1fr_0.5fr]">
                <p className="w-[300px]"> <b className="m-4">#</b> Title</p>
                <p className="ml-2">Album</p>
                <p className="hidden sm:block">Date Added</p>
                <p className="hidden lg:block mt-0.5">Times Played</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>

            <hr />

            {songsData.filter((item)=> item.album === albumData.name ).map((item, index) => (
                <div
                    onClick={() => playWithId(item._id)}
                    key={index}
                    className="grid p-2 item-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer  grid-cols-[2fr_1fr_1fr_1fr_0.5fr]"
                
                >
                    <p className="text-white w-[300px]">
                        <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                        <img className="inline w-10 mr-5" src={item.image} alt="" />
                        {item.name}
                    </p>
                    <p className="text-[15px]">{albumData.name}</p>
                    <p className="text-[15px] hidden sm:block">5 days ago</p>
                    <p className="text-[15px]">{item.playCount || 0}</p>
                    <p className="text-[15px] text-center">{item.duration}</p>
                </div>
            ))}
        </div>
    );
};
