import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import { template } from './sanity/schema/template-schema';
import { work } from './sanity/schema/work-schema';

const config= defineConfig({
  title: 'Portfolio Admin',
  basePath: process.env.NEXT_PUBLIC_BASEPATH,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  dataset: 'production',
  apiVersion: "2023-10-06",
  plugins: [deskTool()],
  schema:{types:[template,work]}
})

export default config;
