import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {
 getDownloadURL,
 ref,
 getStorage,
 uploadBytesResumable,
} from "firebase/storage";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


import { app } from "./../firebase";
import {
 updateStart,
 updateSuccess,
 updateFailure,
 deleteStart,
 deleteSuccess,
 deleteFailure,
 signoutSuccess,
} from "./../redux/user/userSlice.js";

const DashProfile = () => {
 const { currentUser ,loading} = useSelector((state) => state.user);
 const [imgFile, setImgFile] = useState(null);
 const [imageFileUrl, setImageFileUrl] = useState(null);
 const [imgFileUploadingProgress, setImgFileUploadingProgress] = useState(null);
 const [imgFileUploadingError, setImgFileUploadingError] = useState(null);
 const [imgFileUploading, setImgFileUploading] = useState(false);
 const [formData, setFormData] = useState({});
 const [showModel, setShowModel] = useState(false);
 const filePickerRef = useRef();

 const dispatch = useDispatch();

 const handelImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
   setImgFile(file);
   setImageFileUrl(URL.createObjectURL(file));
  }
 };

 const uploadImage = async () => {
  //     service firebase.storage {
  //   match /b/{bucket}/o {
  //     match /{allPaths=**} {
  //       allow read;
  //       allow write: if
  //       request.resource.size <5 * 1024 * 1024 &&
  //       request.resource.contentType.match('image/.*')
  //     }
  //   }
  // }
  setImgFileUploadingError(null);
  setImgFileUploading(true);
  const storage = getStorage(app);
  const fileName = new Date().getTime() + imgFile.name;
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, imgFile);
  uploadTask.on(
   "state_changed",
   (snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setImgFileUploadingProgress(progress.toFixed(0));
   },
   (error) => {
    setImgFileUploadingError(
     "Could not upload image (File must be less than 5MB)"
    );
    setImgFileUploadingProgress(null);
    setImgFile(null);
    setImageFileUrl(null);
    setImgFileUploading(false);
   },
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
     setImageFileUrl(downloadURL);
     setFormData({ ...formData, profilePicture: downloadURL });
     setImgFileUploadingError(false);
     setImgFileUploading(false);
     toast.success("Image uploaded successfully!");
    });
   }
  );
 };
 const handelChange = (e) =>
  setFormData({ ...formData, [e.target.id]: e.target.value });

 const handelSubmit = async (e) => {
  e.preventDefault();
  if (Object.keys(formData).length === 0) {
   toast.error("No changes made");
   return;
  }
  if (imgFileUploading) {
   toast.warning("Please wait for image to upload!");
   return;
  }
  try {
   dispatch(updateStart());
   const res = await fetch(`/api/user/update/${currentUser._id}`, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (!res.ok) {
    dispatch(updateFailure(data.message));
    toast.error(`${imgFileUploadingError}.`);
    return;
   } else {
    dispatch(updateSuccess(data));
    toast.success("Data is updated successfully!");
    setFormData({});
   }
  } catch (err) {
   dispatch(updateFailure(err.message));
   toast.error(`${err.message}.`);
  }
 };

 const handelDeleteUser = async () => {
  setShowModel(false);
  try {
   dispatch(deleteStart());
   const res = await fetch(`/api/user/delete/${currentUser._id}`, {
    method: "DELETE",
   });
   const data = await res.json();
   if (!res.ok) {
    dispatch(deleteFailure(data.message));
    toast.error(data.message);
   } else {
    dispatch(deleteSuccess());
   }
  } catch (error) {
   toast.error(error.message);
   dispatch(deleteFailure(error.message));
  }
 };

 const handelSignout = async () => {
  try {
   const res = await fetch("/api/user/signout", {
    method: "POST",
   });
   const data = await res.json();
   if (!res.ok) {
    toast.error(data.message);
   } else {
     dispatch(signoutSuccess(data));
   }
  } catch (error) {
   toast.error(error.message);
  }
 };

 useEffect(() => {
  if (imgFile) uploadImage();
 }, [imgFile]);

 return (
  <div className="mx-auto max-w-lg p-3 w-full">
   <ToastContainer
    theme={useSelector((state) => state.theme).theme}
    closeOnClick
    pauseOnHover
    pauseOnFocusLoss
    draggable
       autoClose={3000}
       limit={3}
   />
   
   <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
   <form onSubmit={handelSubmit} className="flex flex-col gap-4">
    <input
     type="file"
     accept="image/*"
     onChange={handelImageChange}
     ref={filePickerRef}
     hidden
    />
    <div
     className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
     onClick={() => filePickerRef.current.click()}
    >
     {imgFileUploadingProgress && (
      <CircularProgressbar
       value={imgFileUploadingProgress || 0}
       strokeWidth={5}
       styles={{
        root: {
         width: "100%",
         height: "100%",
         position: "absolute",
         top: 0,
         left: 0,
        },
        path: {
         stroke: `rgba(80, 230, 80, ${imgFileUploadingProgress / 100})`,
        },
       }}
      />
     )}
     <img
      src={imageFileUrl || currentUser.profilePicture}
      alt="user"
      className={`rounded-full h-full w-full object-cover border-4 border-[lightgray]
                     ${
                      imgFileUploadingProgress &&
                      imgFileUploadingProgress < 100 &&
                      "filter blur-sm"
                     } 
           `}
     />
    </div>
    <TextInput
     type="text"
     id="name"
     placeholder="Name"
     defaultValue={currentUser.name}
     onChange={handelChange}
    />
    <TextInput
     type="text"
     id="email"
     placeholder="Email"
     defaultValue={currentUser.email}
     onChange={handelChange}
    />
    <TextInput
     type="password"
     id="password"
     placeholder="********"
     onChange={handelChange}
    />
    <Button type="submit" gradientDuoTone="purpleToBlue" outline disabled={loading||imgFileUploading}>
      {loading || imgFileUploading ?'Loading...':'Update'}
       </Button>
       {
         currentUser.isAdmin && (
           <Link to={'/create-post'}>
           <Button type="button" gradientDuoTone='purpleToPink' className="w-full" outline >
             Create a post
           </Button>
           </Link>
         )
       }
   </form>
   <div className="text-red-500 flex justify-between mt-5 ">
    <Button
     color="red"
     onClick={() => setShowModel(true)}
     className="cursor-pointer"
    >
     Delete Account
    </Button>
    <Button color="red" className="cursor-pointer" onClick={handelSignout}>
     Sign Out
    </Button>
   </div>
   <div className="flex absolute bottom-5 right-5"></div>
   <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md">
    <Modal.Header />
    <Modal.Body>
     <div className="text-center">
      <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
      <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
       Are you sure you want to delete your account?
      </h3>
      <div className="flex justify-between gap-4">
       <Button color="failure" onClick={handelDeleteUser}>
        Yes, I'm sure
       </Button>
       <Button color="gray" onClick={() => setShowModel(false)}>
        Cancel
       </Button>
      </div>
     </div>
    </Modal.Body>
   </Modal>
  </div>
 );
};

export default DashProfile;
