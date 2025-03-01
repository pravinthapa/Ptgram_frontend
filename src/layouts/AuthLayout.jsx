import React from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";
  const isLogin = location.pathname === "/login";

  return (
    <div className="flex h-[100vh] overflow-hidden">
      <div
        className={`duration-300 transform transition-all ${
          isSignup ? "w-[30%]" : "w-0"
        } bg-black`}
      ></div>
      <div className="w-[70%] bg-white flex items-center justify-center">
        <Outlet />
      </div>
      <div
        className={`duration-300 transform transition-all ${
          isLogin ? "w-[30%]" : "w-0"
        } bg-black`}
      ></div>
    </div>
  );
}
