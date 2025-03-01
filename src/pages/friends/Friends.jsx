import React, { useState } from "react";
import Suggestions from "./Suggestions";
import FriendList from "./FriendList";

export default function Friends() {
  const [active, setActive] = useState(1);

  const arr = [
    { title: "Connections", id: 1 },
    { title: "Suggestions", id: 2 },
  ];
  return (
    <div className=" w-full  h-full o ">
      <div className="flex gap-10 p-10">
        {arr?.map((item, index) => (
          <h1
            key={index}
            onClick={() => setActive(item?.id)}
            className={`${
              active === item?.id ? "text-[20px] border-b-2 " : "text-[19px]"
            }  w-fit `}
          >
            {item?.title}
          </h1>
        ))}
      </div>
      <div className=" w-full h-[80%] scrollbar-hide overflow-y-scroll ">
        {active === 1 ? <FriendList /> : <Suggestions />}
      </div>
    </div>
  );
}
