import axios from "axios";
import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashUsers = () => {
 const { currentUser } = useSelector((state) => state.user);
 const [users, setUsers] = useState([]);
 const [showMore, setShowMore] = useState(true);
 const [showModel, setShowModel] = useState(false);
 const [modelActoin, setModelAction] = useState(null);
 const [modelMessage, setModelMessage] = useState(null);
 const [userIdToDelete, setUserIdToDelete] = useState(null);
 const [userIdToBan, setUserIdToBan] = useState(null);

 const fetchUsers = async () => {
  try {
   const res = await axios.get(`/api/user/getusers`);
   if (res.status === 200) {
    setUsers(res.data.users);
    if (res.data.users.length < 9) setShowMore(false);
   }
  } catch (error) {
   console.log(error);
  }
 };
 const handelShowMore = async () => {
  const startIndex = users.length;
  try {
   const res = await axios.get(`/api/user/getusers?startIndex=${startIndex}`);
   if (res.status === 200) {
    setUsers((prev) => [...prev, ...res.data.users]);
    if (res.data.users.length < 9) {
     setShowMore(false);
    }
   }
  } catch (error) {
   console.log(error);
  }
 };
 const handelDeleteUser = async () => {
  setShowModel(false);
  try {
   const res = await axios.delete(
    `/api/user/delete/${userIdToDelete}/${currentUser._id}`
   );
   if (res.status === 201) {
    toast.success("User has been deleted");
    setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
   } else {
    return toast.error(res.data.message);
   }
  } catch (error) {
   toast.error(error.message);
  }
  };
  const handelBanUser = async () => {
      setShowModel(false);
      try {
       const res = await axios.put(
        `/api/user/ban/${userIdToBan}/${currentUser._id}`
       );
       if (res.status === 201) {
        toast.success("User has been baned");
        setUsers((prevUsers) =>
         prevUsers.map((user) =>
          user._id === userIdToBan ? { ...user, isActive: false } : user
         )
        );
       } else {
        return toast.error(res.data.message);
       }
      } catch (error) {
       toast.error(error.message);
      }
  }
 useEffect(() => {
  if (currentUser.isAdmin) fetchUsers();
 }, [currentUser._id]);

 return (
  <div className="text-center min-w-[70vw] table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-transparent scrollbar-thumb-slate-300 dark:scrollbar-track-transparent  dark:scrollbar-thumb-slate-500">
   {currentUser.isAdmin && users.length > 0 ? (
    <>
     <Table hoverable className="shoadow-md text-center ">
      <Table.Head>
       <Table.HeadCell>Data created</Table.HeadCell>
       <Table.HeadCell>User image</Table.HeadCell>
       <Table.HeadCell>name</Table.HeadCell>
       <Table.HeadCell>email</Table.HeadCell>
       <Table.HeadCell>Admin</Table.HeadCell>
       <Table.HeadCell>Active</Table.HeadCell>
       <Table.HeadCell>Ban</Table.HeadCell>
       <Table.HeadCell>Delete</Table.HeadCell>
      </Table.Head>
      {users.map((user) => (
       <Table.Body className="divide-y" key={user._id}>
        <Table.Row className="bg-white dark:bordergra700 dark:bg-gray-800">
         <Table.Cell>
          {new Date(user.createdAt).toLocaleDateString()}
         </Table.Cell>
         <Table.Cell>
          <img
           src={user.profilePicture}
           alt={user.name}
           className="rounded-full w-10 h-10 mx-auto object-contain  bg-gray-200"
          />
         </Table.Cell>
         <Table.Cell>{user.name}</Table.Cell>
         <Table.Cell>{user.email}</Table.Cell>
         <Table.Cell>
          {user.isAdmin ? (
           <FaCheck className="text-green-500 mx-auto" />
          ) : (
           <FaTimes className="text-red-500 mx-auto" />
          )}
         </Table.Cell>
         <Table.Cell>
          {user.isActive ? (
           <FaCheck className="text-green-500 mx-auto" />
          ) : (
           <FaTimes className="text-red-500 mx-auto" />
          )}
         </Table.Cell>
         <Table.Cell>
          <span
           onClick={() => {
            setShowModel(true);
                  setModelMessage("Are you sure you want to ban this user?");
                  setModelAction('ban')
            setUserIdToBan(user._id);
           }}
           className="font-medium text-red-500 hover:underline cursor-pointer"
          >
           Ban
          </span>
         </Table.Cell>
         <Table.Cell>
          <span
           onClick={() => {
            setShowModel(true);
                  setModelMessage("Are you sure you want to delete this user?");
                  setModelAction('delete')
            setUserIdToDelete(user._id);
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
    <p>There is no users!</p>
   )}
   <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
    <Modal.Header />
    <Modal.Body>
     <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
       {modelMessage}
      </h3>
      <div className="flex justify-between gap-4">
       <Button color="failure" onClick={modelActoin ==='delete'? handelDeleteUser:handelBanUser}>
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

export default DashUsers;
