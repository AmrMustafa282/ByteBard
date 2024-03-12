import { Button, TextInput, Textarea } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommentSec = ({ postId }) => {
 const { currentUser } = useSelector((state) => state.user);
 const [comment, setComment] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (comment.length > 200) return;
  try {
   const res = await axios.post("/api/comment/create", {
    content: comment,
    postId,
    userId: currentUser._id,
   });
   if (res.status === 200) {
    setComment("");
    toast.success("Commentd added successfully");
   }
  } catch (error) {
    toast.error(error.message)
  }
 };

 return (
  <div className="max-w-2xl mx-auto w-full p-3">
   {currentUser ? (
    <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
     <p>Signed in as:</p>
     <img
      src={currentUser.profilePicture}
      alt="user img"
      className="h-5 w-5 object-cover rounded-full"
     />
     <Link
      to={"/dashboard?tab=profile"}
      className="text-xs text-cyan-600 hover:underline"
     >
      @{currentUser.name}
     </Link>
    </div>
   ) : (
    <div className="flex gap-1 text-sm text-teal-500 my-5 w-full justify-center">
     You must be signed in to comment.
     <Link to={"/sign-in"} className="text-blue-500 hover:underline">
      Sign In
     </Link>
    </div>
   )}
   {currentUser && (
    <form
     onSubmit={handleSubmit}
     className="border border-teal-500 rounded-md p-3"
    >
     <Textarea
      placeholder="Add a comment..."
      rows="3"
      maxLength={"200"}
      onChange={(e) => {
       setComment(e.target.value);
      }}
      value={comment}
     />
     <div className="flex justify-between items-center mt-5">
      <p className="text-gray-500 text-xs">
       {200 - comment.length} characters remaining
      </p>
      <Button gradientDuoTone={"purpleToBlue"} type="submit" outline>
       Submit
      </Button>
     </div>
    </form>
   )}
  </div>
 );
};

export default CommentSec;
