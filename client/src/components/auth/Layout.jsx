import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 items-center justify-center bg-background">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
