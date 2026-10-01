"use client";

import { spaceGrotesk } from "@/utils/fonts";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export default function SectionHeader({
  label,
  aside,
}: {
  label: string;
  aside?: ReactNode;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "start start"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div>
      <div
        ref={ref}
        className="flex h-[150px] w-full items-end justify-between gap-6"
      >
        <h2
          className={`${spaceGrotesk.className} text-5xl font-medium leading-none tracking-tight md:text-6xl`}
        >
          {label}
        </h2>
        {aside}
      </div>
      <motion.hr
        style={{ scaleX }}
        className="mt-6 h-[2px] w-full origin-right border-transparent bg-theme"
      />
    </div>
  );
}
