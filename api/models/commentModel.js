import mongoose  from "mongoose";

const commentSchema = new mongoose.Schema(
 {
  content: {
   type: String,
   required: true,
  },
  post: {
   type: mongoose.Schema.ObjectId,
   ref: "Post",
  },
  postId: {
   type: String
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

commentSchema.pre("save", async function (next) {
 try {
  await this.populate(
   {
    path: "user",
    select: "-password",
    model: "User",
   },
  //  { path: "post", model: "Post" },
  );

  next();
 } catch (error) {
  next(error);
 }
});


commentSchema.virtual("user", {
 ref: "User",
 localField: "userId",
  foreignField: "_id",
 justOne:true
});



const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
