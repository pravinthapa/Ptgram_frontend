import React from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchField({ placeholder, className }) {
  return (
    <div>
      <div className="flex bg-gray-600 w-[400px] rounded-full h-fit">
        <div className="text-white text-[19px]  mt-2 ml-2">
          <IoSearch />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className={`  bg-gray-600 ${className} `}
        />
      </div>
    </div>
  );
}
