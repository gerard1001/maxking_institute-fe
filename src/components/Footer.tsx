"use client";

import { useRouter } from "next/navigation";
import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaRegCopyright,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const router = useRouter();
  return (
    <div className="w-full bg-muted ">
      <div className="w-full bg-secondary-foreground/50 border-b h-fit flex items-center justify-center gap-4 py-2">
        <a
          href="https://www.facebook.com/share/rB4org7SdPGkMBNC/?mibextid=qi2Omg"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#316FF6]">
            <FaFacebookSquare className="text-white text-2xl" />
          </div>
        </a>
        <a
          href="https://x.com/maxkinginstitut/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#1DA1F2]">
            <FaTwitter className="text-white text-2xl" />
          </div>
        </a>
        <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#FF0000]">
          <FaYoutube className="text-white text-2xl" />
        </div>
        <a
          href="https://www.linkedin.com/in/max-king-s-institute-b72974314/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="w-fit aspect-square p-2 rounded-full flex flex-col items-center justify-center bg-[#0072B1]">
            <FaLinkedin className="text-white text-2xl" />
          </div>
        </a>
      </div>
      <div className="flex flex-wrap justify-evenly py-4 items-end">
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold text-white">Quick links</h1>
          <div className="flex flex-wrap justify-evenly gap-10">
            <div className="text-white pt-4">
              <div className="">
                <a
                  href="/about"
                  className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                >
                  About Us
                </a>
              </div>
              <div className="">
                <a
                  href="/e-campus"
                  className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                >
                  E-campus
                </a>
              </div>
              <div className="">
                <a
                  href="/programs"
                  className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                >
                  Programs
                </a>
              </div>
            </div>{" "}
            <div className="flex flex-col">
              <div className="text-white pt-4">
                <div className="">
                  <a
                    href="/contact-us"
                    className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                  >
                    Contact Us
                  </a>
                </div>
                <div className="">
                  <p
                    onClick={() => {
                      router.push("/about/#staff");
                    }}
                    className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                  >
                    Our Staff
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-white pt-4">
                <div className="">
                  <a
                    href="/community#opportunities"
                    className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                  >
                    Opportunities
                  </a>
                </div>
                <div className="">
                  <a
                    href="/services"
                    className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                  >
                    Services
                  </a>
                </div>
                <div className="">
                  <a
                    href="/courses"
                    className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                  >
                    Courses
                  </a>
                </div>
                <div className="">
                  <a
                    href="/articles"
                    className="text-zinc-200 cursor-pointer hover:text-primary-foreground"
                  >
                    Articles
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="text-white">
            <p>+250 788 387 888</p>
            <p>info@maxkinginstitute.org</p>
          </div>
        </div>
      </div>
      <div className="w-full bg-stone-200 border-t h-fit flex flex-col items-center justify-center py-2">
        <h1 className="text-accent font-semibold text-sm">
          Max king's Institute, Kigali Rwanda
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
