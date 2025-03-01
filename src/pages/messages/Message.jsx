import React, { useState } from "react";
import joel from "../../assets/assets/joel.jpeg";
import pawan from "../../assets/assets/pawan.jpeg";
import suyog from "../../assets/assets/suyog.jpeg";
import amir from "../../assets/assets/amir.jpeg";
import rojan from "../../assets/assets/rojan.jpeg";
import prabin from "../../assets/assets/prabin.jpg";
import ChatBox from "./ChatBox";
import { FaSearch } from "react-icons/fa";
import { useAllUserData, useUserData } from "../../hooks/useQueryData";
import { timeAgo } from "../../tools/converter";
export default function Message() {
  const [chatData, setChatData] = useState();
  const { data } = useAllUserData();
  const { data: userData } = useUserData();

  return (
    <div className=" h-full overflow-hidden w-full  rounded-lg flex flex-col">
      <div className="flex h-full ">
        <div className="h-full  place-items-center border-2 w-[25%] z-10 overflow-y-auto scrollbar-hide rounded-lg">
          <div className="w-[85%] mt-5 flex bg-slate-200 items-center rounded-lg p-2">
            <FaSearch className="text-slate-500" />
            <input
              type="search"
              className={
                "text-black p-1 bg-inherit w-full   focus-within:outline-none"
              }
              placeholder="Search user"
            />
          </div>
          <div className="flex mt-10 flex-col w-[90%]  gap-2  ">
            {data?.map((item, index) => (
              <div
                key={index}
                onClick={() => setChatData(item)}
                className="hover:border-white duration-300  border-2 border-black rounded-lg gap-2 overflow-x-hidden w-full  h-fit flex p-2"
              >
                <img
                  src={item?.profile ?? "./profile.jpg"}
                  className="rounded-full object-cover  h-[50px]"
                />

                <div>
                  <p className="text-lg">{item?.username}</p>
                  <p className="text-sm">{timeAgo(item?.updatedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {chatData ? (
          <div className="h-full border-2 w-[75%] rounded-lg">
            <ChatBox chatData={chatData} userData={userData} />
          </div>
        ) : (
          <div className=" font-extrabold text-3xl w-[75%] h-full flex justify-center   items-center ">
            <p> No messages yet!!!</p>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
