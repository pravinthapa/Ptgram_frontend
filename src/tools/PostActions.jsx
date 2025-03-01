import React from "react";
import Button from "./Button";
import { usePostMutation } from "../hooks/useMutateData";
import { toast } from "react-toastify";
import { BsX } from "react-icons/bs";

export default function PostActions({ setPostAction, setId, id }) {
  const actions = [
    { title: "Report", color: "text-red-500", link: "/" },
    { title: "Unfollow", color: "text-red-500", link: "/" },
    { title: "Add to favorites", color: "text-white", link: "/" },
    { title: "Go to post", color: "text-white", link: "/" },
    { title: "Share to...", color: "text-white", link: "/" },
    { title: "Copy link", color: "text-white", link: "/" },
    { title: "Embed", color: "text-white", link: "/" },
    { title: "About this account", color: "text-white", link: "/" },
  ];
  const deleteMutation = usePostMutation();
  const handleDelete = () => {
    deleteMutation.mutateAsync(["delete", `/?id=${id}`, ""], {
      onSuccess: () => {
        setPostAction(false);
        setId("");
      },
      onError: (error) => {
        toast.error("this is an error mother fucker");
      },
    });
  };
  return (
    <div>
      <div className="w-[100vw] h-[100vh] absolute bg-[rgba(15,14,14,0.83)] top-0 text-black left-0 flex justify-center text-center items-center">
        <div className="w-[400px] bg-[#262626] h-fit gap-4 rounded-2xl flex py-3 flex-col">
          <div className="flex justify-end text-black px-4">
            <BsX
              onClick={() => setPostAction(false)}
              className="flex cursor-pointer justify-end bg-white rounded-full "
            />
          </div>
          {actions?.map((item, index) => (
            <div
              className="border-b-[0.5px] border-b-[rgba(129,126,126,0.17)]  p-1"
              key={index}
            >
              <p className={` cursor-pointer ${item?.color}`}>{item?.title}</p>
            </div>
          ))}
          <div onClick={handleDelete} className="w-full flex justify-center">
            <Button className={" text-white "} btnName={"Delete"} />
          </div>
        </div>
      </div>
    </div>
  );
}
