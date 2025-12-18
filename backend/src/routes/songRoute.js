import express from 'express';
import upload from "../controllers/middleware/multer.js";
import { addSong, listSong, removeSong, increasePlayCount } from "../controllers/songController.js";

const songRouter = express.Router();

// Add a song with image & audio
songRouter.post(
  '/add',
  upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]),
  addSong
);

// List all songs
songRouter.get('/list', listSong);

// Remove a song
songRouter.post('/remove', removeSong);

// Increase play count
songRouter.post('/increase-play/:id', increasePlayCount);

export default songRouter;
