import React, { useState } from "react";
import { IoMdClose, IoMdPhotos } from "react-icons/io";
import ProfileIcon from "./ProfileIcon";
import { FaLock, FaTag } from "react-icons/fa";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { HiGif } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import Button from "./Button";
import { useForm } from "react-hook-form";
import profile from "../assets/profile.jpg";
import { usePostMutation } from "../hooks/useMutateData";
import { toast } from "react-toastify";
import { useUserData } from "../hooks/useQueryData";

export default function CreatePost({ setOpenPost }) {
  const { handleSubmit, register, setValue } = useForm();
  const [selectedFile, setSelectedFile] = useState();
  const [photo, setPhoto] = useState();
  const [video, setVideo] = useState();
  const postMutate = usePostMutation();
  const { data } = useUserData();
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setValue("file", selectedFile);
    setSelectedFile(selectedFile);

    if (selectedFile) {
      if (selectedFile.type.startsWith("image")) {
        // If image, display as an image
        setPhoto(URL.createObjectURL(selectedFile));
        setVideo(null); // Clear any previous video
      } else if (selectedFile.type.startsWith("video")) {
        // If video, display as a video
        setVideo(URL.createObjectURL(selectedFile));
        setPhoto(null); // Clear any previous image
      }
    }
  };
  const postSubmit = (data) => {
    const formdata = new FormData();
    formdata.append("file", selectedFile);
    formdata.append("description", data?.description);
    postMutate.mutateAsync(["Post", "", formdata], {
      onSuccess: () => {
        toast.success("Successfully posted");
        setOpenPost(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  return (
    <div>
      <div className="absolute top-0 left-0 justify-center items-center text-center flex w-[100vw] h-[100vh] bg-[rgba(66,64,64,0.57)] text-white">
        <div className="rounded-lg flex flex-col gap-2 shadow-black shadow-[1px_2px_8px_0px]  justify-center bg-[#303030] w-[30%] h-fit py-2 text-white ">
          <div className=" justify-between border-b-2 border-b-gray-400 p-3  flex">
            <p className="text-[22px] w-[95%] font-bold font-serif">
              Create post
            </p>
            <p
              className="text-[25px] cursor-pointer "
              onClick={() => setOpenPost(false)}
            >
              <IoMdClose />
            </p>
          </div>
          <div className="ml-1.5 flex gap-2">
            <ProfileIcon profile={data?.profile ?? "./profile.jpg"} classNamediv={"w-[45px]"} />
            <div className="flex-col text-left">
              <p className="font-bold">{data?.username}</p>
              <div className="flex bg-[rgba(129,126,126,0.3)] gap-1 px-2 rounded-lg items-center">
                <FaLock className="text-[12px] " />
                <p>only me</p>
              </div>
            </div>
          </div>
          <form action="" onSubmit={handleSubmit(postSubmit)}>
            <div className="bg-inherit">
              <textarea
                {...register("description")}
                className="bg-inherit p-2 placeholder:text-white text-white resize-none w-[100%] placeholder:text-[20px] focus-within:outline-none h-fit"
                placeholder="What's on your mind, user"
              />
              <div className="w-full h-[100px]">
                {photo ? (
                  <img
                    src={photo}
                    alt=""
                    className="w-full h-full  object-contain"
                  />
                ) : video ? (
                  <video
                    src={video}
                    className="object-contain w-full h-full"
                    autoPlay
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="bg-[rgba(129,126,126)] flex justify-between px-1 w-[95%] ml-[2.5%] mb-2 border-2 border-gray-400 rounded-lg p-2 text-white">
              <p className="text-[18px]">Add to post.</p>
              <div className="flex w-[50%] justify-between text-center align-middle items-center">
                <label htmlFor="file">
                  <input
                    accept="image/*,video/*"
                    type="file"
                    id="file"
                    className="hidden"
                    {...register("file")}
                    onChange={handleFileChange}
                  />
                  <p className="cursor-pointer text-[20px] text-green-600">
                    <IoMdPhotos />
                  </p>
                </label>
                <p className="cursor-pointer text-[18px] text-blue-700">
                  <FaTag />
                </p>
                <p className="cursor-pointer text-[25px] text-yellow-400">
                  <MdOutlineEmojiEmotions />
                </p>
                <p className="cursor-pointer text-[20px] text-red-700">
                  <FaLocationDot />
                </p>
                <p className="cursor-pointer text-[25px] text-purple-700">
                  <HiGif />
                </p>
                <p className="cursor-pointer text-[20px] ">
                  <BsThreeDots />
                </p>
              </div>
            </div>
            <div className=" w-full rounded-2xl flex justify-center">
              <Button
                btnName={postMutate?.isPending ? "Posting..." : "Post"}
                btnType={"submit"}
                className={
                  "bg-slate-300 w-[50%] text-center font-semibold text-black"
                }
              />
            </div>{" "}
          </form>
        </div>
      </div>
    </div>
  );
}
