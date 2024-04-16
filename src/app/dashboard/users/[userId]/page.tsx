"use client";

import React from "react";

interface SingleUserProps {
  params: {
    userId: string;
  };
}

const UserPage = ({ params: { userId } }: SingleUserProps) => {
  return <div>{userId}</div>;
};

export default UserPage;
