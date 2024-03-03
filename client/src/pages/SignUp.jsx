import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
 Button,
 Label,
 Spinner,
 TextInput,
 Toast,
 ToastToggle,
} from "flowbite-react";
import { HiCheck, HiExclamation } from "react-icons/hi";

const SignUp = () => {
 const [formData, setFormData] = useState({});
 const [error, setError] = useState(null);
 const [loading, setLoading] = useState(false);
 const [done, setDone] = useState(false);
 const navigate = useNavigate();
 const handelChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
 };
 const handelSubmit = async (e) => {
  e.preventDefault();
  if (!formData.username || !formData.email || !formData.password) {
   return setError("Please fill out all fields!");
  }
  try {
   setLoading(true);
   setError(null);
   const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (data.status === "failed") {
    setLoading(false);
    return setError(data.message);
   }
   setLoading(false);
   if (res.ok) {
    setDone(true);
    setTimeout(() => {
     navigate("/sign-in");
    }, 1500);
   }
  } catch (error) {
   setError(error.message);
   setLoading(false);
  }
 };
 console.log(formData);
 return (
  <div className="min-h-[55vh] mt-20 relative">
   <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
    {/* left side */}
    <div className="flex-1">
     <Link
      to="/"
      className=" text-4xl sm:text-5xl lg:text-6xl font-bold px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
     >
      BiteBard
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
       <Label value="Your username" />
       <TextInput
        type="text"
        placeholder="Username"
        id="username"
        onChange={handelChange}
       />
      </div>
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
        "Sign Up"
       )}
      </Button>
     </form>
     <div className="flex gap-2 text-sm mt-5">
      <span>Have an account?</span>
      <Link to="/sign-in" className="text-blue-500 ">
       Sign in
      </Link>
     </div>
    </div>
    
     </div>
     <div className="flex absolute bottom-5 right-5">
     {error && (
      <Toast className="ml-auto mt-auto ">
       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
        <HiExclamation className="h-5 w-5" />
       </div>
       <div className="ml-3 text-sm font-normal">{error}.</div>
       <ToastToggle />
      </Toast>
     )}
     {done && (
      <Toast>
       <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <HiCheck className="h-5 w-5" />
       </div>
       <div className="ml-3 text-sm font-normal">
        Account created successfully.
       </div>
       <ToastToggle />
      </Toast>
     )}
    </div>
  </div>
 );
};

export default SignUp;
