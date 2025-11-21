import { v2 as cloudinary } from "cloudinary";


// ADD SONG
export const addSong = async (req, res) => {
  try {
    console.log("FILES RECEIVED:", req.files);
    console.log("🔥 addSong route hit!");

    if (!req.files?.image || !req.files?.audio) {
      return res.json({
        success: false,
        error: "Image or Audio file missing. Check field names!",
      });
    }

    const imageFile = req.files.image[0];
    const audioFile = req.files.audio[0];
    const { name, desc, album } = req.body;
    const playCount = req.body.playCount || 0;

    const audioUpload = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: "raw",
    });

    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });

    const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(
      audioUpload.duration % 60
    )}`;

    const song = new songModel({
      name,
      desc,
      album,
      playCount,
      image: imageUpload.secure_url,
      file: audioUpload.secure_url,
      duration,
    });

    await song.save();
    res.json({ success: true, message: "Song Added" });
  } catch (error) {
    console.error("Add Song Error:", error);
    res.json({ success: false, error: error.message });
  }
};

// LIST SONGS
export const listSong = async (req, res) => {
  try {
    const allSongs = await songModel.find({});
    res.json({ success: true, songs: allSongs });
  } catch (error) {
    console.error("List Song Error:", error);
    res.json({ success: false });
  }
};

// REMOVE SONG
export const removeSong = async (req, res) => {
  try {
    await songModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song Removed" });
  } catch (error) {
    console.error("Remove Song Error:", error);
    res.json({ success: false, error: error.message });
  }
};

// INCREASE PLAY COUNT
export const increasePlayCount = async (req, res) => {
  try {
    const { id } = req.params;

    const song = await songModel.findById(id);
    if (!song) return res.status(404).json({ message: "Song not found" });

    song.playCount = (song.playCount || 0) + 1;
    await song.save();

    res.json({ success: true, playCount: song.playCount });
  } catch (error) {
    res.status(500).json({ message: "Error updating play count" });
  }
};
