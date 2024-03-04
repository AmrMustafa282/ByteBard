import React from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const auth = getAuth(app);
 const handelGoogleClick = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  try {
    const resFromGoogle = await signInWithPopup(auth, provider);
    // console.log(resFromGoogle);
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: resFromGoogle.user.displayName,
        email: resFromGoogle.user.email,
        googlePhotoUrl: resFromGoogle.user.photoURL
      })
    })
    const data = await res.json();
    if (res.ok) {
      dispatch(signInSuccess(data))
        navigate('/');
    }
  } catch (error) {
   console.log(error);
  }
 };

 return (
  <Button
   type="button"
   gradientDuoTone={"pinkToOrange"}
   outline
   onClick={handelGoogleClick}
  >
   <AiFillGoogleCircle className="w-6 h-6 mr-2" />
   Continue with Google
  </Button>
 );
};

export default OAuth;
