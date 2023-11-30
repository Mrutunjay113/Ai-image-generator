import React, { useState, useEffect } from "react";
import { FormField } from "../components";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import { signup, login } from "../utils";
import { useUser } from "../context/UserContext";

const Signup = () => {
  const navigate = useNavigate();
  const { user, setUserData } = useUser();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [auth, setAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const handleShow = () => {
    setIsLogin(!isLogin);
    console.log(isLogin);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isLogin) {
      console.log("Login form", isLogin);
      const data = await login(form);
      const usernameData = data?.data?.data?.name;
      console.log(usernameData);
      const emailData = data?.data?.data?.email;

      if (data?.status === 200) {
        setUserData(usernameData, true, emailData);
        // Navigate to the desired page upon successful login.
        navigate("/");
        console.log("redirecting to home...");
        alert("logged in successful");
      } else {
        // Authentication failed, show an alert.
        console.log("failed signup");

        alert("Authentication failed. Please check your credentials.");
      }

      // setForm({ name: "", email: "", password: "" });
    }
    if (!isLogin) {
      console.log("signup form", isLogin);

      const response = await signup(form);
      const usernameData = response?.data?.data?.name;

      const emailData = response?.data?.data?.email;
      if (response?.status === 201) {
        setUserData(usernameData, true, emailData);
        // Navigate to the desired page upon successful login.
        navigate("/");
        console.log("redirecting to home...");
        alert("registered successful");
      } else {
        alert("user exist");
        // Authentication failed, show an alert.
      }
    }
  };
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className="md:mt-16 max-w-3xl mx-auto" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        {!isLogin && (
          <FormField
            labelName="User Name"
            type="text"
            name="name"
            placeholder="John doe"
            value={form.name}
            handleChange={handleChange}
          />
        )}
        <FormField
          labelName="Email"
          type="email"
          name="email"
          placeholder="email@gmail.com"
          value={form.email}
          handleChange={handleChange}
        />
        <FormField
          labelName="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          handleChange={handleChange}
        />
        <button
          type="submit"
          className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center cursor-pointer"
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p
          onClick={handleShow}
          className="mt-3  text-[#537FE7] hover:text-white hover:bg-[#537FE7] font-medium w-fit ml-auto text-end border cursor-pointer px-4 py-2 rounded-md "
        >
          {isLogin ? "Signup?" : "Login"}
        </p>
      </div>
    </form>
  );
};

export default Signup;
