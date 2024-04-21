"use client";

import React, { useState } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Articles = () => {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <section className="w-full flex flex-col gap-6 pb-10">
        <div className="">
          {" "}
          <Button
            className={`bg-secondary text-white`}
            onClick={() => {
              router.push("/dashboard/articles/new");
            }}
          >
            Add New
          </Button>
        </div>
        <div className="w-full h-fit flex flex-col items-start">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            Featured Articles
          </h1>
          <div className="w-full flex items-center gap-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg min-h-[180px]"></div>
        </div>
        <div className="w-full h-fit flex flex-col items-start">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            Saved Articles
          </h1>
          <div className="w-full flex items-center gap-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg min-h-[180px]"></div>
        </div>
        <div className="w-full h-fit flex flex-col items-start">
          <h1 className="text-xl font-semibold ml-1 text-accent">
            All Articles
          </h1>
          <div className="w-full flex items-center gap-8 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] py-3 px-8 rounded-lg min-h-[180px]"></div>
        </div>
      </section>
    </ProtectedRoute>
  );
};

export default Articles;
