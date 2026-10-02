import { plexMono } from "@/utils/fonts";
import Link from "next/link";
import { ReactNode } from "react";

const classes = `${plexMono.className} group inline-flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-white/80 transition-colors hover:text-theme`;

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
      aria-hidden
      className={`inline-flex text-theme transition-transform duration-300 ${
        direction === "left" ? "group-hover:-translate-x-1.5" : "group-hover:translate-x-1.5"
      }`}
    >
      <svg viewBox="0 0 36 16" className="h-4 w-9" fill="none">
        {direction === "left" ? (
          <>
            <path d="M34 8H2" stroke="currentColor" strokeWidth="1.75" />
            <path d="M9 1.5 2 8l7 6.5" stroke="currentColor" strokeWidth="1.75" />
          </>
        ) : (
          <>
            <path d="M2 8h32" stroke="currentColor" strokeWidth="1.75" />
            <path d="M27 1.5 34 8l-7 6.5" stroke="currentColor" strokeWidth="1.75" />
          </>
        )}
      </svg>
    </span>
  );

  const label = (
    <>
      {direction === "left" && arrow}
      <span className="relative inline-flex items-center leading-none">
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
