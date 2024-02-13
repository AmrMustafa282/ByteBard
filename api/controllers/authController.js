

import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    next(errorHandler(400, 'All fields are required'))
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password
    })
    res.status(200).json({newUser})
  } catch (err) {
    next(err)
  }
}