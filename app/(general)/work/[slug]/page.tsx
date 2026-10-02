import CaseStudy from "@/components/CaseStudy";
import { getWork } from "@/sanity/sanity-utils";
import { spaceGrotesk } from "@/utils/fonts";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function WorkCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const works = await getWork();
  const index = works.findIndex((work) => work.slug === params.slug);
  if (index === -1) notFound();

  const nextWork = works.length > 1 ? works[(index + 1) % works.length] : null;

  return (
    <div className={`min-w-0 flex-1 bg-black ${spaceGrotesk.className}`}>
      <CaseStudy
        work={works[index]}
        next={nextWork ? { slug: nextWork.slug, title: nextWork.title } : null}
      />
    </div>
  );
}
