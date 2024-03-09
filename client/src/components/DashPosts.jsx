import axios from "axios";
import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { CircularProgressbar } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";


const DashPosts = () => {
 const [userPosts, setUserPosts] = useState([]);
 const { currentUser } = useSelector((state) => state.user);
 const [showMore, setShowMore] = useState(true);
  const [showModel, setShowModel] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null)


 const fetchPosts = async () => {
  try {
   const res = await axios.get(`/api/post/getposts?userId=${currentUser._id}`);
   if (res.status === 200) {
    setUserPosts(res.data.posts);
    if (res.data.posts.length < 9) setShowMore(false);
   }
  } catch (error) {
   console.log(error);
  }
 };
 const handelShowMore = async () => {
  const startIndex = userPosts.length;
  try {
   const res = await axios.get(
    `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
   );
   if (res.status === 200) {
    setUserPosts((prev) => [...prev, ...res.data.posts]);
    if (res.data.posts.length < 9) {
     setShowMore(false);
    }
   }
  } catch (error) {
   console.log(error);
  }
 };
  const handelDeletePost = async () => {
    setShowModel(false)
  try {
    const res = await axios.delete(`/api/post/delete/${postIdToDelete}/${currentUser._id}`)
    if (res.status === 201)
    {
      toast.success('Post has been deleted')
      setUserPosts((prev)=>prev.filter((post=> post._id !== postIdToDelete)));
    } else {
      return toast.error(res.data.message);
      }
  } catch (error) {
    toast.error(error.message);
  }
}
 useEffect(() => {
  if (currentUser.isAdmin) fetchPosts();
 }, [currentUser._id]);

 return (
  <div className="text-center min-w-[70vw] table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-track-transparent  dark:scrollbar-thumb-slate-500">
   {currentUser.isAdmin && userPosts.length > 0 ? (
    <>
     <Table hoverable className="shoadow-md text-center ">
      <Table.Head>
       <Table.HeadCell>Data updated</Table.HeadCell>
       <Table.HeadCell>Post image</Table.HeadCell>
       <Table.HeadCell>Post title</Table.HeadCell>
       <Table.HeadCell>Category</Table.HeadCell>
       <Table.HeadCell>Delete</Table.HeadCell>
       <Table.HeadCell>
        <span>Edit</span>
       </Table.HeadCell>
      </Table.Head>
      {userPosts.map((post) => (
       <Table.Body className="divide-y" key={post._id}>
        <Table.Row className="bg-white dark:bordergra700 dark:bg-gray-800">
         <Table.Cell>
          {new Date(post.updatedAt).toLocaleDateString()}
         </Table.Cell>
         <Table.Cell>
          <Link to={`/posts/${post.slug}`}>
           <img
            src={post.image}
            alt="post img"
            className="w-20 h-10 mx-auto object-cover bg-gray-200"
           />
          </Link>
         </Table.Cell>
         <Table.Cell>
          <Link
           to={`/posts/${post.slug}`}
           className="font-medium text-gray-900 dark:text-white"
          >
           {post.title}
          </Link>
         </Table.Cell>
         <Table.Cell>{post.category}</Table.Cell>
         <Table.Cell>
          <span
           onClick={() => {
                  setShowModel(true);
                  setPostIdToDelete(post._id);
           }}
           className="font-medium text-red-500 hover:underline cursor-pointer"
          >
           Delete
          </span>
         </Table.Cell>
         <Table.Cell>
          <Link
           to={`/update-post/${post._id}`}
           className="text-blue-700  hover:underline"
          >
           <span>Edit</span>
          </Link>
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
    <p>You have no posts yes!</p>
   )}
   <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
    <Modal.Header />
    <Modal.Body>
     <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
       Are you sure you want to delete this post?
      </h3>
      <div className="flex justify-between gap-4">
       <Button color="failure" onClick={handelDeletePost}>
        Yes, I'm sure
       </Button>
       <Button color="gray" onClick={() => setShowModel(false)}>
        Cancel
       </Button>
      </div>
     </div>
    </Modal.Body>
   </Modal>
   <ToastContainer
    theme={useSelector((state) => state.theme).theme}
    closeOnClick
    pauseOnHover
    pauseOnFocusLoss
    draggable
    autoClose={3000}
    limit={3}
   />
  </div>
 );
};

export default DashPosts;
