import { plexMono, spaceGrotesk } from "@/utils/fonts";

export default function GoldFigure({
  initial,
  index,
  className = "",
}: {
  initial: string;
  index?: string;
  className?: string;
}) {
  const mark = initial.trim().slice(0, 1).toUpperCase() || "—";

  return (
    <div className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(187,143,6,0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(187,143,6,0.22) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-theme/10 via-transparent to-black" />
      <div className="relative flex h-full min-h-[10rem] w-full items-center justify-center">
        <span
          className={`${spaceGrotesk.className} text-6xl font-medium tracking-tight text-theme md:text-7xl`}
        >
          {mark}
        </span>
      </div>
      {index && (
        <span
          className={`${plexMono.className} absolute bottom-3 left-4 text-[11px] uppercase tracking-[0.18em] text-theme/80`}
        >
          {index}
        </span>
      )}
    </div>
  );
}
