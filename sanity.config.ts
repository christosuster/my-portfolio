import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { template } from "./sanity/schema/template-schema";
import { work } from "./sanity/schema/work-schema";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || "";
const basePath = process.env.NEXT_PUBLIC_BASEPATH || "/admin";
const schema = { types: [template, work] };

const config = defineConfig([
  {
    name: "production",
    title: "Production",
    basePath: `${basePath}/production`,
    projectId,
    dataset: "production",
    apiVersion: "2023-10-06",
    plugins: [deskTool()],
    schema,
  },
  {
    name: "local",
    title: "Local",
    basePath: `${basePath}/local`,
    projectId,
    dataset: "local",
    apiVersion: "2023-10-06",
    plugins: [deskTool()],
    schema,
  },
]);

export default config;
