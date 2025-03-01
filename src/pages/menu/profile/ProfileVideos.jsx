import React from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";

function ProfileVideos() {
  return (
    <div className="flex flex-col justify-center  text-center place-items-center mt-9">
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
  );
}

export default ProfileVideos;
