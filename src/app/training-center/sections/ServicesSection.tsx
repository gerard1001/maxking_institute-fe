"use client";

import React from "react";
import Drawer from "@mui/material/Drawer";
import { IconButton } from "@mui/material";
import { MdOutlineClose } from "react-icons/md";
import {
  fetchServices,
  fetchSingleService,
  selectServices,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useSnackbar } from "notistack";
import LoadinProgress from "@/components/LoadingProgess";

const ServicesSection = () => {
  const dispatch = useDispatch();
  const { services, singleService, loading } = useSelector(selectServices);
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const divRef = React.useRef<HTMLDivElement>(null);

  const openServiceDrawer = () => {
    setOpen(true);
  };
  const closeServiceDrawer = () => {
    setOpen(false);
  };

  const handleFetchService = async (id: string) => {
    dispatch(fetchSingleService(id))
      .unwrap()
      .then((res) => {
        if (res.statusCode === 200) {
          openServiceDrawer();
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  };

  React.useEffect(() => {
    dispatch(fetchServices())
      .unwrap()
      .catch((err: any) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          preventDuplicate: true,
        });
      });
  }, []);

  return (
    <div className="flex flex-col items-start lg:gap-4 gap-2">
      <h1 className="text-secondary text-3xl mx-auto font-bold uppercase">
        Our services
      </h1>
      <div className="flex items-center flex-wrap gap-8 xl:justify-start justify-center w-full lg:pt-10 pt-2">
        {services?.map((service, index: number) => {
          return (
            <div
              key={service.id}
              className="w-[250px] aspect-square hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg xs:p-6 p-2 cursor-pointer transition-all duration-200  hover:scale-105"
              onClick={() => {
                handleFetchService(service.id);
              }}
            >
              <img
                src={service.coverImage}
                alt={service.title}
                className="mx-auto w-[50px] aspect-square"
              />
              <h1 className="w-full text-center my-3 sm:h-9 h-auto text-accent font-bold">
                {service.title}
              </h1>
              <p className="line-clamp-4 text-center">{service.description}</p>
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
          <>
            {loading ? (
              <LoadinProgress />
            ) : (
              <>
                {((): any => {
                  return (
                    <div className="py-14 px-4">
                      <img
                        src={singleService.coverImage}
                        alt={singleService.title}
                        className="mx-auto w-[100px] aspect-square"
                      />
                      <h1 className="w-full mt-3 text-accent text-2xl font-bold">
                        {singleService.title}
                      </h1>
                      <p className="mb-2">{singleService.description}</p>
                      <div className="py-3">
                        <div
                          ref={divRef}
                          dangerouslySetInnerHTML={{
                            __html: singleService.body,
                          }}
                        />
                      </div>
                    </div>
                  );
                })()}
              </>
            )}
          </>
        </div>
      </Drawer>
    </div>
  );
};

export default ServicesSection;
