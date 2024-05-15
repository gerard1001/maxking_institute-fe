import Footer from "@/components/Footer";
import React from "react";

const Community = () => {
  return (
    <>
      <div className="lg:p-10 p-4 pt-20">
        <div className="flex flex-wrap items-center justify-evenly gap-4">
          <div className="p-3 aspect-[3/2] min-w-[250px] bg-pink rounded-md">
            <div className="w-full h-full rounded-md border-[1.5px] border-dashed border-primary-foreground flex flex-col items-center justify-center">
              <h1 className="uppercase text-3xl text-white font-bold">Forum</h1>
            </div>
          </div>
          <div className="p-3 aspect-[3/2] min-w-[250px] bg-secondary rounded-md">
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
