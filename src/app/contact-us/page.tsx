import DashboardFooter from "@/components/DashboardFooter";
import { Button, TextField } from "@mui/material";
import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const ContactUs = () => {
  return (
    <>
      <div className="flex p-10 mb-12">
        <div className="w-full p-10">
          <h1 className="text-accent text-3xl font-semibold text-center">
            CONTACT US
          </h1>
          <TextField
            label="Name"
            variant="filled"
            required
            className="w-full max-w-[640px] mt-8"
          />
          <TextField
            label="Email"
            variant="filled"
            required
            className="w-full max-w-[640px] mt-6"
          />
          <TextField
            id="filled-multiline-flexible"
            label="Type your message here..."
            multiline
            maxRows={4}
            minRows={4}
            variant="filled"
            className="w-full max-w-[640px] mt-6"
          />
          <Button
            variant="contained"
            className="w-full max-w-[640px] mt-6 py-3 bg-secondary text-white"
          >
            Send Message
          </Button>
        </div>
        <div className="w-[50%] min-h-[70vh]">
          <h1 className="text-accent text-2xl font-semibold">Our Contacts</h1>
          <div className="flex flex-col mt-4">
            <p className="text-muted">Phone1: +250 788 387 888</p>
            <p className="text-muted">Phone2: +250 788 668 657</p>
          </div>
          <h1 className="text-accent text-2xl font-semibold mt-8">
            Our Social Media
          </h1>
          <div className="w-full bg-secondary-foreground/50 h-fit flex items-center gap-4 py-2 pt-4">
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
          <h1 className="text-accent text-2xl font-semibold mt-6">Email Us</h1>
          <div className="flex flex-col mt-4">
            <p className="text-muted">
              For any concerns, Brand Information & General Inquiries:
              <span className="font-semibold">info@maxkinginstitute.org</span>
            </p>
          </div>
        </div>
      </div>
      <DashboardFooter />
    </>
  );
};

export default ContactUs;
