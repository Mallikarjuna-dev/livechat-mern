import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../otpAuth/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const MobileLogin = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState();
  const navigate = useNavigate();

  // const handleClick = () => setShow(!show);
  const goBack = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
        },
        auth
      );
    }
  };

  const onSignup = async (e) => {
    // e.preventDefault();
    setLoading(true);
    // console.log(phone);
    if (!phone) {
      toast.error("Please enter your mobile number!");
      setLoading(false);
      return;
    }

    try {
      // Check if the phone number exists in the backend
      const response = await axios.get(`/api/user/checkPhone?phone=${phone}`);
      if (response.data.exists) {
        // If the phone number exists, proceed with sending OTP
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const phoneFormat = "+" + phone;

        signInWithPhoneNumber(auth, phoneFormat, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            toast.success("OTP sent successfully!");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      } else {
        // If the phone number does not exist, show error message
        toast.error("Phone number not registered!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // const appVerifier = window.recaptchaVerifier;
    // const phoneFormat = "+" + phone;
    // signInWithPhoneNumber(auth, phoneFormat, appVerifier)
    //   .then((confirmationResult) => {
    //     window.confirmationResult = confirmationResult;
    //     setLoading(false);
    //     // setShowOTP(true);
    //     toast.success("OTP sended successfully!");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setLoading(false);
    //   });
  };

  const onOTPVerify = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await axios.post("/api/user/login", { phone });
      if (user.data) {
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            console.log(res);
            // setUser(res.user);
            // console.log(phone);
            toast.success("Phone number verified!");
            localStorage.setItem("userInfo", JSON.stringify(user.data));
            setLoading(false);
            navigate("/chats");
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
        // Redirect to the user's account if found
        navigate("/chats");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to verify OTP");
    }
  };

  // const onOTPVerify = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   window.confirmationResult
  //     .confirm(otp)
  //     .then(async (res) => {
  //       console.log(res);
  //       // setUser(res.user);
  //       console.log(phone);
  //       toast.success("Phone number verified!");
  //       setLoading(false);
  //       navigate("/chats");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };

  const onSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // console.log(phone);
    // if (!phone || !otp) {
    //   toast.error("Please fill all the required fields!");
    //   setLoading(false);
    //   return;
    // }
    // onOTPVerify(e);

    // onSignup(e);
    // try {
    //   const config = {
    //     headers: {
    //       "Content-type": "application/json",
    //     },
    //   };
    //   const response = await axios.post("/api/user/login", { phone }, config);

    //   toast.success("Login Successful");
    //   localStorage.setItem("userInfo", JSON.stringify(response.data));
    //   setLoading(false);
    // } catch (error) {
    //   toast.error("Login failed!", error);
    //   setLoading(false);
    // }
    // setTimeout(() => {
    //   setLoading(false);
    //   console.log("Form submitted!");
    // }, 2000);
  };

  return (
    <>
      <div id="recaptcha-container"></div>
      <section>
        <form
          className="flex flex-col gap-y-2 my-2 px-1 text-start"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="flex flex-col mb-1">
            <label className="text-sm font-semibold">
              Mobile Number <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <PhoneInput
                type="text"
                id="number"
                country={"in"}
                className="w-full border bg-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={phone}
                inputProps={{
                  required: true,
                }}
                placeholder="Enter your mobile number"
                onChange={setPhone}
              />
              <button
                className="absolute inset-y-0 right-0 font-medium text-sm px-2 rounded-md bg-teal-400 flex items-center w-fit text-white"
                onClick={(e) => onSignup(e)}
              >
                {loading ? "Loading..." : "Send code via SMS"}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
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
            {/* <button
              className="ml-10 font-medium text-sm px-3 py-1 -mt-1 border rounded-md bg-light-green-600 w-auto text-white"
              onClick={(e) => onOTPVerify(e)}
            >
              {loading ? "Loading..." : "Verify OTP"}
            </button> */}
          </div>

          <div className="flex flex-col w-full text-white">
            <button
              className="font-medium text-sm  py-1.5 border rounded-md bg-light-green-600 w-auto text-white"
              onClick={(e) => onOTPVerify(e)}
            >
              {loading ? "Loading..." : "Verify OTP and Login"}
            </button>
            <button type="submit" disabled={loading} className="">
              {loading ? "" : ""}
            </button>
            <button
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 duration-300 mt-2 font-medium py-1.5 rounded-md"
              onClick={(e) => goBack(e)}
            >
              Back
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default MobileLogin;
