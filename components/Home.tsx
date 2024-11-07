import { alumni, comfortaa, poiret, zen } from "@/utils/fonts";
import { TemplateType } from "@/types/TemplateType";
import { motion, useInView } from "framer-motion";
import React, { useContext, useRef } from "react";

const Home = ({ data }: { data: TemplateType | null }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div
      id="home"
      className="px-6 md:px-20 text-white w-full min-h-screen flex flex-col justify-between relative"
    >
      {/* <div className="absolute left-6 top-6  border-white grid grid-cols-2 gap-2 items-center group">
        <div className="grid grid-cols-1 gap-[6px]">
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
            className="invert w-[40px]"
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
            className="invert w-[40px]"
          />
        </div>

        <img src="/b.png" alt="" className="invert w-[42px] " />
      </div> */}
      <div
        className={`text-center md:text-right 
        pt-10 `}
      >
        <div
          className={`lg:text-[14vw] md:text-[14vw] text-[15vh] leading-[0.7]  ${alumni.className} font-light`}
        >
          <h1>CHRISTOS</h1>
          <h1>USTER</h1>
          <h1>BISWAS</h1>
        </div>

        <div className={`md:text-2xl text-xl my-2`}>
          <h2>{data?.subtitle}</h2>
          <h2 className="md:text-lg text-sm">{data?.subtitleSkills}</h2>
        </div>
      </div>
      <motion.img
        initial={{ rotate: 40, scaleX: -1 }}
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ ease: "easeInOut", duration: 1.5, repeat: Infinity }}
        src="pointinghand.png"
        className="hidden md:block absolute w-[200px] right-1/2 top-[45%] w-26 invert  opacity-50"
        alt=""
      />

      <div className="w-4/5 md:w-96 mb-10 mx-auto md:mx-0 border-y-2 flex p-2 gap-2 border-white/60">
        <img src="quotation.png" alt="" className="invert w-7 h-5 opacity-60"/>
        <h1 className="text-white/50 md:text-3xl italic">{data?.intro}</h1>
      </div>
    </motion.div>
  );
};

export default Home;
