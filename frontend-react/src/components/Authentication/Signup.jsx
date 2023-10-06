import React, { useState } from "react";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [picture, setPicture] = useState();

  const handleClick = () => setShow(!show);

  const PostDetails = (pics) => {};

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section>
        <form
          className="flex flex-col gap-y-1.5 my-2 px-1 text-start"
          onSubmit={onSubmit}
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
              value={picture}
              accept="image/*"
              onChange={(e) => PostDetails(e.target.files[0])}
            />
          </div>
          <div className="flex flex-col w-full text-white">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 duration-300 font-medium py-1.5 rounded-md"
            >
              Sign Up
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Signup;
