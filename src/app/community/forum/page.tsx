"use client";

import Footer from "@/components/Footer";
import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

const Forum = () => {
  const router = useRouter();
  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/community"
      onClick={() => {
        router.back();
      }}
    >
      Community
    </Link>,
    <Typography key="3" color="text.primary">
      Forum
    </Typography>,
  ];
  return (
    <div className="p-10 pt-0">
      <Stack spacing={2} sx={{ my: 2 }}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <div className="m">
        <h1 className="text-2xl text-accent/50 font-bold">RMA Forum</h1>
        <p className="text-lg text-accent/80 font-semibold">
          Warm welcome to our ground for:
        </p>
        <h1 className="text-accent/80 font-bold my-4 flex items-start gap-3">
          {" "}
          💬 Interactive Engagements:{" "}
          <span className="font-medium max-w-[400px]">
            Engage in dynamic discussions, workshops, and seminars to foster
            collaboration, innovation, and growth.
          </span>
        </h1>{" "}
        <h1 className="text-accent/80 font-bold my-4 flex items-start gap-3">
          {" "}
          🏢 Professional Space:
          <span className="font-medium max-w-[400px]">
            Experience an elegantly designed space that promotes focus,
            creativity, and productivity for professionals across industries.
          </span>
        </h1>{" "}
        <h1 className="text-accent/80 font-bold my-4 flex items-start gap-3">
          {" "}
          🤝 Share and Experience:
          <span className="font-medium max-w-[400px]">
            Exchange ideas, insights, and inspirations with peers from diverse
            backgrounds to contribute to collective wisdom and personal growth.
          </span>
        </h1>{" "}
        <h1 className="text-accent/80 font-bold my-4 flex items-start gap-3">
          {" "}
          💡 Propose Possible Inputs:
          <span className="font-medium max-w-[400px]">
            Challenge the status quo, present ideas, receive feedback, and
            collaborate on solutions for professional and community health
            development.
          </span>
        </h1>{" "}
      </div>
      <div className="">
        <h1 className="text-red-500 underline font-semibold cursor-pointer hover:text-red-400">
          Request Access Here
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default Forum;
