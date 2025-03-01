import React from "react";
import { RxCross2 } from "react-icons/rx";
export default function Notification({ setActive }) {
  return (
    <>
      <div className=" overflow-hidden   h-full  bg-black justify-normal">
        <div className="flex   pt-6 justify-between">
          <h1 className="text-[25px]  font-bold">Notification</h1>
          <p onClick={() => setActive()} className="text-[25px] cursor-pointer">
            <RxCross2 />
          </p>
        </div>
     
        <div className="bg-[rgba(84,84,84,0.6)] h-[0.5px] mt-5 w-[110%]"></div>
        <p className="mt-5">Recent</p>
        <div className="text-center flex justify-center h-[60%] items-center ">
          <p className="text-white">No recent notification</p>
        </div>
      </div>
    </>
  );
}
