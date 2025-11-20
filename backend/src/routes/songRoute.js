import upload from "../controllers/middleware/multer.js";
import { addSong, listSong , removeSong} from "../controllers/songContoller.js";

import express from 'express'

const songRouter = express.Router();

songRouter.post('/add',upload.fields([{name: 'image', maxCount: 1}, {name: 'audio', maxCount:1}]), addSong);
songRouter.get('/list', listSong);
songRouter.post('/remove', removeSong)

export default songRouter;



