import { alumni, comfortaa, poiret, zen } from "@/utils/fonts";
import { TemplateType } from "@/types/TemplateType";
import {motion, useInView, useScroll, useSpring, useTransform} from "framer-motion";
import React, { useRef } from "react";
import {FiGithub,FiLinkedin,FiInstagram} from "react-icons/fi";


const Home = ({ data }: { data: TemplateType | null }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const xRight = useTransform(scrollYProgress, [0, 1], [0,2000]);
  const xRightSpringy = useSpring(xRight, {
    stiffness: 70,
    damping: 10,
    restDelta: 0.001,
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], [0,-2000]);
  const xLeftSpringy = useSpring(xLeft, {
    stiffness: 70,
    damping: 10,
    restDelta: 0.001,
  });
  return (
    <div
      ref={ref}
      id="home"
      className="px-6 md:px-20 text-white w-full min-h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      <div
        className={`text-center md:text-right 
        pt-10 `}
      >
        <div
          className={`lg:text-[14vw] md:text-[14vw] text-[15vh] leading-[0.7]  ${alumni.className} font-light text-center`}
        >
          <motion.h1 style={{translateX:xRightSpringy}}>CHRISTOS</motion.h1>
          <motion.h1 style={{translateX:xLeftSpringy}}>USTER</motion.h1>
          <motion.h1 style={{translateX:xRightSpringy}}>BISWAS</motion.h1>
        </div>

        <div className={`md:text-2xl text-xl my-2 text-center`}>
          <motion.h2 style={{translateX:xLeftSpringy}}>{data?.subtitle}</motion.h2>
          <motion.h2 style={{translateX:xRightSpringy}} className="md:text-lg text-sm my-1">{data?.subtitleSkills}</motion.h2>
          <motion.div style={{translateX:xLeftSpringy}} className="flex gap-3 mb-2 justify-center my-2">
            <a href="https://github.com/christosuster" target="_blank">
              <FiLinkedin className="transition-all text-3xl hover:text-yellow-500"/>
            </a>
            <a
              href="https://www.linkedin.com/in/christos-uster-biswas/"
              target="_blank"
            >
              <FiGithub className="transition-all text-3xl hover:text-yellow-500"/>
            </a>
            {/*<a href="https://www.instagram.com/his_dankness_chris/" target="_blank">*/}
            {/*  <FiInstagram className="transition-all text-4xl hover:text-yellow-500"/>*/}
            {/*</a>*/}
          </motion.div>
        </div>
      </div>
      {/*  <motion.img*/}
      {/*    initial={{ rotate: 40, scaleX: -1 }}*/}
      {/*    animate={{ x: [0, 30, 0], y: [0, -30, 0] }}*/}
      {/*    transition={{ ease: "easeInOut", duration: 1.5, repeat: Infinity }}*/}
      {/*    src="pointinghand.png"*/}
      {/*    className="hidden md:block absolute w-[200px] right-1/2 top-[45%] w-26 invert  opacity-50"*/}
      {/*    alt=""*/}
      {/*  />*/}

      {/*  <div className="w-4/5 md:w-96 mb-10 mx-auto md:mx-0 border-y-2 flex p-2 gap-2 border-white/60">*/}
      {/*    <img src="quotation.png" alt="" className="invert w-7 h-5 opacity-60"/>*/}
    {/*    <h1 className="text-white/50 md:text-3xl italic">{data?.intro}</h1>*/}
    {/*  </div>*/}
    </div>
  );
};

export default Home;
