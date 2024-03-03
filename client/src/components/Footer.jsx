import React from 'react'
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import {BsFacebook, BsGithub, BsLinkedin, BsTwitch, BsTwitterX} from 'react-icons/bs'

const FooterFC = () => {
  return (
   <Footer container className="border border-t-8 border-teal-500">
    <div className="w-full max-w-7xl mx-auto">
     <div className="grid w-full justify-between sm:flex md:grid-cols-1">
      <div className="mt-5 ">
       <Link
        to="/"
        className="self-center text-lg sm:text-xl font-semibold px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
       >
        BiteBard
       </Link>
      </div>
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-6 mt-4">
       <div>
        <Footer.Title title="About" />
        <Footer.LinkGroup col>
         <Footer.Link
          href="https://github.com/AmrMustafa282"
          target="_blanc"
          rel="noopener noreferrer"
         >
          100 JS Projects
         </Footer.Link>
         <Footer.Link href="/about" target="_blanc" rel="noopener noreferrer">
          ByteBard
         </Footer.Link>
        </Footer.LinkGroup>
       </div>
       <div>
        <Footer.Title title="Follow us" />
        <Footer.LinkGroup col>
         <Footer.Link
          href="https://github.com/AmrMustafa282"
          target="_blanc"
          rel="noopener noreferrer"
         >
          Github
         </Footer.Link>
         <Footer.Link
          href="https://www.linkedin.com/in/amr-mustafa-6534a5242/"
          target="_blanc"
          rel="noopener noreferrer"
         >
          LinkedIn
         </Footer.Link>
        </Footer.LinkGroup>
       </div>
       <div>
        <Footer.Title title="Legal" />
        <Footer.LinkGroup col>
         <Footer.Link href="#">Privacy Policy</Footer.Link>
         <Footer.Link href="#" target="_blanc" rel="noopener noreferrer">
          Terms &amp; Conditions
         </Footer.Link>
        </Footer.LinkGroup>
       </div>
      </div>
     </div>
     <Footer.Divider />
     <div>
      <Footer.Copyright
       href="#"
       by="Amr's Blog"
       year={new Date().getFullYear()}
      />
      <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
       <Footer.Icon
        href="https://www.facebook.com/profile.php?id=100012933486127"
        icon={BsFacebook}
       />
       <Footer.Icon
        href="https://www.linkedin.com/in/amr-mustafa-6534a5242/"
        icon={BsLinkedin}
       />
       <Footer.Icon href="https://github.com/AmrMustafa282" icon={BsGithub} />
       <Footer.Icon
        href="https://twitter.com/AmrMustafa115"
        icon={BsTwitterX}
       />
      </div>
     </div>
    </div>
   </Footer>
  );
}

export default FooterFC