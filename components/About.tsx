import React, { useRef } from "react";
import "react-tooltip/dist/react-tooltip.css";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { poiret } from "@/app/(general)/layout";
import { Tooltip } from "react-tooltip";
import { TemplateType } from "@/types/TemplateType";

const About = ({ data }: { data: TemplateType | null }) => {
  const ref = useRef(null);
  const aboutMe = useRef(null);
  const aboutInView = useInView(aboutMe, { once: true });
  const skills = useRef(null);
  const skillsInView = useInView(skills, { once: true });
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
    <div
      id="about"
      className="px-20 md:px-20 mt-[200px] text-white w-full overflow-hidden"
    >
      <div
        ref={ref}
        className={` w-full  h-[170px] flex flex-col justify-end items-start ${poiret.className} `}
      >
        <motion.h1
          className="leading-[13px] origin-bottom-left text-sm "
          style={{ scale: ySpringy }}
        >
          About
        </motion.h1>
      </div>
      <motion.hr
        style={{ scaleX: xSpringy }}
        className="bg-theme h-[2px] border-transparent w-full origin-right"
      />

      <div className="my-32 lg:px-20text-left">
        <div className="flex w-full md:flex-row-reverse gap-10 flex-col">
          <div
            className="md:w-1/2 mb-16"
            ref={aboutMe}
            style={{
              opacity: aboutInView ? 1 : 0,
              transform: aboutInView ? "none" : "translateY(200px)",
              transition: "linear 0.5s",
            }}
          >
            <h1 className={`${poiret.className} text-4xl my-4`}>
              {data?.aboutTitle}
            </h1>
            <div className="lg:w-5/6 xl:w-3/4">
              <h1 className="leading-5">
                {data?.aboutContent}{" "}
                <span
                  className="italic text-yellow-200 cursor-pointer"
                  id="clickable"
                >
                  {data?.aboutContentSpan}
                </span>
              </h1>

              <Tooltip
                className=" w-full "
                anchorSelect="#clickable"
                variant="warning"
                delayHide={1000}
              >
                <button className="text-black font-bold">Sleeping :3</button>
              </Tooltip>
            </div>
          </div>

          <div
            className="md:w-1/2 md:border-0 border-y-2 border-theme"
            ref={skills}
            style={{
              opacity: skillsInView ? 1 : 0,
              transform: skillsInView ? "none" : "translateY(200px)",
              transition: "linear 0.5s",
            }}
          >
            <div className="lg:w-3/4 mb-10">
              <h1 className={`${poiret.className} text-4xl my-4`}>Core Tech</h1>
              <div className="flex flex-wrap flex-row gap-2 ">
                {data?.coreTech?.map((e, i) => {
                  return (
                    <h1
                      key={i}
                      className="border-[2px] border-theme w-fit px-3 py-[2px] rounded-3xl"
                    >
                      {e}
                    </h1>
                  );
                })}
              </div>
            </div>

            <div className="lg:w-3/4 mb-10 ">
              <h1 className={`${poiret.className} text-4xl my-4`}>Tools</h1>
              <div className="flex flex-wrap flex-row gap-2 ">
                {data?.tools?.map((e, i) => {
                  return (
                    <h1
                      key={i}
                      className="border-[2px] border-theme w-fit px-3 py-[2px] rounded-3xl"
                    >
                      {e}
                    </h1>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
