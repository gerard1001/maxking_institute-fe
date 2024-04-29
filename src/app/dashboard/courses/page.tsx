"use client";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";

const Courses = () => {
  const router = useRouter();
  const [value, setValue] = React.useState("course");
  console.log(value);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="">
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          aria-label="primary tabs example"
        >
          <Tab
            value="course"
            label="Courses"
            onClick={() => {
              router.push("/dashboard/courses");
            }}
          />
          <Tab
            value="categories"
            label="Categories"
            onClick={() => {
              router.push("/dashboard/courses/categories");
            }}
          />
          {/* <Tab
            value="subjects"
            label="Subjects"
            onClick={() => {
              router.push("/dashboard/courses/subjects");
            }}
          /> */}
        </Tabs>
      </Box>
    </div>
  );
};

export default Courses;
