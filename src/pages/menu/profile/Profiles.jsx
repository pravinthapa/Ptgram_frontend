import React, { useState } from "react";
import ProfileIcon from "../../././../tools/ProfileIcon";
import { IoIosSettings } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoMdGrid } from "react-icons/io";
import { FiVideo } from "react-icons/fi";
import ProfileVideos from "./ProfileVideos";
import profile from "../../../assets/profile.jpg";
import UserPosts from "./ProfilePost";
import { usePostData, useUserData } from "../../../hooks/useQueryData";
import { Link } from "react-router-dom";

export default function Profiles() {
  const [active, setActive] = useState(1);
  const [photo, setPhoto] = useState("./profile.jpg");
  const activity = [
    { title: "Photos", icon: <IoMdGrid />, id: 1 },
    { title: "Videos", icon: <FiVideo />, id: 2 },
  ];
  const { data } = useUserData();
  const { data: PostData, refetch } = usePostData();
  const filter = PostData?.filter((filter) => filter?.user_id === data?._id);
  const handlePhoto = (e) => {
    const photoSelected = e.target.files[0];
    if (photoSelected) {
      setPhoto(URL.createObjectURL(photoSelected));
    }
  };

  return (
    <div className="place-items-center ">
      <div className="  py-[50px]  h-fit border-b-[1px] w-fit px-36 border-white mb-10">
        <div className="flex gap-[50px] justify-center  place-items-center">
          <div className="flex flex-col items-center  gap-2">
            <ProfileIcon profile={photo} classNamediv={"w-[140px]"} />
            <label htmlFor="photo">
              <p className="text-lg font-bold rounded-full px-3 p-1 bg-slate-800">
                Upload Photo
              </p>
              <input
                onChange={handlePhoto}
                type="file"
                className="hidden"
                id="photo"
              />
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex  gap-5 items-center h-fit ">
              <p className=" ">{data?.username}</p>
              <div className="flex gap-2  ">
                {/* <p className="bg-white px-3 h-fit text-black rounded-lg ">
                  Edit profile
                </p> */}
                {/* <p className="bg-white px-3 h-fit text-black  rounded-lg">
                  View archive
                </p> */}
              </div>
              <Link to="/settings" className="text-[25px] ">
                <IoIosSettings />
              </Link>
            </div>
            <div className="flex gap-[65px] pl-">
              <p>{filter?.length} post</p>
              <p>{data?.friends?.length} followers</p>
              {/* <p>50 following</p> */}
            </div>
            <div>
              <p className="font-semibold">Hora Esports</p>

              <div className="flex items-center gap-2 bg-white text-black rounded-lg w-fit px-2 ">
                <p>{data?.email}</p>
                <p className="text-gray-500">
                  <IoIosCheckmarkCircle />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-16 items-center pt-2">
        {activity?.map((item) => (
          <div
            onClick={() => setActive(item?.id)}
            key={item?.id}
            className={`flex gap-1 items-center border-b-2 w-fit ${
              active === item?.id ? " border-white" : "border-black"
            }`}
          >
            {item?.icon}
            <p className="text-white">{item?.title}</p>
          </div>
        ))}
      </div>

      {active === 1 ? (
        <UserPosts data={filter} refetch={refetch} />
      ) : active === 2 ? (
        <ProfileVideos data={filter} />
      ) : (
        ""
      )}
    </div>
  );
}
