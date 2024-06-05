"use client";

import courseDurationAnalytics from "@/lib/analytics/courseDurationAnalytics";
import coursePricesAnalytics from "@/lib/analytics/coursePricesAnalytics";
import mostLearnedCoursesAnalytics from "@/lib/analytics/mostLearnedCoursesAnalytics";
import userRoleAnalytics from "@/lib/analytics/userRoleAnalytics";
import { Article } from "@/lib/interfaces/article.interface";
import { ICourse } from "@/lib/interfaces/course.interface";
import { User } from "@/lib/interfaces/user.interface";
import { Box, styled, Typography } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { memo, useMemo } from "react";
import { Chart } from "react-google-charts";

interface GraphBoxProps {
  name: string;
  classes?: any;
  children: React.ReactNode;
  className?: string;
}

const GraphBox = styled(
  ({ name, classes = {}, children, className, ...props }: GraphBoxProps) => (
    <Box
      className={clsx("w-full h-full", className)}
      sx={{
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        mb: 2,
      }}
      {...props}
    >
      <Typography className="text-accent/40 text-sm m-4 leading-tight">
        {name}
      </Typography>
      <Box className={classes.graphBox}>{children}</Box>
    </Box>
  )
)(() => ({}));

interface AdminAnalyticsGraphsProps {
  users: User[];
  courses: ICourse[];
  articles: Article[];
  range?: string;
}

const AdminAnalyticsGraphs = memo(
  ({ users, courses, articles }: AdminAnalyticsGraphsProps) => {
    const router = useRouter();
    const userRolesData = useMemo(() => userRoleAnalytics(users), [users]);
    const mostLearnedCoursesData = useMemo(
      () => mostLearnedCoursesAnalytics(courses),
      [courses]
    );
    const coursePricesData = useMemo(
      () => coursePricesAnalytics(courses),
      [courses]
    );
    const courseDurationData = useMemo(
      () => courseDurationAnalytics(courses),
      [courses]
    );

    return (
      <>
        <h1 className="md:text-5xl text-2xl text-accent-foreground font-bold text-center">
          Analytics Page
        </h1>
        <p></p>
        <div className="bg-none rounded-md flex flex-wrap items-center justify-center gap-4 mb-5 p-10">
          <div
            className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white hover:bg-slate-200 cursor-pointer flex flex-col items-center justify-center rounded-lg min-w-[250px] aspect-video"
            onClick={() => {
              router.push("/dashboard/users");
            }}
          >
            <div className="text-6xl text-accent/40 font-bold">
              {users?.length}
            </div>
            <div className="text-muted">Total Users</div>
          </div>
          <div
            className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white hover:bg-slate-200 cursor-pointer flex flex-col items-center justify-center rounded-lg min-w-[250px] aspect-video"
            onClick={() => {
              router.push("/dashboard/courses");
            }}
          >
            <div className="text-6xl text-accent/40 font-bold">
              {courses?.length}
            </div>
            <div className="text-muted">Total Courses</div>
          </div>
          <div
            className="shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white hover:bg-slate-200 cursor-pointer flex flex-col items-center justify-center rounded-lg min-w-[250px] aspect-video"
            onClick={() => {
              router.push("/dashboard/articles");
            }}
          >
            <div className="text-6xl text-accent/40 font-bold">
              {articles?.length}
            </div>
            <div className="text-muted">Total Articles</div>
          </div>
        </div>
        <GraphBox name="User Roles">
          <Chart
            chartType="PieChart"
            data={userRolesData}
            options={{
              backgroundColor: "",
              slices: [{ color: "#1D91C0" }, { color: "#225EA8" }],
              legend: "none",
              chartArea: { width: "100%", height: "90%" },
            }}
          />
        </GraphBox>
        <GraphBox name="Top 10 Most learnt courses">
          <Chart
            chartType="ColumnChart"
            data={mostLearnedCoursesData}
            options={{
              backgroundColor: "",
              hAxis: {
                gridlines: { color: "transparent" },
              },
              vAxis: {
                gridlines: { color: "transparent" },
              },
              legend: {
                position: "none",
              },
              chartArea: {
                width: "80%",
                height: "80%",
              },
            }}
          />
        </GraphBox>
        <GraphBox name="Course prices ($)">
          <Chart
            chartType="BarChart"
            data={coursePricesData}
            options={{
              backgroundColor: "",
              hAxis: {
                gridlines: { color: "#E0E6F1" },
              },
              vAxis: {
                gridlines: { color: "#E0E6F1" },
              },
              legend: {
                position: "none",
              },
              chartArea: {
                width: "80%",
                height: "80%",
              },
            }}
          />
        </GraphBox>
        <GraphBox
          name="Course Duration Count"
          classes={{
            graphBox: "pb-1",
          }}
        >
          <Chart
            chartType="ColumnChart"
            data={courseDurationData}
            options={{
              backgroundColor: "",
              hAxis: {
                gridlines: { color: "transparent" },
              },
              vAxis: {
                gridlines: { color: "transparent" },
              },
              legend: {
                position: "bottom",
              },
              colors: ["#6A8DE9", "#16F0E7"],
              chartArea: {
                width: "80%",
                height: "65%",
              },
            }}
          />
        </GraphBox>
      </>
    );
  }
);

export default AdminAnalyticsGraphs;
