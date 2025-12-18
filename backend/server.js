import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import songRouter from './src/routes/songRoute.js';
import albumRouter from './src/routes/albumRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';

// app config
const app = express();
const port = process.env.PORT || 4000;

// connect DB & Cloudinary
connectDB();
connectCloudinary();

// ====== CORS setup for multiple frontends ======
const allowedOrigins = [
  'https://spotify-clone-frontend-hyn0.onrender.com',
  'https://spotify-clone-admin-528z.onrender.com'
];

app.use(
  cors({
    origin: [
      "https://spotify-clone-frontend-hyn0.onrender.com",
      "https://spotify-clone-admin-528z.onrender.com"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  })
);

// ====== Middlewares ======
app.use(express.json());

// ====== Routes ======
app.use("/api/song", songRouter);
app.use('/api/album', albumRouter);

// Test route
app.get('/all', (req, res) => res.send("API working"));

// ====== Start server ======
app.listen(port, () => console.log(`Server started on ${port}`));
