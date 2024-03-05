import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"


export const updateUser =async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
   return next(errorHandler(403, "You are noe allowed to update this user!"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400,'Password must be at least 6 characters!'))
    }
  }

  if (req.body.name) {
    if (req.body.name.length > 20 || req.body.name.length < 7) {
      return next(errorHandler(400,'Name  must be between 7 and 20 characters!'))
    }
  }

  try {
   const { name, email, profilePicture } = req.body;

   const user = await User.findById(req.params.userId);
   if(name) user.name = name;
   if(email) user.email = email;
   if(req.body.password) user.password = req.body.password;
   if(profilePicture) user.profilePicture = profilePicture;

   // Save the updated user
   const updatedUser = await user.save();

   // Omit the password field from the response
   const { password, ...rest } = updatedUser.toObject();

   // Respond with the updated user data
   res.status(200).json(rest);
  } catch (err) {
   next(err);
  }


}