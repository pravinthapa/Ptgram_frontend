import React from "react";
import { useAuthStore } from "./store/Authstore";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import BaseLayout from "./layouts/BaseLayout";
import AuthLayout from "./layouts/AuthLayout";
import Friends from "./pages/friends/Friends";
import Videos from "./pages/videos/Videos";
import Profiles from "./pages/menu/profile/Profiles";
import Explore from "./pages/explore/Explore";
import Message from "./pages/messages/Message";

export default function RouteHandler() {
  const { loggedIn } = useAuthStore();
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      {loggedIn && (
        <Route element={<BaseLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/connections" element={<Friends />} />
          <Route path="/Profile" element={<Profiles />} />
          <Route path="/video" element={<Videos />} />
          <Route path="/inbox" element={<Message />} />
          <Route path="/explore" element={<Explore />} />
        </Route>
      )}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
