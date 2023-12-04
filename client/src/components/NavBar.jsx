import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { logo } from "../assets";
import { AiFillCaretDown } from "react-icons/ai";
import { useUser } from "../context/UserContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, setUserData, logout } = useUser();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("auth");
    localStorage.removeItem("email");
    setUserData.logout();
  };

  useEffect(() => {
    // Retrieve data from localStorage when the component mounts
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth === "true") {
      // Set user data if auth exists in localStorage
      setUserData(storedUsername, true, storedEmail);
    }
  }, []);

  return (
    <nav className="p-4 lg:p-4 flex ">
      {/* Left Side: Logo */}
      <div className="w-full font-semibold flex">
        <Link to="/">
          <img src={logo} alt="logo" className="lg:w-36 w-24 object-contain" />
        </Link>
      </div>

      {/* Right Side: Links and Dropdown */}

      <div className="flex lg:space-x-6 space-x-2 ">
        {user.auth && (
          <Link
            to="/create-post"
            className="lg:text-base text-sm font-inter font-medium bg-[#5f86db] hover:bg-[#4d6db3] text-white lg:px-6 px-2 py-2 rounded-full"
          >
            Create
          </Link>
        )}
        {user.auth && (
          <Link
            to="/mypost"
            className="lg:text-base text-sm font-inter font-medium bg-[#5f86db] hover:bg-[#4d6cb1] text-white lg:px-6 px-2 py-2 rounded-full"
          >
            Mypost
          </Link>
        )}

        {/* Logout Dropdown */}
        {user.auth ? (
          <div className=" lg:text-base text-sm relative text-left lg:px-6 px-1 py-2 border border-orange-600 bg-transparent transition-all hover:bg-orange-600 hover:text-white rounded-full">
            <button onClick={toggleDropdown} className="flex items-center">
              <span className="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[160px] lg:max-w-[200px]">
                {user?.username.split(" ")[0]}
              </span>
              <span className="my-auto ml-2">
                <AiFillCaretDown />
              </span>
            </button>
            {isOpen && (
              <div className="origin-top-right absolute text-center lg:right-4 mt-4 w-28 md:w-30 rounded-md shadow-lg bg-white text-red-600 ring-1 ring-black ring-opacity-5">
                <div
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    onClick={handleLogout}
                    to="/"
                    className="block px-4 py-2 text-sm text-teal-200-800  rounded-md"
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex text-center">
            <Link
              to="/signup"
              className="w-36 font-inter font-medium hover:shadow-lg transition ease-in-out delay-150 bg-[#5f86db] hover:bg-white hover:text-[#5f86db] border border-[#5f86db] text-white lg:px-4 px-2 text-sm lg:text-base py-2 rounded-full cursor-pointer"
            >
              Login / Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
