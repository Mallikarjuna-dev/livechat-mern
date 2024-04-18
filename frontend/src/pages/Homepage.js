import React, { useEffect, useState } from "react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";
import MobileLogin from "../components/Authentication/MobileLogin";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container w-4/5 md:w-4/6 lg:w-3/5 xl:w-2/5 mx-auto mt-12 md:mt-16 lg:mt-12 popin">
      <div className="bg-white my-2 rounded-lg">
        <h2 className="text-3xl font-normal py-2">Talk-A-Tive</h2>
      </div>
      <div className="bg-white w-full py-2 rounded-lg">
        {activeTab === "viaotp" ? (
          <h4 className="text-xl font-normal rounded-md mx-auto bg-blue-gray-500 text-white py-1.5">
            Login using mobile otp
          </h4>
        ) : (
          <div className="flex justify-evenly">
            <button
              className={`${activeTab === "login"
                ? "bg-blue-gray-500 text-white font-normal"
                : "bg-white hover:bg-blue-gray-50"
                } py-1.5 w-28 md:w-40 lg:w-56 rounded-full duration-300`}
              onClick={() => handleTabClick("login")}
            >
              Login
            </button>

            <button
              className={`${activeTab === "signup"
                ? "bg-blue-gray-500 text-white font-medium"
                : "bg-white hover:bg-blue-gray-50 "
                } py-1.5 w-28 md:w-40 lg:w-56 rounded-full duration-300`}
              onClick={() => handleTabClick("signup")}
            >
              Sign Up
            </button>
          </div>
        )}
        <div className="px-4">
          {activeTab === "login" ? (
            <div>
              <Login activeTab={activeTab} handleTabClick={handleTabClick} />
            </div>
          ) : activeTab === "signup" ? (
            <div className="overflow-clip">
              <Signup />
            </div>
          ) : (
            <div className="overflow-clip">
              <MobileLogin />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
