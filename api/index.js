import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config();

mongoose.connect(
 process.env.DATABASE
).then(() => console.log('MongoDB is connected')
).catch(err=> console.log(err))

const app = express();
const port = 3000;

app.use(express.json())

app.listen(port, () => {
  console.log(`server started on port ${port}`);
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);