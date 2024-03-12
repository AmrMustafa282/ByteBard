import {
 getDownloadURL,
 getStorage,
 ref,
 uploadBytesResumable,
} from "firebase/storage";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { app } from "../firebase";

const CreatePost = () => {
 const navigate = useNavigate();
 const [file, setFile] = useState(null);
 const [imgUplaodProgress, setImgUplaodProgress] = useState(null);
 const [formData, setFormData] = useState({});

 //  const handelUploadImage = async () => {
 //   try {
 //    if (!file) {
 //     toast.error("Please select an image");
 //     return;
 //    }
 //    const storage = getStorage(app);
 //    const fileName = new Date().getTime() + "-" + file.name;
 //    const storageRef = ref(storage, fileName);
 //    const uploadTask = uploadBytesResumable(storageRef, file);
 //    uploadTask.on(
 //     "state_changed",
 //     (snapshot) => {
 //      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
 //      setImgUplaodProgress(progress.toFixed(0));
 //     },
 //     (error) => {
 //      toast.error("Image upload failed");
 //      setImgUplaodProgress(null);
 //     },
 //     () => {
 //      getDownloadURL(uploadTask.snapshot.ref).then((downloaURL) => {
 //       toast.success("Image uploaded successfully");
 //       setImgUplaodProgress(null);
 //       setFormData({ ...formData, image: downloaURL });
 //      });
 //     }
 //    );
 //   } catch (error) {
 //    toast.error("Image upload failed");
 //    setImgUplaodProgress(null);
 //   }
 //  };

 const handelUploadImage = async () => {
  try {
   if (!file) {
    toast.error("Please select an image");
    return;
   }

   const storage = getStorage(app);
   const fileName = new Date().getTime() + "-" + file.name;
   const storageRef = ref(storage, fileName);
   const uploadTask = uploadBytesResumable(storageRef, file);

   toast.promise(
    new Promise((resolve, reject) => {
     uploadTask.on(
      "state_changed",
      (snapshot) => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       setImgUplaodProgress(progress.toFixed(0));
      },
      (error) => {
       reject(error);
      },
      async () => {
       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
       setFormData({ ...formData, image: downloadURL });
       setImgUplaodProgress(null);
       resolve(downloadURL);
      }
     );
    }),
    {
     pending: "Uploading...",
     success: "Image uploaded successfully",
     error: "Image upload failed",
     duration: 3000,
    }
   );
  } catch (error) {
   toast.error("Image upload failed");
  }
 };

 const handelSubmit = async (e) => {
  e.preventDefault();
  try {
   const res = await fetch("/api/post/create", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (!res.ok) {
    toast.error("Publish failed!");
    return;
   }
   toast.success("Post published successfully!");
   setFormData({});
   setTimeout(() => {
    navigate(`/posts/${data.slug}`);
   }, 2000);
  } catch (error) {
   toast.error(
    "Something went wrong, make sure you chosed a unique title and filled the content."
   );
  }
 };

 return (
  <div className="p-3 max-w-3xl mx-auto  w-full">
   <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
   <form onSubmit={handelSubmit} className="flex flex-col gap-4">
    <div className="flex flex-col gap-4 sm:flex-row justify-between">
     <TextInput
      type="text"
      placeholder="Title"
      required
      id="title"
      className="flex-1"
      onChange={(e) => {
       setFormData({ ...formData, title: e.target.value });
      }}
     />
     <Select
      onChange={(e) => {
       setFormData({ ...formData, category: e.target.value });
      }}
     >
      <option value="uncategorized">Select a category</option>
      <option value="javascript">JavaScript</option>
      <option value="reactjs">React.js</option>
      <option value="nextjs">Next.js</option>
     </Select>
    </div>
    <div
     className="flex gap-4 rounded-lg items-center justify-between border-2 border-gray-300  dark:border-gray-500 
      p-3 "
    >
     <FileInput
      type="file"
      accept="image/*"
      onChange={(e) => setFile(e.target.files[0])}
     />
     <Button
      type="button"
      gradientDuoTone="purpleToBlue"
      size="sm"
      outline
      onClick={handelUploadImage}
      disabled={imgUplaodProgress}
     >
      {!imgUplaodProgress ? "Upload Image" : "Pending..."}
     </Button>
    </div>
    {formData.image && (
     <img
      src={formData.image}
      alt="upload"
      className="w-full h-96 object-cover "
     />
    )}
    <ReactQuill
     theme="snow"
     placeholder="Write something..."
     className="h-72 mb-12 "
     required
     onChange={(value) => {
      setFormData({ ...formData, content: value });
     }}
    />
    <Button type="submit" gradientDuoTone="purpleToPink">
     Publish
    </Button>
   </form>
  </div>
 );
};

export default CreatePost;
