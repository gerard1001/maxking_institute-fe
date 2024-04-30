"use client";

import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { IoChevronBackOutline } from "react-icons/io5";

const BackIconButton = () => {
  const router = useRouter();
  return (
    <div>
      {" "}
      <IconButton
        onClick={() => {
          router.back();
        }}
        className="mb-6 bg-muted/20 hover:bg-muted/50"
      >
        <IoChevronBackOutline className="text-accent" />
      </IconButton>
    </div>
  );
};

export default BackIconButton;
