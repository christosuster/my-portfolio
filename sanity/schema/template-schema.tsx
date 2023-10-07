export const template = {
  name: "template",
  title: "Template",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Site Title",
      type: "string",
    },
    {
      name: "subtitle",
      title: "Site Subtitle",
      type: "string",
    },
    {
      name: "subtitleSkills",
      title: "Site Skills",
      type: "string",
    },
    {
      name: "intro",
      title: "Introduction",
      type: "string",
    },
    {
      name: "aboutTitle",
      title: "About Me Title",
      type: "string",
    },
    {
      name: "aboutContent",
      title: "About Me Content",
      type: "string",
    },
    {
      name: "aboutContentSpan",
      title: "About Me Content Span",
      type: "string",
    },
    {
      name: "coreTech",
      title: "Core Tech",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "tools",
      title: "Tools",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "footer",
      title: "Footer",
      type: "string",
    },
  ],
};
