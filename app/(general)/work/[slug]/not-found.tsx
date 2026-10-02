import ArrowLink from "@/components/ui/ArrowLink";
import { spaceGrotesk } from "@/utils/fonts";

export default function WorkNotFound() {
  return (
    <div className="min-w-0 flex-1 px-6 py-24 text-white md:px-12 lg:px-20">
      <h1 className={`${spaceGrotesk.className} text-5xl font-medium leading-none tracking-tight`}>
        Project not found
      </h1>
      <div className="mt-8">
        <ArrowLink href="/#work" direction="left">
          Work
        </ArrowLink>
      </div>
    </div>
  );
}
