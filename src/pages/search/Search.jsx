import React, { useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useAllUserData } from "../../hooks/useQueryData";
import { timeAgo } from "../../tools/converter";
export default function Search({ setActive }) {
  const { data } = useAllUserData();
  const [searchText, setSearchText] = useState();
  const filteredData = useMemo(() => {
    if (!searchText) return [];
    return data.filter((filter) => {
      const search = filter?.username;

      const searchedText = searchText ? search?.includes(searchText) : true;

      return searchedText;
    });
  }, [searchText]);
  return (
    <>
      <div className="w-full overflow-hidden h-full  bg-black justify-normal">
        <div className="flex   pt-6 justify-between">
          <h1 className="text-[25px]  font-bold">Search</h1>{" "}
          <p onClick={() => setActive()} className="text-[25px] cursor-pointer">
            <RxCross2 />
          </p>
        </div>
        <div className="p-2  mt-10  flex justify-between items-center px-6 rounded-xl  bg-[rgba(84,84,84)] border-b-2 border-b-[rgba(84,84,84,0.6)]">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            placeholder={"Search"}
            className={
              "focus-within:outline-none placeholder:text-white  bg-transparent text-white pl-2"
            }
          />

          <p className="rounded-full bg-white text-slate-500">
            <RxCross2 />
          </p>
        </div>
        <div className="bg-[rgba(84,84,84,0.6)] h-[0.5px] mt-5 w-[110%]"></div>
        <p className="mt-5">Recent</p>
        {filteredData.length > 0 ? (
          <div className="flex mt-10 flex-col w-[90%]  gap-2  ">
            {filteredData?.map((item, index) => (
              <div
                key={index}
                // onClick={() => setChatData(item)}
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
        ) : (
          <div className="text-center flex justify-center h-[60%] items-center ">
            <p className="text-white">No recent Searches</p>
          </div>
        )}
      </div>
    </>
  );
}
