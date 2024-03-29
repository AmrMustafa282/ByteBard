import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const updateUser = async (req, res, next) => {
 if (req.user.id !== req.params.userId) {
  return next(errorHandler(403, "You are noe allowed to update this user!"));
 }
 if (req.body.password) {
  if (req.body.password.length < 6) {
   return next(errorHandler(400, "Password must be at least 6 characters!"));
  }
 }

 if (req.body.name) {
  if (req.body.name.length > 20 || req.body.name.length < 7) {
   return next(errorHandler(400, "Name  must be between 7 and 20 characters!"));
  }
 }

 try {
  const { name, email, profilePicture } = req.body;

  const user = await User.findById(req.params.userId);
  if (name) user.name = name;
  if (email) user.email = email;
  if (req.body.password) user.password = req.body.password;
  if (profilePicture) user.profilePicture = profilePicture;

  const updatedUser = await user.save();
  const { password, ...rest } = updatedUser.toObject();
  res.status(200).json(rest);
 } catch (err) {
  next(err);
 }
};

export const deleteUser = async (req, res, next) => {
 if (!req.user.isAdmin && req.user.id !== req.params.userId) {
  return next(errorHandler(403, "You are noe allowed to update this user!"));
 }
 try {
  await User.findByIdAndDelete(req.params.userId);
  res.status(201).json("User has been deleted!");
 } catch (err) {
  next(err);
 }
};
export const banUser = async (req, res, next) => {
 if (!req.user.isAdmin && req.user.id !== req.params.userId) {
  return next(errorHandler(403, "You are noe allowed to update this user!"));
 }
 try {
   const user = await User.findById(req.params.userId);
   if (!user) {
     return next(errorHandler(404, 'User not found!'))
   }
   const updatedUesr = await user.toggleBan();
   const { password, ...rest } = updatedUesr.toObject();
  res.status(201).json(rest);
 } catch (error) {
  next(error);
 }
};

export const signout = (req, res, next) => {
 try {
  res.clearCookie("jwt").status(200).json("User has been singed out");
 } catch (err) {
  next(err);
 }
};

export const getUsers = async (req, res, next) => {
 if (!req.user.isAdmin) {
  return next(errorHandler(403, "You are not allowed to see all users"));
 }
 try {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;

  let users = await User.find()
   .select("-password")
   .sort({ createdAt: sortDirection })
   .skip(startIndex)
   .limit(limit);

  const totalUsers = await User.countDocuments();

  const now = new Date();
  const oneMonthAgo = new Date(
   now.getFullYear(),
   now.getMonth() - 1,
   now.getDate()
  );

  const lastMonthUsers = await User.countDocuments({
   createdAt: { $gte: oneMonthAgo },
  });

  res.status(200).json({
   users,
   totalUsers,
   lastMonthUsers,
  });
 } catch (error) {
  next(error);
 }
};

// export const banUserByAdmin = async (req, res, next) => {
//    const { userToBanId, userId } = req.params;
//    if (!req.user.isAdmin && userId !== req.user.id) {
//     return next(errorHandler(403, "You are not allowed to create a post!"));
//    }
//    if (!userToBanId || !userId) {
//     return next(errorHandler(400, "userToBanId and userId is needed!"));
//    }
//    try {
//     const banedUser = await User.findByIdAndUpdate( userToBanId,{isActive: false},{ new: true });
//     if (!banedUser) {
//      return next(errorHandler(404, "Cant found this post!"));
//     }
//     res.status(201).json('User has been baned!');
//    } catch (error) {
//     next(error);
//    }
// }

// export const deleteUserByAdmin = async (req, res, next) => {
//    const { userToDeleteId, userId } = req.params;
//    if (!req.user.isAdmin && userId !== req.user.id) {
//     return next(errorHandler(403, "You are not allowed to create a post!"));
//    }
//    if (!userToDeleteId || !userId) {
//     return next(errorHandler(400, "userToDeleteId and userId is needed!"));
//    }
//    try {
//     const banedUser = await User.findByIdAndDelete( userToDeleteId);
//     if (!banedUser) {
//      return next(errorHandler(404, "Cant found this post!"));
//     }
//     res.status(201).json('User has been deleted!');
//    } catch (error) {
//     next(error);
//    }
// }
