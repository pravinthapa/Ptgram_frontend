import React from "react";

export default function Button({
  btnType,
  className,
  iconBefore,
  onClick,
  btnName,
  iconAfter
}) {
  return (
    <button
      onClick={onClick}
      type={btnType}
      className={`cursor-pointer flex justify-center h-fit border-2 p-1 px-2 items-center rounded-lg  gap-2 ${className}`}
    >
      {iconBefore}
      {btnName}
      {iconAfter}
    </button>
  );
}
