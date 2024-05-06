import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiLogIn } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:640px)");
  const isUser = useSelector((state) => state.auth.user);

  return (
    <div className="fixed w-full bg-transparent sm:bg-slate-100 h-[2rem] z-40 backdrop-blur-lg sm:h-[4.8rem]  px-[1rem]">
      <CiMenuBurger
        className={isSmallScreen ? "text-[1.2rem]" : "sm:hidden"}
        onClick={() => setIsOpen(true)}
      />
      <Drawer open={isOpen && isSmallScreen} onClose={() => setIsOpen(false)}>
        {/* Content inside the Drawer */}
        <div
          style={{ width: "200px" }}
          className="flex flex-col gap-3 sm:text-[2rem]"
        >
          <div className="text-2xl font-bold">
            {/* Adjust the image src to an appropriate value */}
            <img
              src="https://res.cloudinary.com/dieuxovim/image/upload/v1714463480/logo_i65ssl.png"
              alt="LOGO"
              className="h-16 w-full "
            />
          </div>
          {isUser && (
            <div className="ml-[1rem] text-[1.3rem] text-red-300">
              {isUser.username.toUpperCase()}{" "}
            </div>
          )}
          <div className="ml-[1rem] text-[1.3rem] sm:text-[2rem]">Home</div>
          <div className="ml-[1rem] text-[1.3rem]">About</div>
          <div className="ml-[1rem] text-[1.3rem]">Contact</div>
          {/* login ,signup, signout */}
          {!isUser && (
            <Link to="/login" className="ml-[1rem] text-[1.3rem]">
              Login
            </Link>
          )}
        </div>
      </Drawer>

      <div className="sm:flex hidden justify-between p-2 items-center">
        <div className="text-2xl font-bold">
          {/* Adjust the image src to an appropriate value */}
          <img
            src="https://res.cloudinary.com/dieuxovim/image/upload/v1714463480/logo_i65ssl.png"
            alt="LOGO"
            className="h-16 w-auto"
          />
        </div>
        <div className="flex gap-[3rem] justify-center items-center">
          <div className="text-[1.4rem] font-thin hover:text-red-700">
            <Link to="/">Home</Link>
          </div>
          <div className="text-[1.4rem] font-thin">
            <Link to="/about">About</Link>
          </div>
          <div className="text-[1.4rem] font-thin">
            <Link to="/contact">Contact</Link>
          </div>
          {/* login ,signup, signout */}
          {!isUser && (
            <Link
              to="/login"
              className="text-[1.4rem] font-thin flex items-center justify-center bg-red-400 p-[6px] rounded-md text-white"
            >
              Login
              <FiLogIn className="text-[25px] font-thin" />
            </Link>
          )}

          {isUser && (
            <div className="text-[1.4rem]  flex items-center justify-center bg-red-400 p-[6px] rounded-md text-white gap-[10px]">
              <img
                src={isUser?.avatar.url}
                className="h-[40px] w-[40px] rounded-full"
                alt=""
              />
              <Link to='/dashboard'> {isUser.username} </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
