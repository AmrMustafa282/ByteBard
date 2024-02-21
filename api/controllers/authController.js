

import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(errorHandler(400,'Please provide email and password!'))
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
     return next(errorHandler(400, "Invalid email or password"));
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
     return next(errorHandler(400, "Invalid email or password"));
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      {expiresIn:'1h'}
    )
    const { password: pass, ...rest } = user._doc;
    res.status(200).cookie('jwt', token, {
      httpOnly: true,
    }).json(rest);
  } catch (err) {
    next(err);
  }
} 