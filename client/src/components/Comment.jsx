import React from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
 const { currentUser } = useSelector((state) => state.user);
 const user = comment.user;
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
     <span>
      <p className="text-gray-400">
       {comment.numberOfLikes > 0 &&
        comment.numberOfLikes +
         " " +
         (comment.numberOfLikes === 1 ? "like" : "likes")}
      </p>
     </span>
    </div>
   </div>
  </div>
 );
};

export default Comment;
