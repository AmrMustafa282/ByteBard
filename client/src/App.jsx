import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
// import { useSelector } from "react-redux";

import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Header from "./components/Header";
import FooterFC from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import UpdatePost from "./pages/UpdataPost";
import PostPage from "./pages/PostPage";
import ScrollToTop from "./components/ScrollToTop";
import Search from "./pages/Search";

function App() {
 return (
  <Router>
   <ScrollToTop />
   <Header />
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="/projects" element={<Projects />} />
    <Route path="/search" element={<Search />} />
    <Route path="/posts/:postSlug" element={<PostPage />} />
    <Route element={<PrivateRoute />}>
     <Route path="/dashboard" element={<Dashboard />} />
    </Route>
    <Route element={<OnlyAdminPrivateRoute />}>
     <Route path="/create-post" element={<CreatePost />} />
    </Route>
    <Route element={<OnlyAdminPrivateRoute />}>
     <Route path="/update-post/:postId" element={<UpdatePost />} />
    </Route>
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/sign-in" element={<SignIn />} />
    <Route path="*" element={<div>404</div>} />
   </Routes>
   <FooterFC />
  </Router>
 );
}

export default App;
