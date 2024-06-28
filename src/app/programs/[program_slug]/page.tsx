"use client";

import React from "react";
import programs from "@/lib/utils/programs.json";
import Footer from "@/components/Footer";
import { Breadcrumbs, Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  fetchProgramByShort,
  selectPrograms,
  useDispatch,
  useSelector,
} from "@/lib/redux";

interface PageProps {
  params: {
    program_slug: string;
  };
}

const ProgramPage = ({ params: { program_slug } }: PageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { singleProgram } = useSelector(selectPrograms);
  const divRef = React.useRef<HTMLDivElement>(null);

  // const program = programs.find((program) => program.slug === program_slug);
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
      {singleProgram ? singleProgram.short : ""}
    </Typography>,
  ];

  React.useEffect(() => {
    dispatch(fetchProgramByShort(program_slug))
      .unwrap()
      .catch((err: any) => {
        if (err.statusCode === 404) {
          router.push("/programs");
        }
      });
  }, []);

  return (
    <div>
      {!singleProgram ? (
        <h1>Program not found</h1>
      ) : (
        <div className="p-10 lg:pt-0 pt-20">
          <h1 className="text-center text-3xl text-accent font-bold mt-6">
            {singleProgram.title}
          </h1>
          <Stack spacing={2} sx={{ my: 2 }}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
          <div className="flex md:flex-row flex-col gap-6">
            <img
              src={singleProgram.coverImage}
              alt=""
              className="object-cover rounded-md w-full max-w-[440px] aspect-square"
            />
            <div className="py-3">
              <div
                ref={divRef}
                dangerouslySetInnerHTML={{
                  __html: singleProgram.description,
                }}
              />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProgramPage;
