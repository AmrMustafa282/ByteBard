import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight, HiDocumentText } from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const DashSidebar = () => {
 const location = useLocation();
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const { currentUser } = useSelector((state) => state.user);
 const [tab, setTab] = useState("");
 const handelSignout = async () => {
  try {
   const res = await fetch("/api/user/signout", {
    method: "POST",
   });
   const data = await res.json();
   if (!res.ok) {
    toast.error(data.message);
   } else {
    dispatch(signoutSuccess(data));
    navigate("/sign-in");
   }
  } catch (error) {
   toast.error(error.message);
  }
 };
 useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  if (urlParams.get("tab")) setTab(urlParams.get("tab"));
 }, [location.search]);
 return (
  <>
   <ToastContainer
    theme={useSelector((state) => state.theme).theme}
    closeOnClick
    pauseOnHover
    pauseOnFocusLoss
    draggable
    autoClose={3000}
    limit={3}
   />
   <Sidebar className="w-full md:w-56 border-r dark:border-r-gray-700 ">
    <Sidebar.Items>
     <Sidebar.ItemGroup className="flex flex-col">
      <Link to="/dashboard?tab=profile">
       <Sidebar.Item
        active={tab === "profile"}
        icon={HiUser}
        label={currentUser.isAdmin ? "Admin" : "User"}
        labelColor="dark"
        as="div"
       >
        Profile
       </Sidebar.Item>
      </Link>
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=posts">
        <Sidebar.Item active={tab === "posts"} icon={HiDocumentText} as="div">
         Posts
        </Sidebar.Item>
       </Link>
      )}
      <Sidebar.Item
       onClick={handelSignout}
       icon={HiArrowSmRight}
       as="div"
       className="cursor-pointer"
      >
       Sign Out
      </Sidebar.Item>
     </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  </>
 );
};

export default DashSidebar;
