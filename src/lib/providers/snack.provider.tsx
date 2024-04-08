"use client";

import * as React from "react";
import { SnackbarProvider } from "notistack";

const SnackProvider = (props: React.PropsWithChildren) => {
  return (
    <SnackbarProvider autoHideDuration={3000} maxSnack={3}>
      {props.children}
    </SnackbarProvider>
  );
};

export default SnackProvider;
