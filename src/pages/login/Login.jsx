import React from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../hooks/useMutateData";
import { useAuthStore } from "../../store/Authstore";
import { toast } from "react-toastify";
import Button from "../../tools/Button";
import Input from "../../tools/Input";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const loginMutation = useLoginMutation();
  const { setUser } = useAuthStore();

  const onSubmit = (data) => {
    const postData = { email: data?.email, password: data?.password };
    loginMutation.mutateAsync(["post", "", postData], {
      onSuccess: (response) => {
        if (response.status === 201) {
          setUser({
            token: response?.data?.accessToken,
            // refresh: response?.data?.refresh ?? "",
            // data: response?.data?.user,
          });
          navigate("/");
          toast.success("Login successfully");
        }
      },
      onError: (error) => {
        toast.error(error?.message);
      },
    });
  };

  return (
    <div className="w-full flex h-[460px] justify-center ">
      <div className="backdrop-blur-md h-full shadow-[0px_0px_10px_2px]  shadow-[#000]   w-[40%]   text-White     text-center  rounded-xl   justify-center items-center px-10 py-20  ">
        <h1 className="text-[35px] text-black  font-extrabold">PTgram</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-left  mt-10 gap-0"
        >
          <div className="mb-7">
            <div className="flex w-full justify-between px-4 p-1 border-2 border-White items-center  relative rounded-full">
              <Input
                register={register}
                registerName={"email"}
                placeHolder={"Email"}
                className=" p-1 text-black w-full focus-within:outline-none  placeholder-slate-500 bg-inherit  border-none"
                inputType={"email"}
              />
              <FaUser className="text-[20px] text-black " />
            </div>
          </div>
          <div>
            <div className="flex border-2 border-White justify-between px-4 items-center rounded-full p-1 ">
              <Input
                register={register}
                registerName={"password"}
                placeHolder={"Password"}
                className="p-1    bg-inherit focus-within:outline-none  placeholder-slate-500  text-[#000] border-none"
                inputType={"password"}
              />
              <FaLock className="text-[20px] text-black " />
            </div>
          </div>

          <div className="flex  mt-3 justify-center text-black">
            <div>
              <Link to={"/login"}>
                <p>Forgot Password?</p>
              </Link>
            </div>
          </div>
          <div className="text-center flex justify-center w-full">
            <Button
              btnType="submit"
              btnName={"Login"}
              className="  rounded-full border-2 border-white font-bold
             text-white bg-black mt-5  hover:bg-gray-800
              hover:text-white  w-[200px] py-1.5 px-1  "
            />
          </div>
          <div className=" text-black flex mt-5 text-center gap-1 text-[17px] flex-wrap">
            <p>Do you already have an account?</p>
            <Link to="/signup">
              <p className="font-bold hover:underline">Register</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
