"use client";

import React from "react";
import services from "@/lib/utils/services.json";
import Image from "next/image";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";

const ServicesSection = () => {
  const [open, setOpen] = React.useState(false);
  const [serviceIndex, setServiceIndex] = React.useState<number>(0);

  const openServiceDrawer = () => {
    setOpen(true);
  };
  const closeServiceDrawer = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-col items-start lg:gap-4 gap-2">
      <h1 className="text-primary-foreground text-xl mx-auto font-bold uppercase">
        Our services
      </h1>
      <div className="flex items-center flex-wrap gap-8 xl:justify-start justify-center w-full lg:pt-10 pt-2">
        {services?.map((service, index: number) => {
          return (
            <div
              key={service.id}
              className="w-[250px] aspect-square hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg xs:p-6 p-2 cursor-pointer transition-all duration-200  hover:scale-105"
              onClick={() => {
                openServiceDrawer();
                setServiceIndex(index);
              }}
            >
              <Image
                src={service.image}
                width={50}
                height={50}
                alt={service.title}
                className="mx-auto"
              />
              <h1 className="w-full text-center my-3 sm:h-9 h-auto text-accent font-bold">
                {service.title}
              </h1>
              <p className="line-clamp-4 text-center">
                {service.descriptions[0]}
              </p>
            </div>
          );
        })}
      </div>
      <Drawer
        open={open}
        onClose={closeServiceDrawer}
        className=""
        anchor="right"
      >
        <div className="max-w-[600px] w-full relative">
          <IconButton
            onClick={closeServiceDrawer}
            className="absolute top-4 right-4"
          >
            <MdOutlineClose className="" />
          </IconButton>
          {((): any => {
            const activeService = services[serviceIndex];
            return (
              <div className="py-14 px-4">
                <Image
                  src={activeService.image}
                  width={100}
                  height={100}
                  alt={activeService.title}
                  className="mx-auto"
                />
                <h1 className="w-full mt-3 text-accent text-2xl font-bold">
                  {activeService.title}
                </h1>
                {activeService.descriptions.map((desc, idx) => {
                  return <p className="mb-2">{desc}</p>;
                })}
                {activeService.subTitles &&
                  activeService.subTitles.map((subTitle, idx) => {
                    return (
                      <div key={idx} className="">
                        <h1 className="text-accent font-semibold mt-4 underline">
                          {subTitle.title}
                        </h1>
                        {subTitle.descriptions.map((desc, idx) => {
                          return <p className="mb-2">{desc}</p>;
                        })}
                      </div>
                    );
                  })}
              </div>
            );
          })()}
        </div>
      </Drawer>
    </div>
  );
};

export default ServicesSection;
