import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from './../components/DashSidebar'
import DashProfile from './../components/DashProfile'
import DashPosts from "../components/DashPosts"
import DashUsers from "../components/DashUsers"
import DashComments from "../components/DashComments"
import DashboardComponent from "../components/DashboardComponent"

const Dashboard = () => {
  const location = useLocation()
  // console.log(location);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    if (urlParams.get("tab")) setTab(urlParams.get("tab"));
  },[location.search])

  return (
   <div className=" flex flex-grow flex-row">
    {/* 6xl:container 6xl:mx-auto */}
      <div
        className="xl:w-56 "
      >
     <DashSidebar />
    </div>
    {tab === "profile" && <DashProfile />}
    {tab === "posts" && <DashPosts />}
    {tab === "users" && <DashUsers />}
    {tab === "comments" && <DashComments />}
    {tab === "dashboard" && <DashboardComponent />}
   </div>
  );
}

export default Dashboard