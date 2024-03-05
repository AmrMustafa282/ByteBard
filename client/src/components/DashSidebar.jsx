
import {Sidebar} from 'flowbite-react'
import { useEffect, useState } from 'react';
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom';
const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState("");
    useEffect(() => {
     const urlParams = new URLSearchParams(location.search);
     if (urlParams.get("tab")) setTab(urlParams.get("tab"));
    }, [location.search]);
  return (
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
      <Sidebar.Item icon={HiArrowSmRight} as="div">
       Sign Out
      </Sidebar.Item>
     </Sidebar.ItemGroup>
    </Sidebar.Items>
   </Sidebar>
  );
}

export default DashSidebar