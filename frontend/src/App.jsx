import React, { useContext } from 'react'
import { Sidebar } from './components/Sidebar'
import { Player } from './components/Player'
import './index.css'; // Tailwind
import { Display } from './components/Display'
import { PlayerContext } from './context/PlayerContext'

const App = () => {
    const { audioRef, track, songsData = [] } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
   
        
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <div className="w-full">
            <audio ref={audioRef} src={track?track.file:""} preload="auto" />
            <Player />
          </div>
        
       
    </div>
  )
}

export default App
