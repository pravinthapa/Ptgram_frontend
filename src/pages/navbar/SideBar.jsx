import React, { useState } from "react";
import { FaHome, FaPlusCircle, FaSearch, FaUserFriends } from "react-icons/fa";
import { MdCompare, MdNotificationsActive } from "react-icons/md";
import { TiMessages, TiVideo } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileIcon from "../../tools/ProfileIcon";
import Search from "../search/Search";
import CreatePost from "../../tools/CreatePost";
import { FiSettings } from "react-icons/fi";
export default function SideBar({ setActive, active }) {
  const [openPost, setOpenPost] = useState(false);
  const location = useLocation();

  const Navigate = useNavigate();
  const headerList = [
    { title: "Home", icon: <FaHome />, id: 0, link: "/" },
    { title: "Search ", icon: <FaSearch />, id: 1 },
    {
      title: "Connections",
      icon: <FaUserFriends />,
      id: 2,
      link: "/connections",
    },
    { title: "Explore", id: 3, icon: <MdCompare />, link: "/explore" },
    { title: "Inbox", id: 4, icon: <TiMessages />, link: "/inbox" },
    { title: "Reels", id: 5, icon: <TiVideo />, link: "/video" },
    { title: "Create", id: 9, icon: <FaPlusCircle /> },
    {
      title: "Profile",
      id: 8,
      icon: <ProfileIcon profile={"./profile.jpg"} classNamediv="w-[30px]  h-[30px]" />,
      link: "/profile",
    },
  ];
  return (
    <div className="h-full w-[100%]  border-r-2 border-r-gray-500  flex">
      <div className=" flex justify-center">
        <div
          className={` h-full flex flex-col justify-between  duration-300 ${
            active === 1 || active === 6
              ? "  w-[120px] overflow-hidden "
              : "  w-[250px]"
          }  items-center `}
        >
          <div className="flex flex-col gap-5 text-left  mt-10 w-[80%]">
            {headerList?.map((item) => (
              <div
                key={item?.id}
                onClick={() => setActive(item?.id)}
                className=" cursor-pointer "
              >
                <div
                  onClick={() => {
                    item?.id === 9 ? setOpenPost(true) : Navigate(item?.link);
                  }}
                  className={`${
                    active === item?.id &&
                    `${
                      active === 1 ? "" : "border-b-2 border-b-white "
                    } w-fit  px-2 duration-300`
                  }   text-[16px] flex items-center gap-2 text-left`}
                >
                  <p
                    className={` ${
                      active === item?.id && active === 1
                        ? "border-2 rounded-xl border-white"
                        : ""
                    } text-[26px] p-1.5`}
                  >
                    {item?.icon}
                  </p>

                  {location?.pathname !== "/inbox" && (
                    <p
                      className={` ${
                        active === 1 ? "w-0  opacity-0" : "w-full opacity-100"
                      } duration-600`}
                    >
                      {item?.title}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {/* <div className=" w-[80%]">
            <MdMenu className="text-[27px]" />
          </div> */}
        </div>
      </div>
      <div
        className={`bg-black z-20 left-14 top-0 height duration-200  ${
          active === 1
            ? "w-[30%] border-r-[1px] px-10 ml-4 border-r-white "
            : " border-r-[0px] pr-0 ml-0  w-0"
        }   absolute`}
      >
        <Search setActive={setActive} />
      </div>

      {openPost && (
        <div className="z-20">
          <CreatePost openPost={openPost} setOpenPost={setOpenPost} />
        </div>
      )}
    </div>
  );
}
