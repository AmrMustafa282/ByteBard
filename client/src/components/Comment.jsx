import React, { useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import axios from "axios";

const Comment = ({ comment, onLike, onEdit }) => {
 const { currentUser } = useSelector((state) => state.user);
 const user = comment.user;

 const [isEditing, setIsEditing] = useState(false);
 const [editedContent, setEditedContent] = useState(comment.content);

 const handleEdit = async () => {
  setIsEditing(true);
  setEditedContent(comment.content);
 };

 const handleSave = async () => {
  try {
   const res = await axios.put(`/api/comment/editComment/${comment._id}`, {
    content: editedContent,
   });
    if (res.status === 200) {
      setIsEditing(false);
      onEdit(comment, editedContent)
    }
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <div className="flex p-4 border-b dark:border-gray-600 text-sm">
   <div className="flex-shrink-0 mr-3">
    <img
     src={user.profilePicture}
     alt="owner img"
     className="w-10 h-10 rounded-full bg-gray-200 "
    />
   </div>
   <div className="flex-1">
    <div className="flex items-center mb-1">
     <span className="font-bold mr-1 text-sm truncate">
      {user ? `@${user.name}` : "annonymous user"}
     </span>
     <span className="text-gray-500 text-xs">
      {moment(comment.createdAt).fromNow()}
     </span>
    </div>
    {isEditing ? (
     <>
      <Textarea
       className="mb-2"
       value={editedContent}
       onChange={(e) => setEditedContent(e.target.value)}
      />
      <div className="flex gap-2 flex-row-reverse mt-4">
       <Button
        type="button"
        size="xs"
        color="blue"
        outline
        onClick={handleSave}
       >
        Save
       </Button>
       <Button
        type="button"
        size="xs"
        color=""
        onClick={() => setIsEditing(false)}
       >
        Cancel
       </Button>
      </div>
     </>
    ) : (
     <>
      <p className="text-gray-500 pb-2">{comment.content}</p>
      <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
       <button
        className={`text-gray-400 hover:text-blue-500 
          ${
           currentUser &&
           comment.likes.includes(currentUser._id) &&
           "!text-blue-500"
          }
         `}
        onClick={() => onLike(comment._id.toString())}
       >
        <FaThumbsUp className="text-sm hover:scale-125 transition-all" />
       </button>

       <p className="text-gray-400">
        {comment.numberOfLikes > 0 &&
         comment.numberOfLikes +
          " " +
          (comment.numberOfLikes === 1 ? "like" : "likes")}
       </p>
       {currentUser &&
        (currentUser._id === comment.userId || currentUser.isAdmin) && (
         <button
          type="button"
          className="text-gray-400 hover:text-blue-500"
          onClick={handleEdit}
         >
          Edit
         </button>
        )}
      </div>
     </>
    )}
   </div>
  </div>
 );
};

export default Comment;
