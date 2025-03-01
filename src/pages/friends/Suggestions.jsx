import React, { useState } from "react";
import items from "../../dummyJsons/connections.json";
import Button from "../../tools/Button";
import ConfirmModal from "../../components/ConfirmModal";
import { useAllUserData, useUserData } from "../../hooks/useQueryData";
import { useFriendMutation } from "../../hooks/useMutateData";
import { toast } from "react-toastify";

export default function Suggestions({ userId }) {
  const [selectedId, setSelectedId] = useState([]);

  const toggleItem = (item) => {
    setSelectedId((prevItems) => {
      if (prevItems.includes(item)) {
        return prevItems.filter((i) => i !== item);
      } else {
        return [...prevItems, item];
      }
    });
  };
  const { data } = useAllUserData();
  const { data: userData } = useUserData();
  const friendMutate = useFriendMutation();
  const handleAddFriend = (id) => {
    friendMutate.mutateAsync(["post", `/?id=${id}`, ""], {
      onSuccess: () => {
        toast.success("Friend request send!!");
      },
      onError: () => {
        toast.error("unable to send request!");
      },
    });
  };
  const filteredData = data?.filter(
    (filter) => !userData?.friends?.includes(filter?._id)
  );

  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className=" w-full  h-full">
      <h1 className="text-[25px]  pl-10 pt-5 ">Your Suggestions</h1>
      <div className="flex flex-wrap w-full gap-10 rounded-lg p-5">
        {filteredData?.map((item, index) => (
          <div
            className=" h-[360px] flex flex-col justify-between pb-3 w-[220px] rounded-lg shadow-white shadow-md bg-[rgba(84,84,84)]"
            key={index}
          >
            <div className=" h-[65%]">
              <img
                className=" h-[100%] object-cover rounded-t-lg w-[100%]"
                src={item?.profile ?? "./profile.jpg"}
              />
            </div>
            <div className="flex h-[35%]   flex-col px-4 gap-1">
              <p className="text-white pt-1">{item?.username}</p>

              <Button
                onClick={() => {
                  handleAddFriend(item?._id), toggleItem(item?._id);
                }}
                className={
                  "border-2 border-none bg-blue-400 w-full text-black p-1 rounded-lg"
                }
                btnName={
                  selectedId?.find((id) => id === item?._id)
                    ? "Requesting"
                    : "Add friend"
                }
              />
              <Button
                onClick={() => setConfirmDelete(true)}
                className="border-2 border-white bg-[#d1d5db] w-full text-black p-1 rounded-lg  "
                btnName={"Remove"}
              />
            </div>
          </div>
        ))}
      </div>
      <ConfirmModal
        setOpenModel={setConfirmDelete}
        confirm={"Are you sure you want to delete this content?"}
        openModel={confirmDelete}
        title={"Confirm remove "}
        button={"Remove"}
      />
    </div>
  );
}
