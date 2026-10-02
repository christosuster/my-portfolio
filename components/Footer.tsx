import { plexMono } from "@/utils/fonts";
import { TemplateType } from "@/types/TemplateType";
import React from "react";
import { FiGithub, FiLinkedin } from "react-icons/fi";


const Footer = ({ data }: { data: TemplateType | null }) => {
  return (
    <footer
      className={`${plexMono.className} flex w-full flex-col items-center justify-center border-t border-white/15 py-8 text-center text-xs uppercase tracking-[0.14em] text-white/70`}
    >
      <div className="mb-3 flex gap-4">
        <a href="https://github.com/christosuster" target="_blank" rel="noreferrer" aria-label="GitHub">
          <FiGithub className="text-xl transition-colors hover:text-theme" />
        </a>
        <a
          href="https://www.linkedin.com/in/christos-uster-biswas/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FiLinkedin className="text-xl transition-colors hover:text-theme" />
        </a>
      </div>
      <p className="my-1 normal-case tracking-normal">{data?.footer}</p>
    </footer>
  );
};

export default Footer;
