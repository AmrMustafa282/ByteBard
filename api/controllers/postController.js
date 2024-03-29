import Post from "../models/postModel.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
 if (!req.user.isAdmin) {
  return next(errorHandler(403, "You are not allowed to create a post!"));
 }
 if (!req.body.title || !req.body.content) {
  return next(errorHandler(400, "Please provide all required fields!"));
 }
 const slug = req.body.title
  .trim()
  .split(" ")
  .join("-")
  .toLowerCase()
  .replace(/[^a-zA-Z0-9-]/g, "");

 const newPost = new Post({
  ...req.body,
  slug,
  userId: req.user.id,
 });
 try {
  const savedPost = await newPost.save();

  res.status(201).json(savedPost);
 } catch (error) {
  next(error);
 }
};

export const getPosts = async (req, res, next) => {
 try {
  const startIndex = parseInt(req.query.startIndex) || 0;
  const limit = parseInt(req.query.limit) || 9;
  const sortDirection = req.query.order === "asc" ? 1 : -1;


  const posts = await Post.find({
   ...(req.query.userId && { userId: req.query.userId }),
   ...(req.query.category && { category: req.query.category }),
   ...(req.query.slug && { slug: req.query.slug }),
   ...(req.query.postId && { _id: req.query.postId }),
   ...(req.query.searchTerm && {
    $or: [
     { title: { $regex: req.query.searchTerm, $options: "i" } },
     { content: { $regex: req.query.searchTerm, $options: "i" } },
    ],
   }),
  })
   .sort({ updatedAt: sortDirection })
   .skip(startIndex)
   .limit(limit)
   

  const totalPosts = await Post.countDocuments();
  const now = new Date();
  const oneMonthAgo = new Date(
   now.getFullYear(),
   now.getMonth() - 1,
   now.getDate()
  );

  const lastMonthPosts = await Post.countDocuments({
   createdAt: { $gte: oneMonthAgo },
  });

  res.status(200).json({
   posts,
   totalPosts,
   lastMonthPosts,
  });
 } catch (error) {
  next(error);
 }
};
export const getPost = async (req, res, next) => {
 try {

  const post = await Post.findOne({
   ...(req.query.userId && { userId: req.query.userId }),
   ...(req.query.category && { category: req.query.category }),
   ...(req.query.slug && { slug: req.query.slug }),
   ...(req.query.postId && { _id: req.query.postId }),  
  })
  res.status(200).json({
   post,
  });
 } catch (error) {
  next(error);
 }
};

export const deletePost = async (req, res, next) => {
 const { postId, userId } = req.params;
 if (!req.user.isAdmin || userId !== req.user.id) {
  return next(errorHandler(403, "You are not allowed to create a post!"));
 }
 if (!postId || !userId) {
  return next(errorHandler(400, "postId and userId is needed!"));
 }
 try {
  const post = await Post.findByIdAndDelete(postId);
  if (!post) {
   return next(errorHandler(404, "Cant found this post!"));
  }
  res.status(201).json("post deleted successfully");
 } catch (error) {
  next(error);
 }
};
export const updatePost = async (req, res, next) => {
 const { postId, userId } = req.params;
 if (!req.user.isAdmin || userId !== req.user.id) {
  return next(errorHandler(403, "You are not allowed to create a post!"));
 }
 if (!postId || !userId) {
  return next(errorHandler(400, "postId and userId is needed!"));
 }
 try {
  const { title, content, category, image } = req.body;
  const updatedPost = await Post.findByIdAndUpdate(
   postId,
   {
    $set: {
     title,
     content,
     category,
     image,
    },
   },
   { new: true }
  );
  if (!updatedPost) {
   return next(errorHandler(404, "Cant found this post!"));
  }
  res.status(201).json({ updatedPost });
 } catch (error) {
  next(error);
 }
};
