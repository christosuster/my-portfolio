import { createClient, groq } from "next-sanity";
import { ExperienceItem, TemplateType } from "@/types/TemplateType";
import { SanityImage, WorkGalleryItem, WorkMetric, WorkType } from "@/types/WorkType";

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

function sanityClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset,
    apiVersion: "2023-10-06",
    useCdn: false,
  });
}

type ImageDoc = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
} | null;

type TemplateDoc = {
  _id: string;
  subtitle?: string | null;
  subtitleSkills?: string | null;
  aboutTitle?: string | null;
  aboutContent?: string | null;
  aboutContentSpan?: string | null;
  role?: string | null;
  focus?: string | null;
  location?: string | null;
  availability?: string | null;
  experience?: {
    role?: string | null;
    company?: string | null;
    period?: string | null;
  }[] | null;
  currently?: string[] | null;
  footer?: string | null;
};

type WorkDoc = {
  _id: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  workTech?: string | null;
  client?: string | null;
  server?: string | null;
  live?: string | null;
  slug?: string | null;
  year?: string | null;
  role?: string | null;
  industry?: string | null;
  context?: string | null;
  problem?: string | null;
  approach?: string | null;
  outcome?: string | null;
  responsibilities?: string[] | null;
  cover?: ImageDoc;
  gallery?: { caption?: string | null; image?: ImageDoc }[] | null;
  metrics?: { value?: string | null; label?: string | null }[] | null;
  highlight?: string | null;
  order?: number | null;
};

function present(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function strings(values?: string[] | null) {
  return (values ?? []).flatMap((item) => {
    const trimmed = item?.trim();
    return trimmed ? [trimmed] : [];
  });
}

function mapImage(image?: ImageDoc): SanityImage | undefined {
  const url = image?.url?.trim();
  if (!url) return undefined;
  return {
    url,
    width: image?.width ?? undefined,
    height: image?.height ?? undefined,
  };
}

const imageProjection = groq`{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

export async function getTemplate(): Promise<TemplateType | null> {
  const docs = await sanityClient().fetch<TemplateDoc[]>(groq`*[_type=="template"]{
    _id,
    subtitle,
    subtitleSkills,
    aboutTitle,
    aboutContent,
    aboutContentSpan,
    role,
    focus,
    location,
    availability,
    experience[]{role, company, period},
    currently,
    footer
  }`, {}, { cache: "no-store" });

  const doc = docs[0];
  if (!doc) return null;

  const experience: ExperienceItem[] = (doc.experience ?? []).flatMap((item) => {
    const role = present(item.role);
    const company = present(item.company);
    const period = present(item.period);
    if (!role && !company && !period) return [];
    return [{ role: role ?? "", company: company ?? "", period: period ?? "" }];
  });

  return {
    _id: doc._id,
    subtitle: doc.subtitle?.trim() || "",
    aboutTitle: doc.aboutTitle?.trim() || "",
    subtitleSkills: doc.subtitleSkills?.trim() || "",
    aboutContent: doc.aboutContent?.trim() || "",
    aboutContentSpan: doc.aboutContentSpan?.trim() || "",
    role: present(doc.role),
    focus: present(doc.focus),
    location: present(doc.location),
    availability: present(doc.availability),
    experience,
    currently: strings(doc.currently),
    footer: doc.footer?.trim() || "",
  };
}

export function slugifyTitle(title: string) {
  return title
    .toLowerCase()
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapWork(doc: WorkDoc): WorkType {
  const title = doc.title?.trim() || "";
  const cover = mapImage(doc.cover);

  const gallery: WorkGalleryItem[] = (doc.gallery ?? []).flatMap((item) => {
    const image = mapImage(item.image);
    if (!image) return [];
    return [{ image, caption: present(item.caption) }];
  });

  const metrics: WorkMetric[] = (doc.metrics ?? []).flatMap((item) => {
    const value = present(item.value);
    const label = present(item.label);
    if (!value || !label) return [];
    return [{ value, label }];
  });

  return {
    _id: doc._id,
    title,
    subtitle: doc.subtitle?.trim() || "",
    description: doc.description?.trim() || "",
    workTech: doc.workTech?.trim() || "",
    client: doc.client?.trim() || "",
    server: doc.server?.trim() || "",
    live: doc.live?.trim() || "",
    slug: doc.slug?.trim() || slugifyTitle(title),
    year: present(doc.year),
    role: present(doc.role),
    industry: present(doc.industry),
    context: present(doc.context),
    problem: present(doc.problem),
    approach: present(doc.approach),
    outcome: present(doc.outcome),
    responsibilities: strings(doc.responsibilities),
    cover,
    gallery,
    metrics,
    highlight: present(doc.highlight),
    order: typeof doc.order === "number" ? doc.order : undefined,
  };
}

function compareWork(a: WorkType, b: WorkType) {
  const aOrder = a.order ?? Number.POSITIVE_INFINITY;
  const bOrder = b.order ?? Number.POSITIVE_INFINITY;
  if (aOrder !== bOrder) return aOrder - bOrder;

  const aYear = Number(a.year);
  const bYear = Number(b.year);
  if (Number.isFinite(aYear) && Number.isFinite(bYear) && aYear !== bYear) return bYear - aYear;
  return a.title.localeCompare(b.title);
}

export async function getWork(): Promise<WorkType[]> {
  const docs = await sanityClient().fetch<WorkDoc[]>(groq`*[_type=="work"]{
      _id,
      title,
      subtitle,
      description,
      workTech,
      client,
      server,
      live,
      "slug": slug.current,
      year,
      role,
      industry,
      context,
      problem,
      approach,
      outcome,
      responsibilities,
      cover${imageProjection},
      gallery[]{
        caption,
        image${imageProjection}
      },
      metrics[]{value, label},
      highlight,
      order
    }`, {}, { cache: "no-store" });

  return docs.map(mapWork).sort(compareWork);
}

export async function getWorkBySlug(slug: string) {
  const works = await getWork();
  return works.find((work) => work.slug === slug) ?? null;
}
