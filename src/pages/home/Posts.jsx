import React, { Children, useEffect, useRef, useState } from "react";
import ProfileIcon from "../../tools/ProfileIcon";
import { FaDotCircle, FaHeart, FaRegHeart } from "react-icons/fa";
import users from "../../assets/galleryUser.png";
import { BsSend, BsThreeDots } from "react-icons/bs";
import PostActions from "../../tools/PostActions";
import { FiMessageCircle } from "react-icons/fi";
import Comment from "../../tools/Comment";
import {
  useAllUserData,
  usePostData,
  useUserData,
} from "../../hooks/useQueryData";
import { timeAgo } from "../../tools/converter";
import { usePostMutation } from "../../hooks/useMutateData";
import { toast } from "react-toastify";

export default function Posts() {
  // const [liked, setLiked] = useState("");
  const [postAction, setPostAction] = useState(false);
  const [comment, setComment] = useState("");
  const [id, setId] = useState("");
  const { data, refetch } = usePostData();
  const { data: allUsersData } = useAllUserData();
  const { data: userData } = useUserData();
  const likeMutate = usePostMutation();

  const likeDandle = (id) => {
    likeMutate.mutateAsync(["post", `/like/?id=${id}`, ""], {
      onSuccess: () => {
        toast.success("Liked post!!");
        setId("");
        refetch();
      },
      onError: () => {
        toast.error("Error motherfucker");
      },
    });
  };
  const videoRefs = useRef([]);

  return (
    <div>
      <div className="h-full w-[100%]  select-none mt-5 flex flex-col rounded-xl p-2 text-white ">
        {data?.length > 0 ? (
          data?.map((item, index) => {
            const postUser = allUsersData?.find(
              (filter) => item?.user_id === filter?._id
            );
            const liked = item?.likes?.includes(userData?._id);

            return (
              <div
                key={item?.id}
                className="border-b-[0.5px] mb-10  w-[100%] border-b-[rgba(129,126,126,0.25)] pb-10"
              >
                <div className="flex justify-between">
                  <div className="flex gap-2">
                    <ProfileIcon
                      classNamediv={" w-fit h-fit"}
                      className={"w-[45px] h-[45px]  object-cover"}
                      profile={postUser?.profile ?? "./profile.jpg"}
                    />
                    <div className="flex flex-col ">
                      <div className="flex gap-2 items-center">
                        <p>{postUser?.username}</p>
                        <p className="text-[10px] ">
                          <FaDotCircle />
                        </p>
                        <p className="font-medium text-slate-500 text-xs">
                          {timeAgo(item?.updatedAt)}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {/* <p>with</p>: */}
                        <p className=" text-white  text-sm font-semibold ">
                          {item?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="fit cursor-pointer"
                    onClick={() => {
                      setPostAction(true);
                      setId(item?._id);
                    }}
                  >
                    <BsThreeDots />
                  </p>
                </div>
                <div className="items-center w-[100%] h-[500px]   mt-3 px-5 border-[0.5px] border-[rgba(129,126,126,0.30)]">
                  {item?.photo ? (
                    <img
                      src={item?.photo}
                      alt=""
                      className="object-contain w-full h-[100%]"
                    />
                  ) : item?.video ? (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      controls
                      controlsList="nodownload"
                      src={item?.video}
                      className="object-contain w-full h-[100%]"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex gap-2 text-[22px] mt-2">
                  <div
                    onClick={() => {
                      likeDandle(item?._id);
                    }}
                    className="w-fit cursor-pointer"
                  >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                  </div>
                  <div
                    onClick={() => setComment(item?._id)}
                    className="cursor-pointer"
                  >
                    <FiMessageCircle />
                  </div>
                </div>
                <div className="flex gap-2 mt-2 w-fit">
                  <img src={users} alt="" className="" />
                  <p>{item?.likes.length} likes</p>
                </div>

                <div>
                  {comment === item?._id ? (
                    <div className="w-[100%] h-[200px] overflow-y-auto border border-[rgba(84,84,84,0.28)]">
                      <Comment
                        open={setComment}
                        data={item}
                        refetch={refetch}
                      />
                    </div>
                  ) : (
                    <p
                      onClick={() => setComment(item?._id)}
                      className="text-[15px] mt-2"
                    >
                      View all comments
                    </p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <img src="./notfound.gif" className="w-full h-full object-contain" />
        )}
        <div>
          {postAction && (
            <PostActions setPostAction={setPostAction} id={id} setId={setId} />
          )}
        </div>
      </div>
    </div>
  );
}
