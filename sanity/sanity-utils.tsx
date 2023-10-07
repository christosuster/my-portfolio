import { createClient, groq } from "next-sanity";

export async function getTemplate() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-10-06",
  });

  return client.fetch(groq`*[_type=="template"]{
    _id,
    title,
    subtitle,
    subtitleSkills,
    aboutTitle,
    intro,
    aboutContent,
    aboutContentSpan,
    coreTech,
    tools,
    email,
    footer

  }`);
}

export async function getWork() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    dataset: "production",
    apiVersion: "2023-10-06",
  });

  return client.fetch(groq`*[_type=="work"]{
      _id,
      title,
      subtitle,
      description,
      workTech,
      client,
      server,
      live
    }`);
}
