export const template = {
  name: "template",
  title: "Template",
  type: "document",
  fields: [
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
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "focus",
      title: "Focus",
      type: "string",
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "availability",
      title: "Availability",
      type: "string",
    },
    {
      name: "experience",
      title: "Experience",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "role", title: "Role", type: "string" },
            { name: "company", title: "Company", type: "string" },
            { name: "period", title: "Period", type: "string" },
          ],
        },
      ],
    },
    {
      name: "currently",
      title: "Currently",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "footer",
      title: "Footer",
      type: "string",
    },
  ],
};
