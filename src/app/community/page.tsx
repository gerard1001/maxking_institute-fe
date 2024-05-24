"use client";

import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import React from "react";

const Community = () => {
  const router = useRouter();
  return (
    <>
      <div className="lg:p-10 p-4 pt-20">
        <h1 className="text-center text-3xl text-accent uppercase font-bold mb-10 mt-4">
          MKI community
        </h1>
        <div className="flex flex-wrap items-center justify-evenly gap-4">
          <div
            className="p-3 aspect-[3/2] min-w-[250px] bg-pink rounded-md cursor-pointer hover:bg-pink/80"
            onClick={() => {
              router.push("/community/forum");
            }}
          >
            <div className="w-full h-full rounded-md border-[1.5px] border-dashed border-primary-foreground flex flex-col items-center justify-center">
              <h1 className="uppercase text-3xl text-white font-bold">Forum</h1>
            </div>
          </div>
          <div
            className="p-3 aspect-[3/2] min-w-[250px] bg-secondary rounded-md cursor-pointer hover:bg-secondary/80"
            onClick={() => {
              router.push("/community/membership");
            }}
          >
            <div className="w-full h-full rounded-md border-[1.5px] border-dashed border-primary-foreground flex flex-col items-center justify-center">
              <h1 className="uppercase text-3xl text-white font-bold">
                MEMBERSHIP
              </h1>
            </div>
          </div>
          <div className="p-3 aspect-[3/2] min-w-[250px] bg-[#105450] rounded-md">
            <div className="w-full h-full rounded-md border-[1.5px] border-dashed border-primary-foreground flex flex-col items-center justify-center">
              <h1 className="uppercase text-3xl text-white font-bold">
                ALUMNI
              </h1>
            </div>
          </div>
          <div className="p-3 aspect-[3/2] min-w-[250px] bg-primary rounded-md">
            <div className="w-full h-full rounded-md border-[1.5px] border-dashed border-primary-foreground flex flex-col items-center justify-center">
              <h1 className="uppercase text-3xl text-white font-bold">
                EVENTS
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community;
