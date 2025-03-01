import React, { useState } from "react";
import Navbar from "../pages/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../pages/navbar/SideBar";

export default function BaseLayout() {
  const [active, setActive] = useState(0);
  const location = useLocation();

  return (
    <div className="h-[100vh]   overflow-y-auto">
      <Navbar setActive={setActive} active={active} />
      <div
        className={`flex  height overflow-y-hidden scrollbar-hide   text-white`}
      >
        <div
          className={` ${
            location?.pathname === "/inbox" ? "w-[6%]" : "w-[20%]"
          } bg-black   overflow-y-auto scrollbar-hide `}
        >
          <SideBar setActive={setActive} active={active} />
        </div>
        <div className={` ${location?.pathname === "/inbox" ? "w-[94%]" : "w-[80%]" } h-[100%] bg-black  box-border  overflow-y-auto scrollbar-hide`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
