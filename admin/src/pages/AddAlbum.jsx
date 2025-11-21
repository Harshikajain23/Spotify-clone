import React, { use, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

export const AddAlbum = () => {

  const [image, setImage] = useState(null)
  const [colour, setColour] = useState("#ffffff");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    setLoading(true);
    try{
      const formData = new FormData();

      formData.append('name', name);
      formData.append('desc', desc);
      formData.append('image', image);
      formData.append('bgColor', colour);

      const response = await axios.post(`${url}/api/album/add`, formData,{
  headers: { "Content-Type": "multipart/form-data" }});

      if(response.data.success){
        toast.success("Album added")
        setDesc("");
        setImage(null);
        setName("");

      }

      else{
        toast.error('Something went wrong')
      }
    }

    catch(err){
       console.error(err);
      toast.error("Error occured")

    }
    setLoading(false);
  }

  return loading? ( <div className='grid place-items-center min-h-[80vh]'>
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' accept='image/*' hidden/>
        <label htmlFor='image'>
          <img className="w-24 cursor-pointer" src={image? URL.createObjectURL(image) : assets.upload_area} alt=""/></label>  
          </div>

          <div className='flex flex-col gap-2.5'>
            <p>Album name</p>
            <input onChange={(e)=>setName(e.target.value)} value={name}  type="text" placeholder='type here' className='bg-transparent outline-green-600
            border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]'/>

          </div>

          <div className='flex flex-col gap-2.5'>
            <p>Album description</p>
            <input onChange={(e)=> setDesc(e.target.value)} value={desc} type="text" placeholder='type here' className='bg-transparent outline-green-600
            border-2 border-gray-400 p-2.5 w-[max(40vw, 250px)]'/>

          </div>

          <div className='flex flex-col gap-3 '>
            <p>Background Color</p>
            <input className="cursor-pointer" onChange={(e)=> setColour(e.target.value)} value={colour} type="color"  />
          </div>

            <div className="flex justify- items-center">
          <input 
              type="submit" 
              value="ADD"
               className="bg-black text-white  border-2 cursor-pointer w-[100px] h-[40px] rounded-b-xs "
                />

                </div>
    </form>
    
  )
}

