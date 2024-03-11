import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
 {
  userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User",
   required: [true, "userId is required!"],
  },
  content: {
   type: String,
   required: [true, "Content is required!"],
  },
  title: {
   type: String,
   required: [true, "Title is required!"],
   unique: true,
  },
  image: {
   type: String,
   default:
    "https://www.salesforce.com/ca/blog/wp-content/uploads/sites/12/2023/10/anatomy-of-a-blog-post-deconstructed-open-graph.jpg?w=768&h=401",
  },
  category: {
   type: String,
   default: "uncategorized",
  },
  slug: {
   type: String,
   required: [true, "Slug is required!"],
   unique: true,
  },
 },
 {
  timestamps: true,
 }
);
postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

postSchema.virtual("user", {
 ref: "User",
 localField: "userId",
 foreignField: "_id"
});

const Post = mongoose.model("Post", postSchema);

export default Post;
