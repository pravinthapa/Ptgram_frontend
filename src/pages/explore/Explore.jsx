import React from "react";
import items from "../../dummyJsons/explore.json";

export default function Explore() {
  return (
    <div className="  align-middle h-full px-9 p-5">
      <div className="columns-3 w-full  ">
        {items?.map((item) => (
          <div className=" w-[100%] py-2">
            <img className=" object-contain w-full h-full " src={item.content} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
