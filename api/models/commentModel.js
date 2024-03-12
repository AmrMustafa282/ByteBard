import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
 {
  content: {
   type: String,
   required: true,
  },
  postId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "Post",
   required: true,
  },
  userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: true,
  },
  likes: {
   type: Array,
   default: [],
  },
  numberOfLikes: {
   type: Number,
   default: 0,
  },
 },
 {
  timestamps: true,
 }
);

commentSchema.set("toJSON", { virtuals: true });
commentSchema.set("toObject", { virtuals: true });

// commentSchema.pre("save", async function (next) {
//  try {
//   await this.populate([
//    {
//     path: "user",
//     select: "-password",
//     model: "User",
//    },
//    { path: "post", model: "Post" },
//   ]);

//   next();
//  } catch (error) {
//   next(error);
//  }
// });

commentSchema.virtual("user", {
 ref: "User",
 localField: "userId",
 foreignField: "_id",
});

commentSchema.virtual("post", {
 ref: "Post",
 localField: "postId",
 foreignField: "_id",
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
