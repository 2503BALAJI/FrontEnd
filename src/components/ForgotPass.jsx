import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

//email verify zalyavr kay krayche te baki ahe  te handle kele nahi ahe

const ForgotPass = () => {
  const navigate = useNavigate();
  const [passVisible, setPassVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  console.log(formData);

  function submitHandler(event) {
    event.preventDefault();
    event.target.value;
    console.log(event);
  }

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
    //setFormData([event.target.name]= event.target.value)
  }

  function passwordHandler() {
    setPassVisible(!passVisible);
    // setType(false)
  }

  // w-11/12 max-w-[1160px] bg-black
  return (
    <form>
      <div className="h-screen w-11/12 mx-auto flex flex-col justify-center items-center  bg-gray-500">
        <div className="w-[500px] h-[600px] bg-red-400 flex flex-col py-2 px-4  ">
          <h2 className="font-bold text-3xl text-gray-700 mb-2">
            Forgot Password
          </h2>
          <p className="text-left mb-5">
            Welcome To The Legacy Land Investment
          </p>
          <p> Re-Create Your Password </p>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1">
              Enter Your Email Address <sup className="text-pink-500">*</sup>
            </p>
            <input
              required
              type="email"
              value={formData.email}
              name="email"
              placeholder="Enter Email-address "
              onChange={changeHandler}
              className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full mb-2 p-[12px]  "
            />
          </label>

          {/* button  */}
          <button className="bg-yellow-500 rounded-[8px] font-medium  px-[12px] py-[8px] mt-6  ">
            Verify
          </button>

          <div className="flex w-full item-center my-4 gap-x-2">
            <div className="bg-black h-[1px] w-full"></div>
            <p className="text-black leading-[1.375rem] font-bold my-[-10px]">
              OR
            </p>
            <div className="bg-black h-[1px] w-full"></div>
          </div>

          {/* forgott page link  */}

          <p>
            {" "}
            Back To -{/* <NavLink to="SignUp"> Register</NavLink> */}
            <button onClick={() => navigate("/Login")}>Login page</button>
          </p>
        </div>
      </div>
    </form>
  );
};

export default ForgotPass;
