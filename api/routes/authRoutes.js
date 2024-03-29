import express from 'express';

import { signup, login, google } from "../controllers/authController.js";
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', login)
router.post('/google',google)

export default router;