import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = ({ handleTabClick }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleClick = () => setShow(!show);
  const handleClick = (e, inputType) => {
    if (inputType === "password") {
      e.preventDefault();
    }
    setShow(!show);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Please fill all the required fields!");
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
        "/api/user/login",
        { email, password },
        config
      );
      toast.success("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast.error("Login failed! wrong inputs", error);
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
      console.log("Form submitted!");
    }, 2000);
  };

  return (
    <>
      <section>
        <form
          className="flex flex-col gap-y-2 my-2 px-1 text-start"
          onSubmit={onSubmit}
        >
          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Email Address<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="my-2 py-1 px-3 border bg-gray-100 rounded-md"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                className="my-2 py-1 w-full px-3 border bg-gray-100 rounded-md"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 right-0 font-semibold text-sm pr-5 flex items-center w-auto text-black"
                // onClick={handleClick}
                onClick={(e) => handleClick(e, "password")}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col w-full text-white">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 duration-300 font-medium py-1.5 rounded-md"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <button
              // disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 duration-300 mt-2 font-medium py-1.5 rounded-md"
              onClick={() => {
                handleTabClick("viaotp");
              }}
            >
              Login via Mobile Number
            </button>
            <button
              className=" bg-red-600 hover:bg-red-800 duration-300 mt-2 font-normal py-1.5 rounded-md"
              onClick={(e) => {
                e.preventDefault();
                toast.warn("Temporarily disabled! Please signup");
                // setEmail("guest@example.com");
                // setPassword("123456");
              }}
            >
              Get Guest User Credentials
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;
