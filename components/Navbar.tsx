"use client";
import { comfortaa, poiret } from "@/utils/fonts";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";

const navLinks = [
  // { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Work", id: "work" },
  { name: "Contact", id: "contact" },
];

const Navbar = () => {
  const [smallScreen, setSmallScreen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 770) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }, []);

  window.addEventListener("resize", () => {
    if (window.innerWidth < 770) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  });

  return (
    <div className="z-[9999]">
      {smallScreen && (
        <button
          onClick={() => {
            setMenuIsOpen(!menuIsOpen);
          }}
          className="bg-white/70 z-20 p-4 rounded-full leading-3 fixed left-5 top-5"
        >
          {menuIsOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      )}
      {smallScreen ? (
        <nav
          className={`${
            poiret.className
          } fixed z-10 w-screen h-screen overflow-hidden top-0 left-0  justify-center items-center bg-black text-white  flex-col gap-3 ${
            menuIsOpen ? "flex" : "hidden"
          }`}
        >
          <Link
            href={"#home"}
            className=""
            onClick={() => {
              setMenuIsOpen(false);
            }}
          >
            <div className="  border-white grid grid-cols-2 gap-2 items-center group justify-center">
              <div className="justify-items-end grid grid-cols-1 gap-[8px]">
                <motion.img
                  animate={{
                    rotate: [90, 180, 270, 360, 450],
                  }}
                  transition={{
                    duration: 4,
                    ease: "circIn",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  src="/u.png"
                  alt=""
                  className="invert w-[34px]"
                />
                <motion.img
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{
                    duration: 4,
                    ease: "circIn",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  src="/u.png"
                  alt=""
                  className="invert w-[34px]"
                />
              </div>

              <img src="/b.png" alt="" className="invert w-[38px] " />
            </div>
          </Link>
          {navLinks.map((item, i) => {
            return (
              <Link
                className="text-3xl py-5 hover:underline hover:text-theme "
                key={item.id}
                href={`#${item.id}`}
                onClick={() => {
                  setMenuIsOpen(false);
                }}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      ) : (
        <nav
          className={`${poiret.className} w-20 flex flex-col text-lg font-thin justify-between bg-black border-r-[1px] border-white h-screen py-10 sticky top-0 left-0 text-white`}
        >
          <Link href={"#home"} className="">
            <div className="  border-white grid grid-cols-2 gap-[6px] items-center group justify-center">
              <div className="justify-items-end grid grid-cols-1 gap-[4px]">
                <motion.img
                  animate={{
                    rotate: [90, 180, 270, 360, 450],
                  }}
                  transition={{
                    duration: 4,
                    ease: "circIn",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  src="/u.png"
                  alt=""
                  className="invert w-[20px]"
                />
                <motion.img
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{
                    duration: 4,
                    ease: "circIn",
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  src="/u.png"
                  alt=""
                  className="invert w-[20px]"
                />
              </div>

              <img src="/b.png" alt="" className="invert w-[22px] " />
            </div>
          </Link>
          {navLinks.map((item) => {
            return (
              <Link
                className="mx-auto group w-full flex justify-center items-center flex-col hover:font-bold"
                key={item.id}
                href={`#${item.id}`}
              >
                {item.name.split("").map((letter, i) => {
                  return (
                    <h5
                      key={i}
                      className="[writing-mode:vertical-lr] flex justify-center items-center w-[16px] h-[16px] group-hover:-rotate-90 transition-transform ease-in-out group-hover:text-theme"
                    >
                      {letter}
                    </h5>
                  );
                })}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );

  return;
};

export default Navbar;
