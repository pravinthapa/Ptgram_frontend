import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import ProfileIcon from "./ProfileIcon";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { usePostMutation } from "../hooks/useMutateData";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { BsSend } from "react-icons/bs";
import { useAllUserData } from "../hooks/useQueryData";
import { timeAgo } from "./converter";

const Comment = ({ open, data: dataId, refetch, classname }) => {
  const [liked, setLiked] = useState("");
  const commentMutate = usePostMutation();
  const { handleSubmit, register, reset } = useForm();

  const { data: allUsersData } = useAllUserData();

  const postComment = (data) => {
    commentMutate.mutateAsync(["post", `/comment/?id=${dataId?._id}`, data], {
      onSuccess: () => {
        toast.success("Message sent!");
        reset();
        refetch();
      },
      onError: () => {
        toast.error("No message sent!");
      },
    });
  };
  return (
    <div className="w-[100%] h-full flex flex-col justify-between p-3">
      <div className="w-[100%]  h-full overflow-auto py-5">
        <div className="flex justify-between pb-4  w-full items-center">
          <h1 className="text-[18px] font-bold">Comments</h1>
          <p onClick={() => open(false)} className="text-[25px] ">
            <IoClose />
          </p>
        </div>
        {dataId?.comments?.length > 0 ? (
          dataId?.comments?.map((item, index) => {
            const commenter = allUsersData?.find(
              (filter) => item?.user_id === filter?._id
            );
            return (
              <div key={index} className=" flex gap-1 items-center py-3">
                <div>
                  <ProfileIcon
                    profile={commenter?.profile ?? "./profile.jpg"}
                    classNamediv={"w-[30px] "}
                  />
                </div>
                <div className="flex  mx-4 justify-between w-full">
                  <div className="flex flex-col ">
                    <p>
                      {commenter?.username} {timeAgo(item?.createdAt)}
                    </p>
                    <p className="text-sm text-opacity-60">{item?.text}</p>
                  </div>
                  <p onClick={() => setLiked(item?._id)}>
                    {liked === item?._id ? <FaHeart /> : <FaRegHeart />}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <img src="./notfound.gif" className="w-full h-full  object-contain" />
        )}
      </div>
      <form
        onSubmit={handleSubmit(postComment)}
        className={`flex justify-between ${classname}`}
      >
        <input
          {...register("text")}
          className="text-[15px] placeholder:text-white bg-inherit focus-within:outline-none"
          placeholder="Add to comment...."
        />
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className=" flex items-center bg-slate-200 rounded-3xl px-3 gap-1 text-black text-[18px] cursor-pointer"
          >
            Send
            <BsSend size={12} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;
