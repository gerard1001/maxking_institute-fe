import React from "react";
import { CircularProgress } from "@mui/material";

const LoadinProgress = () => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <CircularProgress sx={{ color: "#F8A51B" }} />
    </div>
  );
};
export default LoadinProgress;
