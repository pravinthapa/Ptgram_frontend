import React from "react";
import { useAuthStore } from "../store/Authstore";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";

const useVerify = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const handleVerify = async () => {
    try {
      const result = await Axios.get("check", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      return result;
    } catch (error) {
      const errorMessage = error?.response?.data?.error
        ? error?.response?.data?.message?.toString()
        : error?.message?.toString();
      console.log("error", errorMessage);
      logout();
      navigate("/");
    }
  };
  return handleVerify;
};
export default useVerify;
