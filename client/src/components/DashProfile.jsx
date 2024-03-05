import { Button, TextInput ,Toast, ToastToggle} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import  {
 getDownloadURL,
  ref,
  getStorage,
 uploadBytesResumable,
} from "firebase/storage";
import {app} from './../firebase'
import { HiCheck, HiExclamation } from "react-icons/hi";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
 const { currentUser } = useSelector((state) => state.user);
 const [imgFile, setImgFile] = useState(null);
 const [imageFileUrl, setImageFileUrl] = useState(null);
 const [imgFileUploadingProgress, setImgFileUploadingProgress] = useState(null);
  const [imgFileUploadingError, setImgFileUploadingError] = useState(null);
  const [done, setDone]= useState(false)
  const filePickerRef = useRef();
  


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
     setImgFileUploadingProgress(null)
     setImgFile(null);
     setImageFileUrl(null);
   },
   () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImageFileUrl(downloadURL);
      setImgFileUploadingError(false);
      setDone(true)
      setTimeout(() => {
        setDone(false)
      },5000)
    });
   }
  );
 };

 useEffect(() => {
  if (imgFile) uploadImage();
 }, [imgFile]);

 return (
  <div className="mx-auto max-w-lg p-3 w-full">
   <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
   <form className="flex flex-col gap-4">
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
                     ${imgFileUploadingProgress && imgFileUploadingProgress <100 && 'filter blur-sm'} 
           `}
     />
    </div>
    <TextInput
     type="text"
     id="name"
     placeholder="Name"
     defaultValue={currentUser.name}
    />
    <TextInput
     type="text"
     id="email"
     placeholder="Email"
     defaultValue={currentUser.email}
    />
    <TextInput type="password" id="password" placeholder="********" />
    <Button type="submit" gradientDuoTone="purpleToBlue" outline>
     {" "}
     Update
    </Button>
   </form>
   <div className="text-red-500 flex justify-between mt-5 ">
    <span>Delete Account</span>
    <span>Sign Out</span>
   </div>
   <div className="flex absolute bottom-5 right-5">
    {imgFileUploadingError && (
     <Toast animation="duration-1000" className="ml-auto mt-auto ">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
       <HiExclamation className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{error}.</div>
      <ToastToggle />
     </Toast>
    )}
    {done && (
     <Toast animation="duration-1000">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
       <HiCheck className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">
       Image uploaded successfully.
      </div>
      <ToastToggle />
     </Toast>
    )}
   </div>
  </div>
 );
};

export default DashProfile;
