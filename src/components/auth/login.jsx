import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { actions } from "../../reducers/LoginReducer";
import Api from "../../services/api";

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    //handle submit function
    const onSubmit = async (data) => {
        try {
          const result = await actions.submitLogin(dispatch, data);
          if (result?.status === 200) {
            if (result?.data?.code === 200) {
              // Set client token first
              Api.setClientToken(result?.data?.token);
              // Then navigate to chatbox
              // window.location="/";
              navigate("/")
              // Finally, display success toast
              toast.success("User login successfully");
            } else {
              // Display error toast if login failed
              toast.error(result?.data?.message || "Login failed. Please try again.");
            }
          } else {
            // Display error toast if login failed
            toast.error(result?.data?.message || "Login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error during login:", error);
          // Display error toast if an unexpected error occurred
          toast.error("Login failed. Please try again.");
        }
      };
      
      

    return (
        <div className="py-[70px]">
        <div className="max-w-[1140px] mx-auto">
          <div className="flex gap-5">
            <div className=" w-2/4">
              <h3 className="uppercase mb-5 text-[#222] font-bold tracking-wide text-2xl">
                Login
              </h3>
              <div className="p-[30px] border-[1px] border-solid border-[#ddd] h-[320px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col">
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
                  <div className="flex flex-col">
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
                  <button
                    type="submit"
                    className="px-[29px] py-[13px] text-sm font-bold text-white border-2 border-[#b0574f] transition-all duration-300 bg-[0px] hover:bg-white hover:text-black hover:bg-[100%] uppercase "
                    style={{
                      backgroundSize: "560px",
                      backgroundImage:
                        "linear-gradient(30deg, #b0574f 50%, transparent 50%)",
                    }}
                  >
                    Login
                  </button>
                </form>
              </div>
            </div>
            <div className=" w-2/4">
              <h3 className="uppercase mb-5 text-[#222] font-bold tracking-wide text-2xl">
                New Customer
              </h3>
              <div className="p-[30px] border-[1px] border-solid border-[#ddd] h-[320px]">
                <h6 className="uppercase text-[#333] font-semibold mb-5 text-sm">
                  Create a Account
                </h6>
                <p className="text-sm text-[#555] mb-4">
                  Sign up for a free account at our store. Registration is quick
                  and easy. It allows you to be able to order from our shop. To
                  start shopping click register.
                </p>
                <Link to="/signup">
  <button
    className="px-[29px] py-[13px] text-sm font-bold text-white border-2 border-[#b0574f] transition-all duration-300 bg-[0px] hover:bg-white hover:text-black hover:bg-[100%] uppercase mt-4"
    style={{
      backgroundSize: "560px",
      backgroundImage:
        "linear-gradient(30deg, #b0574f 50%, transparent 50%)",
    }}
  >
    Create an Account
  </button>
</Link>
              </div>
            </div>
          </div>
        </div>
  
      </div>
    );
};

export default LoginPage;
