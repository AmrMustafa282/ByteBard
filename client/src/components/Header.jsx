import React from "react";
import { Link, useLocation } from "react-router-dom";

import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { Button, Navbar, TextInput } from "flowbite-react";
import logo from "../assets/logo.png";

const Header = () => {
 const path = useLocation().pathname;
 return (
  <Navbar className="border-b-2">
   <Link
    to="/"
    className="self-center text-sm sm:text-xl lg:text-4xl font-semibold px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
   >
    BiteBard
   </Link>

   <div className="flex gap-2 md:order-2">
    <form>
     <TextInput
      type="text"
      placeholder="Search..."
      rightIcon={AiOutlineSearch}
      className="hidden lg:inline"
     />
    </form>
    <Button className="w-12 h-10 lg:hidden" color="gray">
     <AiOutlineSearch />
    </Button>

    <Button className="w-12 h-10  sm:inline" color="gray">
     <FaMoon />
    </Button>
    <Link to="/sign-in">
     <Button gradientDuoTone="purpleToBlue">Sign In</Button>
    </Link>
    <Navbar.Toggle />
   </div>

   <Navbar.Collapse className=" ml-auto pr-12">
    <Navbar.Link active={path === "/"} as={"div"} gradientDuoTone="purpleToBlue">
     <Link  to="/">Home</Link>
    </Navbar.Link>
    <Navbar.Link active={path === "/projects"} as={"div"}>
     <Link to="/projects">Projects</Link>
    </Navbar.Link>
    <Navbar.Link active={path === "/about"} as={"div"}>
     <Link to="/about">About</Link>
    </Navbar.Link>
   </Navbar.Collapse>
  </Navbar>
 );
};

export default Header;
