import React from "react";
import { CircularProgress } from "@mui/material";
import clsx from "clsx";

const LoadinProgress = ({ className }: any) => {
  return (
    <div
      className={clsx(
        `h-full w-full flex flex-col justify-center items-center`,
        className
      )}
    >
      <CircularProgress sx={{ color: "#F8A51B" }} />
    </div>
  );
};
export default LoadinProgress;
