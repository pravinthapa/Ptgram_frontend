import React from "react";
import { TbArrowsCross } from "react-icons/tb";
import Modal from "react-modal";
import Comment from "../tools/Comment";
import { BiHeart, BiMessage } from "react-icons/bi";
import { SlShare } from "react-icons/sl";
import { MdMarkAsUnread } from "react-icons/md";
import { LuBookMarked } from "react-icons/lu";
import { BsEmojiFrown, BsEmojiSmile, BsEmojiSmileFill } from "react-icons/bs";
import { timeAgo } from "./converter";

export default function PostModal({
  openModal,
  refetch,
  data,
  setData,
  setModalOpen,
}) {
  const customStyle = {
    content: {
      top: "0",
      height: "100vh",
      width: "100vw",
      left: "0",
      padding: "0px",
      background: "rgba(0,0,0,0.9)",
    },
  };
  const closeModal = () => {
    setModalOpen(false);
    setData(" ");
  };

  return (
    <Modal
      isOpen={openModal}
      style={customStyle}
      onRequestClose={closeModal}
      overlayClassName="modal-overlay"
      className={"z-20 absolute"}
    >
      <div className=" h-[100%] w-[100%] flex justify-center items-center">
        <div className=" h-[90%]   w-[30%] text-black ">
          <img
            src={data?.photo}
            alt=""
            className="h-full w-full object-cover   "
          />
        </div>
        <div className="bg-white h-[90%] p-3 overflow-hidden  w-[40%] text-black ">
          <div className="flex justify-between px-5 p-2">
            <h1 className="font-bold text-lg">Comments</h1>
            <TbArrowsCross onClick={closeModal} size={25} />
          </div>
          <div className="w-full h-[66%]  overflow-auto">
            <Comment
              data={data}
              refetch={refetch}
              classname={"border-2 rounded-lg border-black px-2 py-2"}
            />
          </div>
          <div className="w-full border-t  p-2 border-secondary-800 h-fit">
            <div className="w-full justify-between   flex items-center jus gap-3 px-2  h-fit">
              <div className="w-fit  flex items-center gap-3  h-fit">
                <BiHeart size={25} />
                <BiMessage size={25} />
                <SlShare size={20} />
              </div>
              <div className="w-fit h-fit">
                <LuBookMarked size={25} />
              </div>
            </div>
            <div className="flex flex-col gap-1 p-2">
              <h1 className="font-bold text-lg">{data?.likes?.length} Likes</h1>
              <h1 className="font-light text-sm text-slate-700">
                {timeAgo(data?.updatedAt)}{" "}
              </h1>
            </div>
            {/* <div className="flex gap-5 items-center p-2  border-t-2 border-slate-300">
              <BsEmojiSmile size={20} />
              <input
                type="text"
                placeholder="Add a comment"
                className="w-[70%]"
              />
              <button className="font-bold bg-slate-800 text-white px-3 p-1 rounded-xl">
                Post
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </Modal>
  );
}
