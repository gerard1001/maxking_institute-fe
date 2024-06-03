"use client";

import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useSnackbar } from "notistack";
import { fetchTweets, useDispatch } from "@/lib/redux";
import Tweets from "./tweets/page";
import Events from "./events/page";
import Internships from "./internships/page";
import Jobs from "./jobs/page";
import Trainings from "./trainings/page";

const UpdatesPage = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = React.useState<
    "tweets" | "events" | "jobs" | "internships" | "trainings"
  >("tweets");

  React.useEffect(() => {
    dispatch(fetchTweets())
      .unwrap()
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  }, []);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: "tweets" | "events" | "jobs" | "internships" | "trainings"
  ) => {
    setValue(newValue);
  };
  return (
    <div>
      <Box className="">
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab
            value="tweets"
            label="Tweets"
            // onClick={() => {
            //   router.push("/dashboard/updates/tweets");
            // }}
          />
          <Tab
            value="events"
            label="Events"
            // onClick={() => {
            //   router.push("/dashboard/updates/events");
            // }}
          />
          <Tab
            value="jobs"
            label="Jobs"
            // onClick={() => {
            //   router.push("/dashboard/updates/jobs");
            // }}
          />
          <Tab
            value="internships"
            label="Internships"
            // onClick={() => {
            //   router.push("/dashboard/updates/internships");
            // }}
          />
          <Tab
            value="trainings"
            label="Trainings"
            // onClick={() => {
            //   router.push("/dashboard/updates/trainings");
            // }}
          />
        </Tabs>
      </Box>
      {value === "tweets" && <Tweets />}
      {value === "events" && <Events />}
      {value === "internships" && <Internships />}
      {value === "jobs" && <Jobs />}
      {value === "trainings" && <Trainings />}
    </div>
  );
};

export default UpdatesPage;
