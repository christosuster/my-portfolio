"use client";

import ArrowLink from "@/components/ui/ArrowLink";
import CountUp from "@/components/ui/CountUp";
import GoldFigure from "@/components/ui/GoldFigure";
import { MaskWords } from "@/components/ui/MaskLines";
import { plexMono, spaceGrotesk } from "@/utils/fonts";
import { WorkType } from "@/types/WorkType";
import Image from "next/image";
import Link from "next/link";

const sections = [
  { key: "context", label: "Context" },
  { key: "problem", label: "Problem" },
  { key: "approach", label: "Approach" },
  { key: "outcome", label: "Outcome" },
] as const;

function techOf(workTech: string) {
  return workTech
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function CaseStudy({
  work,
  next,
}: {
  work: WorkType;
  next?: { slug: string; title: string } | null;
}) {
  const eyebrow = [work.industry, work.year].filter(Boolean);
  const tech = techOf(work.workTech);
  const links = [
    work.live ? { href: work.live, label: "Live site" } : null,
    work.client ? { href: work.client, label: "Client" } : null,
    work.server ? { href: work.server, label: "Server" } : null,
  ].filter((item): item is { href: string; label: string } => item !== null);

  const facts = [
    work.role ? { label: "Role", value: work.role } : null,
    work.year ? { label: "Year", value: work.year } : null,
    tech.length ? { label: "Tech", value: tech.join(" · ") } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  return (
    <article className="min-w-0 flex-1 px-6 pb-28 pt-14 text-white md:px-12 lg:px-20 lg:pt-20">
      <ArrowLink href="/#work" direction="left">
        Work
      </ArrowLink>

      <header className="mt-12">
        {eyebrow.length > 0 && (
          <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55`}>
            {eyebrow.join("  ·  ")}
          </p>
        )}

        <h1
          className={`${spaceGrotesk.className} mt-4 max-w-[12ch] text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl`}
        >
          <MaskWords text={work.title} />
        </h1>

        {work.subtitle && (
          <p className="mt-6 max-w-[36ch] text-lg font-light text-white/75 md:text-xl">{work.subtitle}</p>
        )}

        {work.description && (
          <p className="mt-8 max-w-[62ch] text-lg font-light leading-relaxed text-white/90 md:text-xl">
            {work.description}
          </p>
        )}

      </header>

      {facts.length > 0 && (
        <dl className="mt-12 grid border-y border-white/15 sm:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="border-b border-white/15 py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0"
            >
              <dt className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55`}>
                {fact.label}
              </dt>
              <dd className="mt-2 max-w-[36ch] text-base leading-relaxed text-white/85">{fact.value}</dd>
            </div>
          ))}
        </dl>
      )}

      <Cover work={work} />

      {work.metrics.length > 0 && (
        <dl className="mt-16 grid border-y border-white/15 sm:grid-cols-3">
          {work.metrics.map((metric) => (
            <div key={`${metric.value}-${metric.label}`} className="border-white/15 py-8 sm:px-8 sm:first:pl-0">
              <dd
                className={`${spaceGrotesk.className} text-5xl font-medium tabular-nums tracking-tight text-theme md:text-6xl`}
              >
                <CountUp value={metric.value} />
              </dd>
              <dt
                className={`${plexMono.className} mt-3 text-[11px] uppercase tracking-[0.18em] text-white/55`}
              >
                {metric.label}
              </dt>
            </div>
          ))}
        </dl>
      )}

      {sections.map(({ key, label }) => {
        const value = work[key];
        if (!value) return null;

        return (
          <section key={key} className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-8">
            <h2
              className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55 md:sticky md:top-8 md:col-span-3 md:self-start`}
            >
              {label}
            </h2>
            <p className="whitespace-pre-line text-base font-light leading-relaxed text-white/85 md:text-lg md:col-span-8 md:col-start-5">
              {value}
            </p>
          </section>
        );
      })}

      {work.highlight && (
        <blockquote className="mt-16 max-w-[22ch] border-l-2 border-theme pl-6 md:mt-24">
          <p
            className={`${spaceGrotesk.className} text-3xl font-medium leading-snug tracking-tight md:text-5xl`}
          >
            {work.highlight}
          </p>
        </blockquote>
      )}

      {work.gallery.length > 0 && (
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-2">
          {work.gallery.map((item) => (
            <figure key={item.image.url}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image.url}
                  alt={item.caption || ""}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              {item.caption && (
                <figcaption
                  className={`${plexMono.className} mt-3 text-[11px] uppercase tracking-[0.16em] text-white/55`}
                >
                  {item.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      {work.responsibilities.length > 0 && (
        <section className="mt-16 grid gap-4 md:mt-24 md:grid-cols-12 md:gap-8">
          <h2
            className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55 md:sticky md:top-8 md:col-span-3 md:self-start`}
          >
            Responsibilities
          </h2>
          <ul className="border-t border-white/15 md:col-span-8 md:col-start-5">
            {work.responsibilities.map((item, index) => (
              <li
                key={`${item}-${index}`}
                className="flex gap-4 border-b border-white/15 py-4 text-base leading-relaxed text-white/85"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-theme" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {links.length > 0 && (
        <div className="mt-14 flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className={`${plexMono.className} border border-theme px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-theme transition-colors hover:bg-theme hover:text-black`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {next && (
        <Link href={`/work/${next.slug}`} className="group mt-24 block border-t border-white/15 pt-10">
          <p className={`${plexMono.className} text-[11px] uppercase tracking-[0.18em] text-white/55`}>
            Next
          </p>
          <p
            className={`${spaceGrotesk.className} mt-3 text-4xl font-medium tracking-tight transition-colors group-hover:text-theme md:text-6xl`}
          >
            {next.title}{" "}
            <span className="inline-block text-theme transition-transform duration-300 group-hover:translate-x-2">
              →
            </span>
          </p>
        </Link>
      )}
    </article>
  );
}

function Cover({ work }: { work: WorkType }) {
  if (!work.cover?.url) {
    return <GoldFigure initial={work.title} index={work.year} className="mt-16 aspect-[16/9]" />;
  }

  return (
    <div className="relative mt-16 aspect-[16/9] overflow-hidden">
      <Image
        src={work.cover.url}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 75vw, 100vw"
        className="object-contain"
      />
    </div>
  );
}
