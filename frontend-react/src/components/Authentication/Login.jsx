import React, { useState } from "react";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  console.log(email, password);

  const handleClick = () => setShow(!show);

  const onSubmit = (e) => {
    e.preventDefault();
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
                onClick={handleClick}
              >
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full text-white">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 duration-300 font-medium py-1.5 rounded-md"
            >
              Login
            </button>
            <button
              className=" bg-red-600 hover:bg-red-800 duration-300 mt-2 font-normal py-1.5 rounded-md"
              onClick={() => {
                setEmail("guest@example.com");
                setPassword("123456");
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
