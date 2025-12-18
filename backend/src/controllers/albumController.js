// import {v2 as cloudinary} from 'cloudinary'
// import albumModel from './models/albumModel.js'

// const addAlbum = async(req, res) =>{
//     try{
//         const name = req.body.name;
//         const desc = req.body.desc;
//         const bgColor = req.body.bgColor;
//         const image = req.file;
//         const imageUpload = await cloudinary.uploader.upload(image.path, {resource_type:"image"});

//         const albumData = {
//             name,
//             desc,
//             bgColor,
//             image : imageUpload.secure_url
//         }

//         const album = new albumModel(albumData);
//         await album.save();

//         res.json({success: true, message: "Album added"})
        
//     }

//     catch(error){
//       console.error("Add song error:", error);
//     res.json({ success: false, error: error.message });

//     }
// }

// const listAlbum = async(req, res) =>{

//     try{
//         const allAlbums = await albumModel.find({});
//         res.json({success:true, albums: allAlbums})
//     }
//     catch(error){
//         res.join({success: false})
//     }
// }

// const removeAlbum = async(req, res)=>{
//     try{
//         await albumModel.findByIdAndDelete(req.body.id);
//         response.json({success:true, message: "Album removed"})
//     }

//     catch{
//         res.json({success:false})

//     }
// }

// export {addAlbum, listAlbum, removeAlbum}

import { v2 as cloudinary } from "cloudinary";
import albumModel from "./models/albumModel.js";

// ADD ALBUM
export const addAlbum = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "Image file missing" });
    }

    const { name, desc, bgColor } = req.body;

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const album = new albumModel({
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    });

    await album.save();
    res.status(201).json({ success: true, message: "Album added", album });
  } catch (error) {
    console.error("Add Album Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// LIST ALBUMS
export const listAlbum = async (req, res) => {
  try {
    const allAlbums = await albumModel.find({});
    res.status(200).json({ success: true, albums: allAlbums });
  } catch (error) {
    console.error("List Album Error:", error);
    res.status(500).json({ success: false, message: "Server error fetching albums" });
  }
};

// REMOVE ALBUM
export const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.status(200).json({ success: true, message: "Album removed" });
  } catch (error) {
    console.error("Remove Album Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
