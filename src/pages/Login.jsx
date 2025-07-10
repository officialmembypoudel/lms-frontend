import React from "react";

const Login = () => {
  return (
    <div className="bg-gray-50 h-screen w-screen p-8 flex justify-center">
      <div>
        <div className="mb-8">
          <div className="bg-black p-4 w-12 h-12 rounded-full mx-auto mb-6"></div>
          <h3 className="text-4xl font-bold text-center mb-2">LMS</h3>
          <p className="text-center font-light">
            A Digital Library Management System
          </p>
        </div>
        <form className="bg-white w-[400px] rounded-xl p-4 space-y-4 shadow">
          <div className="mb-8">
            <h4 className="text-2xl font-bold text-center mb-2">
              Welcome Back
            </h4>
            <p className="text-center font-light text-sm">
              Sign in to access your library account
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="Enter your email."
              className="border w-full p-2 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              placeholder="Enter your password."
              className="border w-full p-2 rounded-lg"
            />
          </div>
          <button
            className="w-full bg-black text-white border p-2 rounded-lg
          hover:bg-gray-800 cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
