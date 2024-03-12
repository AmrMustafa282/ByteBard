import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import cookieParser from "cookie-parser";

dotenv.config();

mongoose.connect(
 process.env.DATABASE
).then(() => console.log('MongoDB is connected')
).catch(err=> console.log(err))

const app = express();
const port = 3000;

app.use(express.json())
app.use(cookieParser())

app.listen(port, () => {
  console.log(`server started on port ${port}`);
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    status: 'failed',
    statusCode,
    message
  })
})