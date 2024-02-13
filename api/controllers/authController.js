

import User from "../models/userModel.js";


export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({message:'All fields are required'})
  }

  try {
    const newUser = await User.create({
      username,
      email,
      password
    })
    res.status(200).json({newUser})
  } catch (e) {
    res.status(500).json({message:e.message})
  }
}