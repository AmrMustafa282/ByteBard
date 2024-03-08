import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";

const SignUp = () => {
 const [formData, setFormData] = useState({});
 const [loading, setLoading] = useState(false);
 const navigate = useNavigate();
 const handelChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
 };
 const handelSubmit = async (e) => {
  e.preventDefault();
  if (!formData.name || !formData.email || !formData.password) {
   toast.error("Please fill out all fields!");
   return;
  }
  try {
   setLoading(true);
   const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (data.status === "failed") {
    setLoading(false);
    toast.error(data.message);
    return;
   }
   setLoading(false);
   if (res.ok) {
    toast.success("Account created successfully!");
    setTimeout(() => {
     navigate("/sign-in");
    }, 2000);
   }
  } catch (error) {
   toast.error(error.message);
   setLoading(false);
  }
 };
 //  console.log(formData);

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
       <Label value="Your name" />
       <TextInput
        type="text"
        placeholder="name"
        id="name"
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
      <OAuth />
     </form>
     <div className="flex gap-2 text-sm mt-5">
      <span>Have an account?</span>
      <Link to="/sign-in" className="text-blue-500 ">
       Sign in
      </Link>
     </div>
    </div>
   </div>
   <div className="flex absolute bottom-5 right-5"></div>
  </div>
 );
};

export default SignUp;
