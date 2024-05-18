import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaRegCopyright,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full bg-muted ">
      <div className="w-full bg-secondary-foreground/50 border-b h-fit flex items-center justify-center gap-4 py-2">
        <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#316FF6]">
          <FaFacebookSquare className="text-white text-2xl" />
        </div>
        <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#1DA1F2]">
          <FaTwitter className="text-white text-2xl" />
        </div>
        <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#FF0000]">
          <FaYoutube className="text-white text-2xl" />
        </div>
        <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#0072B1]">
          <FaLinkedin className="text-white text-2xl" />
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly py-4">
        <div className="flex flex-col">
          <img src="/logo.png" alt="LOGO" className="w-[120px] h-auto" />
          <div className="text-white">
            <p>+250 788 387 888</p>
            <p>+250 788 668 657</p>
            <p>info@maxkinginstitute.org</p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">Our Main Menu</h1>
          <div className="text-white pt-4">
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Contact Us
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              About Us
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Training Center
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Programs
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">Connect With Us</h1>
          <div className="text-white pt-4">
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              All Learners
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Alumni
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Our Staff
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">Resources</h1>
          <div className="text-white pt-4">
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Opportunities
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Services
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Courses
            </p>
            <p className="underline text-zinc-200 cursor-pointer hover:text-primary-foreground">
              Articles
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-stone-200 border-t h-fit flex flex-col items-center justify-center py-2">
        <h1 className="text-accent font-semibold text-sm">
          Maxking Institute, Kigali Rwanda
        </h1>
        <div className="text-sm text-gray-700 flex items-center">
          Copyright <FaRegCopyright className="w-3 mx-[2px]" /> 2024, All Rights
          Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
