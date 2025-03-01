import React, { useState } from "react";
import { MdOutlinePhotoCamera } from "react-icons/md";
import PostModal from "../../../tools/PostModal";
import { usePostData } from "../../../hooks/useQueryData";

function UserPosts({ data, refetch }) {
  const [openModal, setModalOpen] = useState();
  const [postData, setPostData] = useState();
  const filterData = data?.filter(
    (filter) => filter?.photo !== null && filter?.video === null
  );
  return (
    <div className="flex flex-col justify-center  text-center place-items-center mt-9">
      {filterData?.length > 0 ? (
        <div className="grid grid-cols-3 px-10">
          {filterData?.map((item, index) => (
            <div
              onClick={() => {
                setModalOpen(true), setPostData(item);
              }}
              key={index}
              className="p-2   flex items-center justify-center"
            >
              <img
                src={item?.photo}
                alt=""
                className="object-contain  transition-all duration-500 cursor-pointer w-[95%] hover:w-[100%] hover:h-[150%] h-[95%]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-5xl  border-white p-2 w-fit border-[2px] text-white  rounded-full">
            {" "}
            <MdOutlinePhotoCamera />{" "}
          </p>
          <p className="text-white font-bold mt-5 ">Share Photos</p>
          <p className="mt-3">
            When you share photos, they will appear on your profile.
          </p>
          <p className="text-blue-400 mt-2 ">Share your first photo.</p>
        </div>
      )}
      <PostModal
        openModal={openModal}
        setModalOpen={setModalOpen}
        data={postData}
        refetch={refetch}
        setData={setPostData}
      />
    </div>
  );
}

export default UserPosts;
