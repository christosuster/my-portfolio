"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { MaskWords } from "@/components/ui/MaskLines";
import { plexMono, spaceGrotesk } from "@/utils/fonts";
import { TemplateType } from "@/types/TemplateType";
import { motion, Variants } from "framer-motion";

const rise: Variants = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const About = ({ data }: { data: TemplateType | null }) => {
  const facts = [
    data?.role ? { label: "Role", value: data.role } : null,
    data?.focus ? { label: "Focus", value: data.focus } : null,
    data?.location ? { label: "Location", value: data.location } : null,
    data?.availability ? { label: "Availability", value: data.availability } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  const experience = data?.experience ?? [];
  const currently = data?.currently ?? [];

  return (
    <section id="about" className="w-full overflow-hidden px-6 text-white md:px-12 lg:px-20">
      <SectionHeader label="About" />

      <div className="my-16 lg:my-24">
        {data?.aboutTitle && (
          <h3
            className={`${spaceGrotesk.className} max-w-[18ch] text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl`}
          >
            <MaskWords text={data.aboutTitle} />
          </h3>
        )}

        {facts.length > 0 && (
          <motion.dl
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="mt-12 grid border-y border-white/15 sm:grid-cols-2 lg:grid-cols-4"
          >
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="overflow-hidden border-b border-white/15 py-5 last:border-b-0 sm:px-6 sm:odd:border-r sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0 lg:[&:nth-child(n+3)]:border-b-0"
              >
                <motion.div variants={rise}>
                  <dt className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55`}>
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-base leading-relaxed text-white/90">{fact.value}</dd>
                </motion.div>
              </div>
            ))}
          </motion.dl>
        )}

        <div className="mt-16 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            {(data?.aboutContent || data?.aboutContentSpan) && (
              <p className="max-w-[62ch] text-base font-light leading-relaxed text-white/85 md:text-lg">
                {data?.aboutContent}
                {data?.aboutContent && data?.aboutContentSpan ? " " : null}
                {data?.aboutContentSpan && (
                  <span className="text-theme">{data.aboutContentSpan}</span>
                )}
              </p>
            )}
          </div>

          {currently.length > 0 && (
            <div className="md:col-span-4 md:col-start-9">
              <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55`}>
                Currently
              </p>
              <ul className="mt-4 border-t border-white/15">
                {currently.map((item) => (
                  <li
                    key={item}
                    className="border-b border-white/15 py-3 text-base leading-relaxed text-white/85"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {experience.length > 0 && (
          <div className="mt-20">
            <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55`}>
              Experience
            </p>
            <ol className="mt-4 border-t border-white/15">
              {experience.map((item) => (
                <li
                  key={`${item.period}-${item.company}-${item.role}`}
                  className="grid gap-2 border-b border-white/15 py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-10"
                >
                  <p className={`${plexMono.className} text-xs uppercase tracking-[0.16em] text-theme`}>
                    {item.period}
                  </p>
                  <div>
                    <p className={`${spaceGrotesk.className} text-xl font-medium tracking-tight`}>
                      {item.role}
                    </p>
                    {item.company && <p className="mt-1 text-white/70">{item.company}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
