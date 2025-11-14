import React from 'react'
import { Sidebar } from './components/Sidebar'
import {Player} from './components/Player'
import './index.css'; // <-- for Tailwind
import { Display } from './components/Display';

const App = () => {
  return (
    
    <div className="h-screen bg-black">
    
    <div className="h-[90%] flex">
       
      <Sidebar />
      <Display/>
      </div>
      <div className='w-[100%]'> 
            <Player/>
      </div>

  
    </div>

    
 
  )
}

export default App;