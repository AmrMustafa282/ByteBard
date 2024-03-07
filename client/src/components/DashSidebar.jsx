import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiUser, HiArrowSmRight } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch()
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
    setTimeout(() => {
     dispatch(signoutSuccess(data));
    }, 2000);
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
      <ToastContainer />
   <Sidebar className="w-full md:w-56">
   <Sidebar.Items>
    <Sidebar.ItemGroup>
     <Link to="/dashboard?tab=profile">
      <Sidebar.Item
       active={tab === "profile"}
       icon={HiUser}
       label={"User"}
       labelColor="dark"
       as="div"
       >
       Profile
      </Sidebar.Item>
     </Link>
     <Sidebar.Item onClick={handelSignout} icon={HiArrowSmRight} as="div" className='cursor-pointer'>
      Sign Out
     </Sidebar.Item>
    </Sidebar.ItemGroup>
   </Sidebar.Items>
  </Sidebar>
        </>
 );
};

export default DashSidebar;
