import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import DashSidebar from './../components/DashSidebar'
import DashProfile from './../components/DashProfile'
import DashPosts from "../components/DashPosts"

const Dashboard = () => {
  const location = useLocation()
  // console.log(location);
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    if (urlParams.get("tab")) setTab(urlParams.get("tab"));
  },[location.search])

  return (
   <div className="6xl:container 6xl:mx-auto flex flex-grow flex-col md:flex-row">
    <div className="md:w-56">
     {/* Sidebar */}
     <DashSidebar />
    </div>
    {/* profile ... */}
    {tab === "profile" && <DashProfile />}
    {tab === "posts" && <DashPosts />}
   </div>
  );
}

export default Dashboard