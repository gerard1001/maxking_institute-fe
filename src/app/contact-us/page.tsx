"use client";

import DashboardFooter from "@/components/DashboardFooter";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  message: yup.string().required(),
});

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

  const onsubmit = (data: FormInputs) => {
    setLoading(true);
    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          from_email: data.email,
          to_name: "Max King's Institute",
          message: data.message,
        },
        publicKey
      )
      .then(
        () => {
          reset();
          alert("Message sent successfully! Thank you for contacting us.");
        },
        (error) => {
          console.log(error);
          alert("Failed to send message. Please try again later.");
        }
      )
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex lg:flex-row flex-col items-center lg:p-10 md:p-4 p-2 mb-12">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onsubmit)}
          className="w-full md:p-10 p-0 lg:mt-0 md:mt-4 mt-12 flex flex-col items-center justify-center"
        >
          <h1 className="text-accent text-3xl font-semibold text-center">
            CONTACT US
          </h1>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="filled"
                required
                className="w-full max-w-[640px] mt-8"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="filled"
                required
                className="w-full max-w-[640px] mt-6"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="filled-multiline-flexible"
                label="Type your message here..."
                multiline
                maxRows={4}
                minRows={4}
                variant="filled"
                className="w-full max-w-[640px] mt-6"
                error={!!errors.message}
                helperText={errors.message ? errors.message.message : ""}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            className="w-full max-w-[640px] mt-6 py-3 bg-secondary text-white"
            disabled={loading}
          >
            {loading ? "Loading..." : "Send Message"}
          </Button>
        </Box>
        <div className="lg:w-[50%] w-fit bg-slate-200 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)] lg:p-10 sm:p-4 p-2 sm:mt-0 mt-10">
          <h1 className="text-accent text-2xl font-semibold">Our Contacts</h1>
          <div className="flex flex-col mt-4">
            <p className="text-muted">
              <span className="font-bold">Phone 1:</span> +250 788 387 888
            </p>
            <p className="text-muted">
              {" "}
              <span className="font-bold">Phone 2:</span> +250 788 668 657
            </p>
          </div>
          <h1 className="text-accent text-2xl font-semibold mt-8">
            Our Social Media
          </h1>
          <div className="w-full h-fit flex items-center gap-4 py-2 pt-4">
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
