import React, { useContext, useState } from "react";
import { Navigate, useNavigate, Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    console.log(name, email, password, address);

    try {
      const response = await fetch("http://localhost:5003/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password,
          address,
          phoneNumber,
        }),
      });

      const responseData = await response.json();

      console.log(responseData);

      if (responseData.success) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="bg-gray-50 w-screen p-8 flex justify-center">
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
              Create Account
            </h4>
            <p className="text-center font-light text-sm">
              Join an awesome Library Management System
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              value={name}
              placeholder="Enter your name."
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              placeholder="Enter your email."
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              value={phoneNumber}
              placeholder="Enter your phone number."
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setPhoneNumber(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="address">Address</label>
            <input
              value={address}
              id="address"
              placeholder="Enter your address."
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              id="password"
              placeholder="Enter your password."
              className="border w-full p-2 rounded-lg"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
          <button
            className="w-full bg-black text-white border p-2 rounded-lg
          hover:bg-gray-800 cursor-pointer"
            onClick={handleRegister}
          >
            Sign Up
          </button>

          <p className="text-center">
            Already Have an Account?{" "}
            <Link to={"/login"} className="underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
