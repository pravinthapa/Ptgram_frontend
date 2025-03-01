import React, { useState } from "react";
import Posts from "./Posts";
import ProfileIcon from "../../tools/ProfileIcon";
import { useAllUserData } from "../../hooks/useQueryData";
import items from "../../dummyjsons/explore.json"
export default function Home() {
  const { data } = useAllUserData();
  return (
    <div className=" mt-10 h-fit   rounded-md    ">
      <div className="flex  place-items-center w-[83%]  flex-col">
        <div className="flex gap-4">
          {items &&
            items?.slice(0, 7).map((item, index) => (
              <div key={index}>
                <ProfileIcon
                  profile={item?.content}
                  classNamediv={
                    "w-[70px] p-[3px] chronic  h-[70px]  flex justify-center rounded-full"
                  }
                  className={"w-[98%] object-cover"}
                />
              </div>
            ))}
        </div>
        <div className="h-[100%] w-[50%] rounded">
          <Posts />
        </div>
      </div>
    </div>
  );
}
