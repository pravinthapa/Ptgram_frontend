import React, { useEffect } from "react";
import { FaImages, FaVideo } from "react-icons/fa";
import { BsFillSendFill, BsThreeDots } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Button from "../../tools/Button";
import { useChatData, useUserData } from "../../hooks/useQueryData";
import { useChatMutation } from "../../hooks/useMutateData";

export default function ChatBox({ chatData, userData }) {
  const { register, handleSubmit, reset } = useForm();
  const { data, refetch } = useChatData(userData?._id, chatData?._id);
  const chatMutate = useChatMutation();
  const onSubmit = (data) => {
    const postData = {
      content: data?.content,
      receiver: chatData?._id,
      sender: userData?._id,
    };
    chatMutate.mutateAsync(["post", "", postData], {
      onSuccess: () => {
        toast.success("Message sent successfully");
        reset();
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [chatData]);
  return (
    <div className="h-[100%] flex flex-col overflow-hidden ">
      <div className="font-medium p-2 h-[10%] text-md gap-2 flex  justify-between items-center">
        <div className="flex gap-2 items-center">
          <img
            src={chatData?.profile ?? "./profile.jpg"}
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="flex flex-col">
            {chatData?.username}{" "}
            <span className="flex items-center gap-1 text-sm text-slate-600">
              <span className="bg-green-600 w-2 h-2 rounded-full"></span> online
            </span>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <IoCall />
          <FaVideo />
          <BsThreeDots />
        </div>
      </div>
      <div className=" h-[80%] flex flex-col bg-[rgba(20,20,20,1)] p-2    ">
        <div className=" overflow-scroll scrollbar-hide ">
          <div className="w-full flex flex-col gap-4 ">
            {data?.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div
                  className={`flex ${
                    item?.sender === userData?._id
                      ? " justify-end"
                      : "   justify-start"
                  }  gap-2`}
                >
                  {item?.sender === userData?._id ? (
                    ""
                  ) : (
                    <img
                      src={userData?.profile ?? "./profile.jpg"}
                      className="w-[40px] h-[40px] rounded-full"
                      alt=""
                    />
                  )}
                  <div className="max-w-[45%]">
                    <p
                      className={`w-fit text-black ${
                        item?.sender === false ? " bg-blue-200" : "bg-slate-200"
                      } shadow-lg  rounded-lg p-2`}
                    >
                      {item?.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="items-center h-[10%] border-t-2  border-slate-600  flex gap-2 w-full b  z-10   justify-center"
      >
        <div className="flex  p-2 gap-5 rounded-lg  w-[90%] items-center bg-black border-2 border-gray-400">
          {/* <FaImages  /> */}
          <MdEmojiEmotions className="text-[25px] " />
          <textarea
            {...register("content")}
            placeholder="Write your message"
            className="w-full  scrollbar-hide border-0 bg-inherit focus-within:outline-none resize-none "
          />
        </div>

        <Button
          type="submit"
          iconBefore={<BsFillSendFill />}
          btnName={"Send"}
          className={""}
        />
      </form>
    </div>
  );
}
