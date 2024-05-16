"use client";

import React from "react";
import programs from "@/lib/utils/programs.json";
import Footer from "@/components/Footer";
import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    program_slug: string;
  };
}

const ProgramPage = ({ params: { program_slug } }: PageProps) => {
  const router = useRouter();
  const program = programs.find((program) => program.slug === program_slug);
  const breadcrumbs = [
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/programs"
      onClick={() => {
        router.back();
      }}
    >
      Programs
    </Link>,
    <Typography key="3" color="text.primary">
      {program ? program.slug : ""}
    </Typography>,
  ];

  return (
    <div>
      {!program ? (
        <h1>Program not found</h1>
      ) : (
        <div className="p-10 pt-0">
          <h1 className="text-center text-3xl text-accent font-bold mt-6">
            {program.title}
          </h1>
          <Stack spacing={2} sx={{ my: 2 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <div className="flex gap-6">
            <img
              src={program.image}
              alt=""
              className="object-cover rounded-md w-full max-w-[440px] aspect-square"
            />
            <div className="">
              {program.descriptions?.map((desc) => {
                return <p className="mb-2">{desc}</p>;
              })}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProgramPage;
