import React from "react";
import { IoSearch } from "react-icons/io5";
import logo from "../../assets/logo6.png";
import { FaHome, FaPlusCircle, FaUserFriends } from "react-icons/fa";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { PiGridNineFill } from "react-icons/pi";
import ProfileIcon from "../../tools/ProfileIcon";
import { Link } from "react-router-dom";
export default function Navbar({ setActive, active }) {
  const iconsList = [
    { title: "Home", icon: <FaHome />, id: 0, link: "/" },
    { title: "Reels", id: 5, icon: <MdOutlineOndemandVideo />, link: "/video" },
    { title: "Create", id: 9, icon: <FaPlusCircle />, link: "/create" },
    { title: "Friends", icon: <FaUserFriends />, id: 2, link: "/connections" },
    { title: "Inbox", id: 4, icon: <TiMessages />, link: "/inbox" },
  ];

  return (
    <div className="  top-0 left-0  w-[100vw] fixed z-10">
      <div className="flex  justify-between bg-black px-7  py-2  items-center   text-white border-b-[0.5px] border-b-gray-500">
        <div className="  h-[50px] w-fit  flex ">
          <img
            src={"./ptgram-logo.png"}
            alt=""
            className=" h-[50px] w-[80px] object-cover"
          />
          <p className="text-[30px] mt-1 font-serif  font-bold">PTGRAM</p>
        </div>
        {/* <div className="flex justify-between w-[37%] cursor-pointer">
          {iconsList?.map((item) => (
            <Link
              to={item?.link}
              className={`text-white ${
                active === item?.id
                  ? "border-b-2 border-b-white"
                  : "border-b-2 border-b-black"
              } text-[25px]`}
              onClick={() => setActive(item?.id)}
              key={item?.id}
            >
              <p>{item?.icon}</p>
            </Link>
          ))}
        </div>
        <div className=" flex items-center  w-[12.5%]   gap-4  text-white">
          <p className="text-[27px]">
            <PiGridNineFill />
          </p>

          <ProfileIcon classNamediv={"w-[43px] "} />
        </div> */}
      </div>
    </div>
  );
}
