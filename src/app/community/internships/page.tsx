"use client";

import { Drawer, IconButton, Typography } from "@mui/material";
import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { useSnackbar } from "notistack";
import {
  fetchEvents,
  fetchSingleEvent,
  selectEvents,
  useDispatch,
  useSelector,
} from "@/lib/redux";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { objectIsEmpty } from "@/lib/functions/object_check.function";
import BackIconButton from "@/components/BackIconButton";
import Footer from "@/components/Footer";

const Internships = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const eventState = useSelector(selectEvents);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [eventId, setEventId] = React.useState<string>("");

  const openServiceDrawer = () => {
    setOpenDrawer(true);
  };
  const closeServiceDrawer = () => {
    setOpenDrawer(false);
  };

  React.useEffect(() => {
    dispatch(fetchEvents())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  React.useEffect(() => {
    if (eventId) {
      dispatch(fetchSingleEvent(eventId))
        .unwrap()
        .catch((err) => {
          enqueueSnackbar(err.message, { variant: "error" });
        });
    }
  }, [eventId]);

  return (
    <div className="">
      <div className="lg:p-10 p-4 py-14 mx-auto">
        <BackIconButton />
        <h1 className="text-4xl font-bold mb-4 text-secondary-foreground text-center">
          Look through our available internships
        </h1>
        <div className="flex gap-4 justify-center py-10">
          {eventState?.allEvents
            ?.filter((event) => event.type === "internship")
            .map((event) => (
              <div className="flex flex-col gap-2 max-w-[250px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded-lg">
                <img
                  src={event.coverImage}
                  alt=""
                  className="w-full aspect-video object-cover rounded-t-lg shadow-sm cursor-pointer"
                  onClick={() => {
                    setEventId(event.id);
                    openServiceDrawer();
                  }}
                />
                <div className="px-2 pb-2">
                  <Typography className="text-xl font-semibold text-accent line-clamp-1">
                    {event.title}
                  </Typography>
                  <Typography className="text-sm text-secondary-foreground mb-2 line-clamp-2">
                    {event.about}
                  </Typography>
                  <div className="flex gap-1">
                    <Typography className="text-sm font-bold text-secondary-foreground w-11">
                      Venue:
                    </Typography>

                    <Typography className="text-sm text-secondary-foreground">
                      {event.venue}
                    </Typography>
                  </div>
                  <div className="flex gap-1">
                    <Typography className="text-sm font-bold text-secondary-foreground w-11">
                      Starts:
                    </Typography>

                    <div className="">
                      <Typography className="text-sm text-secondary-foreground">
                        {dayjs(event.startDate).format("dddd, MMMM D, YYYY")}
                      </Typography>
                      <Typography className="text-sm text-secondary-foreground">
                        {dayjs(event.startTime).format("hh:mm A")}
                      </Typography>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    <Typography className="text-sm font-bold text-secondary-foreground w-11">
                      Ends:
                    </Typography>

                    <div className="">
                      <Typography className="text-sm text-secondary-foreground">
                        {dayjs(event.endDate).format("dddd, MMMM D, YYYY")}
                      </Typography>
                      <Typography className="text-sm text-secondary-foreground">
                        {dayjs(event.endTime).format("hh:mm A")}
                      </Typography>
                    </div>
                  </div>
                </div>{" "}
              </div>
            ))}
        </div>
        <Drawer
          open={openDrawer}
          onClose={closeServiceDrawer}
          className=""
          anchor="right"
        >
          <div className="max-w-[600px] min-w-[440px] w-full relative">
            <div className="sticky top-0 left-0 right-0 flex justify-between items-center px-6 backdrop-blur-sm bg-white/30 border-b z-50">
              <h1 className="text-xl font-bold text-secondary-foreground">
                Event details
              </h1>
              <IconButton onClick={closeServiceDrawer} className="">
                <MdOutlineClose className="" />
              </IconButton>
            </div>
            {eventState?.event && !objectIsEmpty(eventState?.event) && (
              <div className="p-10 pt-4">
                <h1 className="text-xl text-center font-bold text-secondary-foreground">
                  {eventState?.event?.title}
                </h1>
                <img
                  src={eventState?.event?.coverImage}
                  alt=""
                  className="w-[90%] max-w-[440px] mx-auto my-4"
                />
                <Typography className="mb-4">
                  {eventState?.event?.about}
                </Typography>
                <div className="flex gap-1">
                  <Typography className="font-bold text-secondary-foreground w-11">
                    Venue:
                  </Typography>

                  <Typography className="text-secondary-foreground">
                    {eventState?.event?.venue}
                  </Typography>
                </div>
                <div className="flex gap-1">
                  <Typography className="font-bold text-secondary-foreground w-11">
                    Starts:
                  </Typography>

                  <div className="">
                    <Typography className="text-secondary-foreground">
                      {dayjs(eventState?.event?.startDate).format(
                        "dddd, MMMM D, YYYY"
                      )}
                    </Typography>
                    <Typography className="text-secondary-foreground">
                      {dayjs(eventState?.event?.startTime).format("hh:mm A")}
                    </Typography>
                  </div>
                </div>

                <div className="flex gap-1">
                  <Typography className="font-bold text-secondary-foreground w-11">
                    Ends:
                  </Typography>

                  <div className="">
                    <Typography className="text-secondary-foreground">
                      {dayjs(eventState?.event?.endDate).format(
                        "dddd, MMMM D, YYYY"
                      )}
                    </Typography>
                    <Typography className="text-secondary-foreground">
                      {dayjs(eventState?.event?.endTime).format("hh:mm A")}
                    </Typography>
                  </div>
                </div>
                <h1 className="text-xl font-bold text-secondary-foreground mt-4">
                  Requirements
                </h1>
                <ul className="list-disc">
                  {JSON.parse(eventState?.event?.requirements)?.map(
                    (requ: string) => (
                      <li>{requ}</li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </Drawer>
      </div>
      <Footer />
    </div>
  );
};

export default Internships;
