import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "./useAxiosPrivate";

export const useMutate = (
  queryKey,
  basePath,
  contentType = "application/json"
) => {
  const queryclient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const mutation = useMutation({
    mutationFn: async (params) => {
      const requestData = {
        method: params?.[0],
        url: basePath + params?.[1],
        data: params?.[2],
        header: {
          "Content Type": contentType,
        },
      };
      const response = axiosPrivate(requestData);
      return response;
    },
    onSuccess: () => {
      queryclient.invalidateQueries([queryKey]);
    },
    onError: (error) => {
      return error?.response?.data;
    },
  });
  return mutation;
};

export const useLoginMutation = () => useMutate(["login"], "api/users/login");
export const useFriendMutation = () =>
  useMutate(["friend"], "api/users/friend");
export const usePostMutation = () =>
  useMutate(["post"], "api/post", "multipart/form-data");
export const useChatMutation = () => useMutate(["chat"], "api/message");

export const useRegisterMutation = () =>
  useMutate(["register"], "api/users/register");
