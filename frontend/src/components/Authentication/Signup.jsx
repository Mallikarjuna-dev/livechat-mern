import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");

  // const handleClick = () => setShow(!show);
  const handleClick = (e, inputType) => {
    if (inputType === "password") {
      e.preventDefault();
    }
    setShow(!show);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(name, email, phone, password, confirmPassword);
    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill all the required fields!");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password must be same!");
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        {
          name,
          email,
          phone: `91${phone}`,
          password,
          pic,
        },
        config
      );
      toast.success("Registaration Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error("Failed! user already exists", error);
      setLoading(false);
    }
    setTimeout(() => {
      setLoading(false);
      console.log("Form submitted!");
    }, 2000); // Simulating a 2-second delay
  };

  const PostDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warn("Please choose an correct Image!");
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "livechat-app");
      data.append("cloud_name", "dswkan4ep");
      fetch("https://api.cloudinary.com/v1_1/dswkan4ep/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast.warn("Please select an Image!");
      return;
    }
  };

  return (
    <>
      <section>
        <div id="recaptcha-container"></div>
        <form
          className="flex flex-col gap-y-1.5 my-2 px-1 text-start"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              className="my-1.5 py-1 px-3 border bg-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={name}
              required
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="my-1.5 py-1 px-3 border bg-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              required
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="number"
              className="my-1.5 py-1 px-3 border bg-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={phone}
              required
              placeholder="Enter your mobile number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* <div className="flex flex-col mb-1">
            <label className="text-sm font-semibold">
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <PhoneInput
                type="number"
                id="number"
                country={"in"}
                className="w-full border bg-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={phone}
                required
                placeholder="Enter your mobile number"
                onChange={(e) => setPhone(phone)}
              />
              <button
                className="absolute inset-y-0 right-0 font-medium text-sm px-2 rounded-md  bg-teal-400 flex items-center w-fit text-white"
                onClick={onSignup}
              >
                {loading ? "Loading..." : "Send code via SMS"}
              </button>
            </div>
          </div> */}
          {/* <div className="flex flex-wrap">
            <label className="text-sm font-semibold mr-2">
              Enter your OTP <span className="text-red-600">*</span>
            </label>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType="number"
              disabled={false}
              autoFocus
              className="opt-container -mt-1"
            ></OtpInput>
            <button
              className="ml-10 font-medium text-sm px-3 py-1 -mt-1 border rounded-md bg-light-green-600 w-auto text-white"
              onClick={onOTPVerify}
            >
              {loading ? "Loading..." : "Verify OTP"}
            </button>
          </div> */}

          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                className="my-1.5 py-1 w-full px-3 border bg-gray-100 rounded-md"
                value={password}
                required
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 right-0 font-semibold text-sm pr-5 flex items-center w-auto text-black"
                onClick={(e) => handleClick(e, "password")}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="confpassword"
                className="my-1.5 py-1 w-full px-3 border bg-gray-100 rounded-md"
                value={confirmPassword}
                required
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 font-semibold text-sm pr-5 flex items-center w-auto text-black"
                // onClick={handleClick}
                onClick={(e) => handleClick(e, "password")}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">Upload your Picture</label>
            <input
              type="file"
              id="pic"
              className="my-1 px-3 border bg-gray-100 rounded-md"
              accept="image/*"
              onChange={(e) => PostDetails(e.target.files[0])}
            />
          </div>

          <div className="flex flex-col w-full text-white">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 duration-300 font-medium py-1.5 rounded-md"
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
