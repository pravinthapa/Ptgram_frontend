import { useQuery } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useQuerydata = (key, path, params = "", enabled = true) => {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: [key, params],
    queryFn: () =>
      axiosPrivate({
        url: path,
        method: "get",
        params: params,
      }).then((res) => res?.data && res?.data),
    enabled,
  });
};

export const usePostData = () => useQuerydata(["post"], `api/post/`, "");
export const useUserData = () =>
  useQuerydata(["user"], `api/users/current`, "");
export const useAllUserData = () =>
  useQuerydata(["usersData"], `api/users/all`, "");
export const useChatData = (user1 = "", user2 = "") =>
  useQuerydata(["chat"], `api/message?user1=${user1}&user2=${user2}`, "");
