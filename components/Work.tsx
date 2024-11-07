import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  useInView,
} from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { ImArrowUpRight2 } from "react-icons/im";
import { getWork } from "@/sanity/sanity-utils";
import { WorkType } from "@/types/WorkType";
import { poiret } from "@/utils/fonts";

const Work = () => {
  const [work, setWork] = useState<WorkType[] | null>(null);
  useEffect(() => {
    getWork().then((e) => setWork(e));
  }, []);

  const ref = useRef(null);
  const workRef = useRef(null);
  const workInView = useInView(workRef, { once: false });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "0.1 start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [3, 10]);
  const ySpringy = useSpring(y, {
    stiffness: 95,
    damping: 30,
    restDelta: 0.001,
  });
  const x = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const xSpringy = useSpring(x, {
    stiffness: 95,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div id="work" className="  text-white w-full min-h-screen overflow-hidden">
      <div className="px-20">
        <div
          ref={ref}
          className={` w-full  h-[170px] flex flex-col justify-end md:items-start items-center  ${poiret.className} `}
        >
          <motion.h1
            className="leading-[13px] md:origin-bottom-left origin-bottom md:text-sm text-[10px] "
            style={{ scale: ySpringy }}
          >
            Work
          </motion.h1>
        </div>
        <motion.hr
          style={{ scaleX: xSpringy }}
          className="bg-theme h-[2px] border-transparent w-full origin-right"
        />
      </div>

      <div className="w-full border-y-2 border-theme my-32 grid grid-cols-1 divide-y-2">
        {work?.map((e, i) => {
          return (
            <motion.div
              key={i}
              whileHover={{
                backgroundImage: `linear-gradient(0deg,
                #bb8f06 0%,
                #bb8f06 50%,
                #bb8f06 75%,
                #bb8f06 100%,
                black 100%)`,
                backgroundPositionY: "-200%",
                transition: {duration: 0.5},
              }}
              className="transition-colors border-theme py-5 flex flex-col justify-center items-center lg:flex-row lg:justify-between px-6 lg:px-20 gap-4 relative"
            >
              <a target="_blank"
                 href={e.live} className="absolute w-full h-full top-0 left-0 z-10"></a>

                <div className={` w-full mx-auto relative`}>

                  <div className="flex flex-col w-full items-end lg:justify-start lg:flex-row">
                    <h1
                      className={`${poiret.className} flex-shrink-0 xl:text-[100px] lg:text-7xl md:text-6xl text-5xl text-center lg:text-left mx-auto lg:mx-0 leading-[1]`}
                    >
                      {e.title}
                    </h1>
                    <h1
                      className={`${poiret.className} pl-3 lg:pl-6 text-sm lg:text-lg xl:text-xl leading-[3] lg:leading-[1] text-center lg:text-left mx-auto lg:mx-0`}
                    >
                      / {e.subtitle}
                    </h1>
                  </div>

                  <ImArrowUpRight2 className="absolute right-0 top-0 text-2xl"/>

                  <h1
                    className="mx-auto lg:mx-0 max-w-[800px] mt-5 lg:text-xl text-center lg:text-left text-sm !leading-[1.1]">
                    {e.description}
                  </h1>

            </div>

          <div className="flex flex-col justify-center items-center text-xs lg:items-end lg:w-1/5">
            <h1 className=" underline underline-offset-4 leading-5 text-right">
                  {e.workTech}
                </h1>
                <div className="flex gap-3">
                  {e.client && (
                    <Link
                      target="_blank"
                      href={e.client}
                      className="flex justify-center items-center gap-1 leading-[0] mt-4 text-xl  bg-yellow-400/70 drop-shadow-lg text-black rounded-3xl p-2 hover:bg-white transition-all z-20"
                    >
                      <AiOutlineGithub />
                      Client
                    </Link>
                  )}
                  {e.server && (
                    <Link
                      target="_blank"
                      href={e.server}
                      className="flex justify-center items-center gap-1 leading-[0] mt-4 text-xl bg-yellow-400/70 drop-shadow-lg text-black rounded-3xl p-2 hover:bg-white transition-all z-20"
                    >
                      <AiOutlineGithub />
                      Server
                    </Link>
                  )}
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Work;
