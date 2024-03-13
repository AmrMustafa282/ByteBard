import axios from "axios";
import { Modal, Table, Button, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const DashComments = () => {
 const { currentUser } = useSelector((state) => state.user);
 const [comments, setComments] = useState([]);
 const [showMore, setShowMore] = useState(true);
 const [showModel, setShowModel] = useState(false);
 const [commentIdToDelete, setCommentIdToDelete] = useState(null);

 const fetchComments = async () => {
  try {
   const res = await axios.get(`/api/comment/getComments`);
   if (res.status === 200) {
    setComments(res.data.comments);
    if (res.data.comments.length < 9) setShowMore(false);
   }
  } catch (error) {
   console.log(error);
  }
 };
 const handelShowMore = async () => {
  const startIndex = comments.length;
  try {
   const res = await axios.get(
    `/api/comment/getComments?startIndex=${startIndex}`
   );
   if (res.status === 200) {
    setComments((prev) => [...prev, ...res.data.comments]);
    if (res.data.comments.length < 9) {
     setShowMore(false);
    }
   }
  } catch (error) {
   console.log(error);
  }
 };
 const handelDeleteComment = async () => {
  setShowModel(false);
  try {
   const res = await axios.delete(
    `/api/comment/deleteComment/${commentIdToDelete}`
   );
   if (res.status === 200) {
    toast.success("Comment has been deleted");
    fetchComments();
    // setComments((prev) =>
    //  prev.filter((comment) => comment._id !== commentIdToDelete)
    // );
   } else {
    return toast.error(res.data.message);
   }
  } catch (error) {
   toast.error(error.message);
  }
 };

 useEffect(() => {
  if (currentUser.isAdmin) fetchComments();
 }, []);

 return (
  <div className="text-center min-w-[70vw] table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-track-transparent  dark:scrollbar-thumb-slate-500">
   {currentUser.isAdmin && comments.length > 0 ? (
    <>
     <Table hoverable className="shoadow-md text-center ">
      <Table.Head>
       <Table.HeadCell className="hidden sm:table-cell">
        Data created
       </Table.HeadCell>
       <Table.HeadCell>User</Table.HeadCell>
       <Table.HeadCell>Post</Table.HeadCell>
       <Table.HeadCell className="min-w-[190px]">Comment</Table.HeadCell>
       <Table.HeadCell className="hidden sm:table-cell">Likes</Table.HeadCell>
       <Table.HeadCell className="hidden sm:table-cell">Admin</Table.HeadCell>
       <Table.HeadCell>Delete</Table.HeadCell>
      </Table.Head>
      {comments.map((comment) => (
       <Table.Body className="divide-y" key={comment._id}>
        <Table.Row className="bg-white dark:bordergra700 dark:bg-gray-800">
         <Table.Cell className="hidden sm:table-cell">
          {new Date(comment.updatedAt).toLocaleDateString()}
         </Table.Cell>
         <Table.Cell>
          <div className="flex items-center justify-center gap-1">
           <img
            src={comment.user.profilePicture}
            alt={comment.user.name}
            className="rounded-full w-8 h-8 sm:w-10 sm:h-10 mx-auto object-contain  bg-gray-200"
           />
           <div className="hidden sm:block">
            <Tooltip content={comment.user._id}>
             <p className="text-xs text-cyan-600 hover:underline ">
              @{comment.user.name}
             </p>
            </Tooltip>
            <span className="block  font-medium truncate text-xs">
             {comment.user.email}
            </span>
           </div>
          </div>
         </Table.Cell>
         <Table.Cell>
          <Tooltip content={comment.post._id}>
           <Link
            to={`/posts/${comment.post.slug}`}
            className="font-semibold text-nowrap truncate"
           >
            {comment.post.title}
           </Link>
          </Tooltip>
         </Table.Cell>
         <Table.Cell>
          <Tooltip content={comment._id}>
           <p className="max-w-96 line-clamp-4 text-justify leading-4 cursor-pointer">
            {comment.content}
           </p>
          </Tooltip>
         </Table.Cell>
         <Table.Cell className="hidden sm:table-cell">
          {comment.numberOfLikes}
         </Table.Cell>
         <Table.Cell className="hidden sm:table-cell">
          {comment.user.isAdmin ? (
           <FaCheck className="text-green-500 mx-auto" />
          ) : (
           <FaTimes className="text-red-500 mx-auto" />
          )}
         </Table.Cell>
         <Table.Cell>
          <span
           onClick={() => {
            setShowModel(true);
            setCommentIdToDelete(comment._id);
           }}
           className="font-medium text-red-500 hover:underline cursor-pointer"
          >
           Delete
          </span>
         </Table.Cell>
        </Table.Row>
       </Table.Body>
      ))}
     </Table>
     {showMore && (
      <button onClick={handelShowMore} className="">
       <IoIosArrowDown
        className="box-content p-2 my-5 bg-[#E4E6E9] rounded-full w-6 h-6 fill-black 
            dark:bg-[#4B5563] dark:fill-white cursor-pointer hover:scale-105 transition-all "
       />
      </button>
     )}
    </>
   ) : (
    <p>There is no comments!</p>
   )}
   <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
    <Modal.Header />
    <Modal.Body>
     <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
       Are you sure you want to delete this comment
      </h3>
      <div className="flex justify-between gap-4">
       <Button color="failure" onClick={handelDeleteComment}>
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

export default DashComments;
