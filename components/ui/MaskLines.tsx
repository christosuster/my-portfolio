"use client";

import { motion, Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};

export default function MaskLines({
  lines,
  className = "",
}: {
  lines: string[];
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={container}
      className={className}
    >
      {lines.map((text, index) => (
        <span key={`${text}-${index}`} className="block overflow-hidden">
          <motion.span variants={line} className="block">
            {text}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

export function MaskWords({
  text,
  highlight,
  className = "",
}: {
  text: string;
  highlight?: string;
  className?: string;
}) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const highlighted = new Set(
    (highlight ?? "")
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase()),
  );

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={wordContainer}
      className={className}
    >
      {words.map((word, index) => {
        const key = word.replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();
        const isHighlight = highlighted.has(key);

        return (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              variants={line}
              className={`inline-block ${isHighlight ? "text-theme" : ""}`}
            >
              {word}
              {index < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
