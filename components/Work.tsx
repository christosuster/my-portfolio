"use client";

import GoldFigure from "@/components/ui/GoldFigure";
import SectionHeader from "@/components/ui/SectionHeader";
import { plexMono, spaceGrotesk } from "@/utils/fonts";
import { WorkType } from "@/types/WorkType";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

function techOf(workTech: string) {
  return workTech
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

const Work = ({ work }: { work: WorkType[] }) => {
  const [active, setActive] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 28, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 220, damping: 28, mass: 0.35 });

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const preview = active === null ? null : work[active];

  return (
    <section
      id="work"
      className="min-h-screen w-full overflow-hidden text-white"
      onMouseMove={(event) => {
        if (!finePointer) return;
        x.set(event.clientX);
        y.set(event.clientY);
      }}
    >
      <div className="px-6 md:px-12 lg:px-20">
        <SectionHeader
          label="Work"
          aside={
            <p className={`${plexMono.className} pb-1 text-[11px] uppercase tracking-[0.18em] text-white/55`}>
              {String(work.length).padStart(2, "0")} projects
            </p>
          }
        />
      </div>

      <ol className="my-10 border-t border-white/15 md:my-16">
        {work.map((project, index) => {
          const meta = [project.year, project.role].filter(Boolean).join("  ·  ");
          const tech = techOf(project.workTech);

          return (
            <li key={project._id}>
              <Link
                href={`/work/${project.slug}`}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(index)}
                onBlur={() => setActive(null)}
                className="group grid gap-4 border-b border-white/15 px-6 py-8 transition-colors duration-300 hover:bg-white/[0.03] focus-visible:bg-white/[0.03] md:px-12 lg:grid-cols-[4.5rem_minmax(0,1fr)_16rem_2rem] lg:items-center lg:gap-8 lg:px-20 lg:py-10"
              >
                <span
                  className={`${plexMono.className} text-sm tabular-nums tracking-[0.14em] text-white/45 transition-colors duration-300 group-hover:text-theme`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <h3
                    className={`${spaceGrotesk.className} text-4xl font-medium leading-none tracking-tight transition-colors duration-300 group-hover:text-theme md:text-5xl`}
                  >
                    {project.title}
                  </h3>
                  {project.subtitle && (
                    <p className="mt-3 max-w-[46ch] text-base text-white/65">{project.subtitle}</p>
                  )}
                </div>

                <div className={`${plexMono.className} text-xs leading-relaxed lg:text-right`}>
                  {meta && <p className="uppercase tracking-[0.14em] text-white/55">{meta}</p>}
                  {tech.length > 0 && (
                    <p className={`normal-case tracking-normal text-white/70 ${meta ? "mt-2" : ""}`}>
                      {tech.join(" · ")}
                    </p>
                  )}
                </div>

                <span className="hidden text-theme transition-transform duration-300 group-hover:translate-x-1 lg:block">
                  →
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {finePointer && preview && (
        <motion.div
          className="pointer-events-none fixed z-50 hidden aspect-[16/9] w-72 -translate-x-1/2 -translate-y-[130%] overflow-hidden border border-white/10 lg:block"
          style={{ left: springX, top: springY }}
        >
          {preview.cover?.url ? (
            <Image
              src={preview.cover.url}
              alt=""
              fill
              sizes="240px"
              className="object-contain"
            />
          ) : (
            <GoldFigure
              initial={preview.title}
              index={String((active ?? 0) + 1).padStart(2, "0")}
              className="h-full w-full"
            />
          )}
        </motion.div>
      )}
    </section>
  );
};

export default Work;
