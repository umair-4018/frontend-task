import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { actions } from "../../reducers/SignupReducer";

const SignupPage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const onSubmit = async (data) => {
    try {
      const result = await actions.submitSignupForm(dispatch, data);
      if (result?.status === 200) {
        if (result?.data?.code === 200) {
          toast.success("User Created Successfully");
          navigate("/login");
        } else {
          toast.error(result?.data ? result?.data?.message : "");
        }
      } else {
        toast.error(result?.data ? result?.data?.message : "");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    }
  };
  

  return (
    <div className="py-[70px]">
      <div className="max-w-[1140px] mx-auto">
        <div className="flex gap-5">
          <div className="w-[100%]">
            <h3 className="uppercase mb-5 text-[#222] font-bold tracking-wide text-2xl">
              Create Account
            </h3>
            <div className="p-[30px]">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-5">
                  <div className="flex flex-col w-2/4">
                    <label
                      htmlFor="name"
                      className="capitalize text-[#333] text-sm font-semibold mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="First Name"
                      className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col w-2/4">
                    <label
                      htmlFor="email"
                      className="capitalize text-[#333] text-sm font-semibold mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col w-2/4">
                    <label
                      htmlFor="password"
                      className="capitalize text-[#333] text-sm font-semibold mb-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Enter Your Password"
                      className="text-xs py-[17px] px-[25px] mb-[30px] border-[#ddd]"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must have at least 6 characters",
                        },
                      })}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-xs">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="px-[29px] py-[13px] text-sm font-bold text-white border-2 border-[#b0574f] transition-all duration-300 bg-[0px] hover:bg-white hover:text-black hover:bg-[100%] uppercase"
                  style={{
                    backgroundSize: "560px",
                    backgroundImage:
                      "linear-gradient(30deg, #b0574f 50%, transparent 50%)",
                  }}
                >
                  Create Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

  );
};
export default SignupPage;
