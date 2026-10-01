"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function CountUp({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const match = value.trim().match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
  const [display, setDisplay] = useState(() =>
    target === null ? value : format(0, decimals),
  );

  useEffect(() => {
    if (!inView || target === null) return;

    const controls = animate(0, target, {
      duration: 1.15,
      ease: EASE,
      onUpdate: (latest) => setDisplay(format(latest, decimals)),
    });

    return () => controls.stop();
  }, [decimals, inView, target]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

function format(value: number, decimals: number) {
  if (decimals > 0) return value.toFixed(decimals);
  return String(Math.round(value));
}
