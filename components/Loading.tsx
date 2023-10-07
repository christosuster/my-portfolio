import React from "react";
import { motion } from "framer-motion";
import { InfinitySpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      className="w-screen h-screen bg-black text-white text-3xl flex justify-center items-center flex-col"
    >
      <div className="">
        <div className=" border-white grid grid-cols-2 gap-2 items-center group">
          <div className="grid grid-cols-1 gap-[6px]">
            <motion.img
              animate={{
                rotate: [90, 180, 270, 360, 450],
              }}
              transition={{
                duration: 3.6,
                ease: "circIn",
                repeat: Infinity,
                repeatDelay: 2,
              }}
              src="/u.png"
              alt=""
              className="invert w-[40px]"
            />
            <motion.img
              animate={{ rotate: [0, 90, 180, 270, 360] }}
              transition={{
                duration: 3.6,
                ease: "circIn",
                repeat: Infinity,
                repeatDelay: 2,
              }}
              src="/u.png"
              alt=""
              className="invert w-[40px]"
            />
          </div>

          <img src="/b.png" alt="" className="invert w-[42px] " />
        </div>
      </div>

      <h1 className="font-light my-4 animate-pulse">Christos Uster Biswas</h1>
    </motion.div>
  );
};

export default Loading;
