export const work = {
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Work Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "subtitle",
      title: "Work Subtitle",
      type: "string",
    },
    {
      name: "description",
      title: "Work Description",
      type: "string",
    },
    {
      name: "year",
      title: "Year",
      type: "string",
    },
    {
      name: "role",
      title: "Role",
      type: "string",
    },
    {
      name: "industry",
      title: "Industry",
      type: "string",
    },
    {
      name: "workTech",
      title: "Tech Used",
      type: "string",
    },
    {
      name: "context",
      title: "Context",
      type: "text",
    },
    {
      name: "problem",
      title: "Problem",
      type: "text",
    },
    {
      name: "approach",
      title: "Approach",
      type: "text",
    },
    {
      name: "outcome",
      title: "Outcome",
      type: "text",
    },
    {
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "client",
      title: "Client URL",
      type: "string",
    },
    {
      name: "live",
      title: "Live URL",
      type: "string",
    },
    {
      name: "server",
      title: "Server URL",
      type: "string",
    },
    {
      name: "cover",
      title: "Cover",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "metrics",
      title: "Metrics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    },
    {
      name: "highlight",
      title: "Highlight",
      type: "text",
    },
    {
      name: "order",
      title: "Order",
      type: "number",
    },
  ],
};
