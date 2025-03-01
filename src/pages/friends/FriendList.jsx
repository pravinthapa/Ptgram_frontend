import React from "react";
import Button from "../../tools/Button";
import { useAllUserData, useUserData } from "../../hooks/useQueryData";
import { useFriendMutation } from "../../hooks/useMutateData";
import { useNavigate } from "react-router-dom";
export default function FriendList() {
  const { data } = useAllUserData();
  const { data: userData } = useUserData();
  const friendMutate = useFriendMutation();
  const navigate = useNavigate();
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
  const filteredData = data?.filter((filter) =>
    userData?.friends?.includes(filter?._id)
  );

  return (
    <div className=" flex h-full justify-center">
      <div className="w-[60%] p-2 text-center h-fit border-2 flex flex-col gap-3">
        <h1 className="font-semibold text-2xl  border-b-2"> Friends List</h1>
        {filteredData?.map((item, index) => (
          <div key={index} className="flex gap-2 px-10 w-full justify-between">
            <div className="flex gap-2">
              <div className="w-[60px] h-[60px]">
                <img
                  src={item?.profile ?? "../profile.jpg"}
                  className="rounded-full  h-full w-full object-cover"
                  alt=""
                />
              </div>
              <div className="flex flex-col">
                <h1> {item?.username}</h1>
                <p className="text-sm text-gray-300">friends</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                btnName={"Remove"}
                onClick={() => handleAddFriend(item?._id)}
              />
              <Button
                onClick={() => navigate("/inbox")}
                className={"bg-blue-500 text-white border-none"}
                btnName={"Message"}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
