import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";

import {
 signInStart,
 signInSuccess,
 signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

const SignIn = () => {
 const [formData, setFormData] = useState({});

 const { loading } = useSelector((state) => state.user);

 const navigate = useNavigate();
 const dispatch = useDispatch();
 const handelChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
 };
 const handelSubmit = async (e) => {
  e.preventDefault();
  if (!formData.email || !formData.password) {
   toast.error("Please fill out all fields!");
   return dispatch(signInFailure("Please fill out all fields!"));
  }
  try {
   dispatch(signInStart());
   const res = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (data.status === "failed") {
    toast.error(data.message);
    dispatch(signInFailure(data.message));
   }
   //  setLoading(false);
   if (res.ok) {
    dispatch(signInSuccess(data));
    // toast.success("Logged in successfully!");
    // setTimeout(() => {
     navigate("/");
    // }, 2000);
   }
  } catch (error) {
   dispatch(signInFailure(error.message));
  }
 };

 return (
  <div className="min-h-[55vh] mt-20 relative">
   <ToastContainer
    theme={useSelector((state) => state.theme).theme}
    closeOnClick
    pauseOnHover
    pauseOnFocusLoss
    draggable
    autoClose={3000}
    limit={3}
   />
   <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
    {/* left side */}
    <div className="flex-1">
     <Link
      to="/"
      className=" text-4xl sm:text-5xl lg:text-6xl font-bold px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
     >
      ByteBard
     </Link>
     <p className="text-sm mt-5">
      This is a demo project, You can sign up with your email and password or
      with Google.
     </p>
    </div>
    {/* right side */}
    <div className="flex-1">
     <form className="flex flex-col gap-4 " onSubmit={handelSubmit}>
      <div>
       <Label value="Your email" />
       <TextInput
        type="email"
        placeholder="name@company.com"
        id="email"
        onChange={handelChange}
       />
      </div>
      <div>
       <Label value="Your password" />
       <TextInput
        type="password"
        placeholder="********"
        id="password"
        onChange={handelChange}
       />
      </div>
      <Button gradientDuoTone={"purpleToPink"} type="submit" disabled={loading}>
       {loading ? (
        <>
         <Spinner size={"sm"} />
         <span className="pl-2">Loading...</span>
        </>
       ) : (
        "Sign In"
       )}
      </Button>
      <OAuth />
     </form>
     <div className="flex gap-2 text-sm mt-5">
      <span>Create new account?</span>
      <Link to="/sign-up" className="text-blue-500 ">
       Sign up
      </Link>
     </div>
    </div>
   </div>
   <div className="flex absolute bottom-5 right-5"></div>
  </div>
 );
};

export default SignIn;
