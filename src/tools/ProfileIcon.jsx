import React from "react";
import { FaLock } from "react-icons/fa";

export default function ProfileIcon({ className, profile, classNamediv }) {
  return (
    <div className={`${classNamediv}`}>
      <img src={profile} className={`rounded-full object-contain w-full ${className}`} alt="" />
    </div>
  );
}
