import { plexMono } from "@/utils/fonts";
import Link from "next/link";
import { ReactNode } from "react";

const classes = `${plexMono.className} group inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-theme`;

export default function ArrowLink({
  href,
  children,
  external = false,
  direction = "right",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  direction?: "left" | "right";
}) {
  const arrow = (
    <span
      className={`text-theme transition-transform duration-300 ${
        direction === "left" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
      }`}
    >
      {direction === "left" ? "←" : "→"}
    </span>
  );

  const label = (
    <>
      {direction === "left" && arrow}
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-theme transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      {direction === "right" && arrow}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
