import React from "react";
import items from "../../dummyJsons/pravin.json";
import "./Animation.css";
export default function Animation() {
  return (
    <>
      <h1 className="text-center text-3xl font-bold font-mono">Animation</h1>
      <div className="w-full  relative h-[150vh]">
        <div
          className="slider absolute w-[250px] h-[250px]"
          style={`--quantity: ${items?.length} `}
        >
          {items?.map((item, index) => (
            <div
              key={index}
              className="item  "
              style={`--position: ${index}`}
            >
              <img
                src={item?.img}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
          ))}
        </div>
        <div
          className="slider2 absolute w-[250px] h-[250px]"
          style={`--quantity: ${items?.length} `}
        >
          {items?.map((item, index) => (
            <divs
              key={index}
              className="item2"
              style={`--position: ${index}`}
            >
              <img
                src={item?.img}
                className="w-full h-full object-cover"
                alt=""
              />
            </divs>
          ))}
        </div>
      </div>
    </>
  );
}
