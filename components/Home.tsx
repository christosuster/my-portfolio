"use client";

import { spaceGrotesk } from "@/utils/fonts";
import { TemplateType } from "@/types/TemplateType";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import React, { useRef } from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const nameBlock: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const nameLine: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const Home = ({ data }: { data: TemplateType | null }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);
  return (
    <div
      ref={ref}
      id="home"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-white md:px-20"
    >
      <motion.div style={{ opacity }} className="w-full min-w-0 pt-10 text-center">
        <motion.div initial="hidden" animate="visible" variants={nameBlock}>
          <div
            className={`text-center text-[clamp(2.5rem,18vw,15vh)] font-medium uppercase leading-[0.78] tracking-[-0.045em] md:text-[12vw] lg:text-[11vw] ${spaceGrotesk.className}`}
          >
            {["Christos", "Uster", "Biswas"].map((line) => (
              <span key={line} className="block overflow-hidden">
                <motion.h1 variants={nameLine}>{line}</motion.h1>
              </span>
            ))}
          </div>

          <motion.div
            variants={nameLine}
            className="mx-auto mt-8 max-w-xl text-center text-lg font-light md:text-xl"
          >
            <h2>{data?.subtitle}</h2>
            <h2 className="my-1 text-sm text-white/70 md:text-base">{data?.subtitleSkills}</h2>
            <div className="my-4 flex justify-center gap-4">
              <a
                href="https://github.com/christosuster"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <FiGithub className="text-2xl transition-colors hover:text-theme" />
              </a>
              <a
                href="https://www.linkedin.com/in/christos-uster-biswas/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="text-2xl transition-colors hover:text-theme" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
