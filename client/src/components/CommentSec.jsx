import { Button, Textarea, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Comment from "./Comment";

const CommentSec = ({ postId }) => {
 const { currentUser } = useSelector((state) => state.user);
 const navigate = useNavigate();
 const [showModel, setShowModel] = useState(false);
 const [commentToDelete, setCommentToDelete] = useState(null);
 const [comment, setComment] = useState("");
 const [comments, setComments] = useState([]);

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
    setComments([res.data, ...comments]);
    //  console.log(res.data)
    toast.success("Commentd added successfully");
   }
  } catch (error) {
   toast.error(error.message);
  }
 };

 const fetchPostComments = async () => {
  try {
   const res = await axios.get(`/api/comment/getPostComments/${postId}`);
   if (res.status === 200) setComments(res.data);
  } catch (error) {
   console.log(error);
  }
 };

 const handleLike = async (commentId) => {
  try {
   if (!currentUser) {
    toast.warning("You must login!");
    setTimeout(() => {
     navigate("/sign-in");
    }, 5000);
    return;
   }
   const res = await axios.put(`/api/comment/likeComment/${commentId}`);
   if (res.status === 200) {
    setComments(
     comments.map((comment) =>
      comment._id === commentId
       ? {
          ...comment,
          likes: res.data.likes,
          numberOfLikes: res.data.likes.length,
         }
       : comment
     )
    );
   }
   console.log(res.data);
  } catch (error) {
   console.log(error);
  }
 };

 const handleEdit = async (comment, editedContent) => {
  setComments(
   comments.map((c) =>
    c._id === comment.id.toString()
     ? {
        ...c,
        content: editedContent,
       }
     : c
   )
  );
 };
 const handleDelete = async (commentId) => {
  setShowModel(false);
  try {
   if (!currentUser) {
    toast.warning("you must loggin");
    setTimeout(() => {
     navigate("/sign-in");
    }, 5000);
   }
   const res = await axios.delete(`/api/comment/deleteComment/${commentId}`);
   if (res.status === 200) {
    setComments(comments.filter((comment) => comment._id !== commentId));
   }
  } catch (error) {
   console.log(error);
  }
 };
 useEffect(() => {
  fetchPostComments();
 }, [postId]);
 return (
  <div className=" mx-auto w-full p-3">
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
   {comments.length === 0 ? (
    <p className="text-sm my-5">No comments yet!</p>
   ) : (
    <>
     <div className="text-sm my-5 flex items-center gap-1">
      <p>Comments</p>
      <div className="border border-gray-400 py-1 px-2 rounded-sm">
       <p>{comments.length}</p>
      </div>
     </div>
     {comments.map((c) => (
      <Comment
       key={c._id}
       comment={c}
       onLike={handleLike}
       onEdit={handleEdit}
       onDelete={(commentId) => {
        setShowModel(true);
        setCommentToDelete(commentId);
       }}
      />
     ))}
    </>
   )}
   <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
    <Modal.Header />
    <Modal.Body>
     <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
       Are you sure you want to delete this comment?
      </h3>
      <div className="flex justify-between gap-4">
       <Button color="failure" onClick={() => handleDelete(commentToDelete)}>
        Yes, I'm sure
       </Button>
       <Button color="gray" onClick={() => setShowModel(false)}>
        Cancel
       </Button>
      </div>
     </div>
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default CommentSec;
