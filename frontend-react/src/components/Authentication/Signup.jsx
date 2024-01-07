import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate("");

  const handleClick = () => setShow(!show);

  const PostDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast.warn("Please choose an Image!");
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
      toast.error("Please select an Image!");
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all the required fields!");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password must be at same!");
      return;
    }

    try {
      const config = {
        Headers: {
          "Content-type": "application/json",
        },
      };
      const response = await axios.post(
        "/api/user",
        {
          name,
          email,
          password,
          pic,
        },
        config
      );

      toast.success("Registaration Successful");
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      toast.error("Registration failed!", error);
      setLoading(false);
    }

    setTimeout(() => {
      setLoading(false);
      console.log("Form submitted!");
    }, 2000); // Simulating a 2-second delay
  };

  return (
    <>
      <section>
        <form
          className="flex flex-col gap-y-1.5 my-2 px-1 text-start"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Name<span className="text-red-600">*</span>
            </label>
            <input
              type="name"
              className="my-2 py-1 px-3 border-blue-500 bg-gray-100 rounded-md"
              value={name}
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Email Address<span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              className="my-2 py-1 px-3 border bg-gray-100 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              placeholder="Enter your Email"
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
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-semibold">
              Confirm Password<span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                id="password"
                className="my-2 py-1 w-full px-3 border bg-gray-100 rounded-md"
                value={confirmPassword}
                placeholder="Enter password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className="absolute inset-y-0 right-0 font-semibold text-sm pr-5 flex items-center w-auto text-black"
                onClick={handleClick}
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
              className="my-2 py-1 px-3 border bg-gray-100 rounded-md"
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
