export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
};

export type TemplateType = {
  _id: string;
  subtitle: string;
  aboutTitle: string;
  subtitleSkills: string;
  aboutContent: string;
  aboutContentSpan: string;
  role?: string;
  focus?: string;
  location?: string;
  availability?: string;
  experience: ExperienceItem[];
  currently: string[];
  footer: string;
};
