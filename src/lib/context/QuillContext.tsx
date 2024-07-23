"use client";

import React, { createContext, useState } from "react";

type QuillContextType = {
  uploadLoading: boolean;
  setUploadLoading: React.Dispatch<React.SetStateAction<boolean>>;
  uploadError: string;
  setUploadError: React.Dispatch<React.SetStateAction<string>>;
};
const QuillContextState = {
  uploadLoading: false,
  setUploadLoading: () => {},
  uploadError: "",
  setUploadError: () => {},
};

export const QuillContext = createContext<QuillContextType>(QuillContextState);

const QuillContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string>("");

  React.useEffect(() => {}, []);

  return (
    <QuillContext.Provider
      value={{
        uploadLoading,
        setUploadLoading,
        uploadError,
        setUploadError,
      }}
    >
      {children}
    </QuillContext.Provider>
  );
};

export default QuillContextProvider;
