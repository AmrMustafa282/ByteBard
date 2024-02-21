import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import Home from"./pages/Home"
import About from"./pages/About"
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import SignUp from"./pages/SignUp"
import SignIn from"./pages/SignIn"
import Header from "./components/Header";
import FooterFC from "./components/Footer";

function App() {
  return (
   
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='about' element={<About/>} />
        <Route path='/projects' element={<Projects/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='*' element={<div>404</div>} />
      </Routes>
      <FooterFC />
    </Router>
 );
}

export default App;
