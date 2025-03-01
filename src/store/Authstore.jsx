import { create } from "zustand";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";
const cookies = new Cookies();

const authStore = (set) => ({
  loggedIn: cookies.get("token") ? true : false,
  user: cookies.get("token") || null,
  setUser: (user) => {
    set(() => {
      cookies.set("token", user);
      return { user: user, loggedIn: true };
    });
  },
  logout: () => {
    set(() => {
      cookies.remove("token");
      return {
        loggedIn: false,
        user: null,
      };
    });
    toast.success("Logout successfully");
  },
});
export const useAuthStore = create(authStore);
