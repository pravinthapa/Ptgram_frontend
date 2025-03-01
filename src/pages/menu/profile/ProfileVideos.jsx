import React from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { usePostData, useUserData } from "../../../hooks/useQueryData";

function ProfileVideos({ data }) {
  const filterVideos = data?.filter(
    (filter) => filter?.photo === null && filter?.video !== null
  );
  console.log(filterVideos);
  return (
    <div className="flex flex-col justify-center  text-center place-items-center mt-9 px-40">
      {filterVideos?.length > 0 ? (
        <div className="w-full grid grid-cols-2 gap-2">
          {filterVideos?.map((item, index) => (
            <video
              autoPlay
              muted
              src={item?.video}
              key={index}
              className="w-full h-fit object-contain"
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="text-5xl  border-white p-2 border-[2px] text-white  rounded-full">
            {" "}
            <MdOutlinePhotoCamera />{" "}
          </p>
          <p className="text-white font-bold mt-5 ">Share Videos</p>
          <p className="mt-3">
            When you share Video, they will appear on your profile.
          </p>
          <p className="text-blue-400 mt-2 ">Share your first Video.</p>
        </div>
      )}
    </div>
  );
}

export default ProfileVideos;
