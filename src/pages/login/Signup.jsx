import { Link, useNavigate } from "react-router-dom";
import Button from "../../tools/Button";
import Input from "../../tools/Input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaMailBulk, FaUser } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../hooks/useMutateData";

const Signup = () => {
  const navigate = useNavigate();
  const [lockOpen, setLockOpen] = useState(false);
  const registerMutation = useRegisterMutation();
  const { register, handleSubmit } = useForm();

  const onSubmitHandler = async (data) => {
    const postData = {
      email: data?.email,
      username: data?.username,
      password: data?.password,
    };
    registerMutation?.mutateAsync(["post", "", postData], {
      onSuccess: () => {
        toast.success("Your account has been registered!!");
        navigate("/login");
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <div className="w-full h-[460px]">
      <div className="flex justify-center h-full items-center text-center ">
        <div
          className="backdrop-blur-md 
                w-[40%]
              text-black  
              text-center  h-full border-0 shadow-[0px_0px_10px_1px]   shadow-[#000] border-white rounded-xl  p-10"
        >
          <h1 className="text-[35px] text-black  font-extrabold">Sign-up</h1>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            className="flex flex-col text-left  mt-10 gap-2"
          >
            <div>
              <div className="flex  justify-between px-4 py-3 items-center border-2 border-black mt-5 relative rounded-full p-1 ">
                <Input
                  register={register}
                  placeHolder={"Username"}
                  registerName={"username"}
                  inputName={"username"}
                  inputType={"text"}
                  className=" p-1   select-none bg-inherit focus-within:outline-none  placeholder-black  text-black border-none"
                />
                <FaUser size={20} />
              </div>
            </div>
            <div>
              <div className="flex  items-center justify-between px-4 py-3 p-1 border-2 border-black   rounded-full">
                <Input
                  register={register}
                  registerName={"email"}
                  placeHolder={"Email"}
                  className=" p-1 text-black w-full focus-within:outline-none placeholder-black bg-inherit  border-none"
                  inputType={"email"}
                />
                <FaMailBulk size={20} />
              </div>
            </div>
            <div>
              <div className="flex justify-between px-4 items-center py-3 border-2 border-black    rounded-full p-1 ">
                <Input
                  register={register}
                  registerName={"password"}
                  placeHolder="Password"
                  className=" p-1    bg-inherit focus-within:outline-none  placeholder-black  text-black border-none"
                  inputType={lockOpen ? "text" : "password"}
                />
                <div onClick={() => setLockOpen(!lockOpen)}>
                  {lockOpen === true ? (
                    <FaEye className="text-[20px] " />
                  ) : (
                    <FaEyeSlash className="text-[20px] " />
                  )}
                </div>
              </div>
            </div>
            <div className="text-center flex justify-center w-full items-center">
              <Button
                btnType={"submit"}
                className=" ml-3 select-none rounded-full border-2 border-white
                   text-white bg-black mt-5  hover:bg-gray-700
                    hover:text-white font-bold   w-[250px] py-1.5 px-2  "
                btnName={"Sign-up"}
              />
            </div>
          </form>
          <div className="flex ml-16 text-[18px] mt-5 gap-1 mb-3">
            <p>Have an account?</p>
            <Link to="/login">
              <p className="font-bold hover:underline">Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
