import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
 HiUser,
 HiArrowSmRight,
 HiDocumentText,
 HiOutlineUserGroup,
 HiAnnotation,
 HiChartPie,
} from "react-icons/hi";
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
   <Sidebar className="w-14 xl:w-56 border-r dark:border-r-gray-700 ">
    <Sidebar.Items className="hidden  xl:flex">
     <Sidebar.ItemGroup className="flex flex-col">
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=dashboard">
        <Sidebar.Item active={tab === "dashboard"} icon={HiChartPie} as="div">
         Dashboard
        </Sidebar.Item>
       </Link>
      )}
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
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=users">
        <Sidebar.Item
         active={tab === "users"}
         icon={HiOutlineUserGroup}
         as="div"
        >
         Users
        </Sidebar.Item>
       </Link>
      )}
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=comments">
        <Sidebar.Item active={tab === "comments"} icon={HiAnnotation} as="div">
         Comments
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

    <Sidebar.Items className="block xl:hidden ">
     <Sidebar.ItemGroup className="flex flex-col">
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=dashboard">
        <Sidebar.Item className="-ml-2 w-12 h-10 mb-1">
         <HiChartPie className="w-8 h-10" />
        </Sidebar.Item>
       </Link>
      )}
      <Link to="/dashboard?tab=profile">
       <Sidebar.Item className="-ml-2 w-12 h-10 mb-1">
        <HiUser className="w-8 h-10 " />
       </Sidebar.Item>
      </Link>
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=posts">
        <Sidebar.Item className="-ml-2 w-12 h-10 mb-1">
         <HiDocumentText className="w-8 h-10" />
        </Sidebar.Item>
       </Link>
      )}
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=users">
        <Sidebar.Item className="-ml-2 w-12 h-10 mb-1">
         <HiOutlineUserGroup className="w-8 h-10" />
        </Sidebar.Item>
       </Link>
      )}
      {currentUser.isAdmin && (
       <Link to="/dashboard?tab=comments">
        <Sidebar.Item className="-ml-2 w-12 h-10 mb-1">
         <HiAnnotation className="w-8 h-10" />
        </Sidebar.Item>
       </Link>
      )}
      <Sidebar.Item className="-ml-2 w-12 h-10 mb-1">
       <HiArrowSmRight className="w-8 h-10" />
      </Sidebar.Item>
     </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  </>
 );
};

export default DashSidebar;
