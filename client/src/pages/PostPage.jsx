import axios from "axios";
import { Button, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
 docco,
 atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useSelector } from "react-redux";
import CallToAction from "../components/CallToAction";
import CommentSec from "../components/CommentSec";

const PostPage = () => {
 const { theme } = useSelector((state) => state.theme);
 const { postSlug } = useParams();
 const [loading, setLoading] = useState(true);
 const [post, setPost] = useState(null);

 const fetchPost = async () => {
  try {
   setLoading(true);
   const res = await axios.get(`/api/post/getposts?slug=${postSlug}`);
   if (!res.status === 200) {
    return toast.error(res.data.message);
   }
   setPost(res.data.posts[0]);
   setLoading(false);
  } catch (error) {
   setLoading(false);
   toast.error(error.message);
  }
 };
 useEffect(() => {
  fetchPost();
 }, [postSlug]);

 return (
  <>
   {loading && (
    <div className="flex justify-center items-center min-h-[70vh]">
     <Spinner size="xl" />
    </div>
   )}
   {post && (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-[70vh]">
     <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
      {post.title}
     </h1>
     <Link
      to={`/search?category=${post.category}`}
      className="self-center mt-5"
     >
      <Button color="gray" pill size="xs">
       {post.category}
      </Button>
     </Link>
     <img
      src={post.image}
      alt={post.title}
      className="mt-10 p-3 max-h-[600px] w-full object-cover"
     />
     <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      <span className="italic">
       {(post.content.length / 1000).toFixed(0)} mins read
      </span>
     </div>

     <div
      className="p-3 max-w-2xl mx-auto w-full post-content"
      dangerouslySetInnerHTML={{ __html: post.content }}
     ></div>
     <div className="max-w-4xl mx-auto w-full">
      <CallToAction />
         </div>
         <CommentSec postId={post._id} />
    </main>
   )}
  </>
 );
};

export default PostPage;
