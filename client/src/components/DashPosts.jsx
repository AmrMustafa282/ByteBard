import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashPosts = () => {
 const [userPosts, setUserPosts] = useState([]);
 const { currentUser } = useSelector((state) => state.user);
 console.log(userPosts);

 const fetchPosts = async () => {
  try {
   const res = await axios.get(`/api/post/getposts?userId=${currentUser._id}`);
   if (res.status === 200) {
    setUserPosts(res.data.posts);
   }
  } catch (error) {
   console.log(error);
  }
 };
 useEffect(() => {
  if (currentUser.isAdmin) fetchPosts();
 }, [currentUser._id]);


 return (
  <div

   className="min-w-[70vw] table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-track-transparent  dark:scrollbar-thumb-slate-500"
  >
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
       <Table.Body className="divide-y">
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
          <span className="font-medium text-red-500 hover:underline cursor-pointer">
           Delete
          </span>
         </Table.Cell>
         <Table.Cell>
          <Link
           to={`/update-posts/${post._id}`}
           className="text-blue-700  hover:underline"
          >
           <span>Edit</span>
          </Link>
         </Table.Cell>
        </Table.Row>
       </Table.Body>
      ))}
     </Table>
    </>
   ) : (
    <p>You have no posts yes!</p>
   )}
  </div>
 );
};

export default DashPosts;
