import { TemplateType } from "@/types/TemplateType";
import React from "react";
import { AiFillInstagram, AiOutlineGithub } from "react-icons/ai";
import { ImGithub, ImInstagram, ImLinkedin, ImLinkedin2 } from "react-icons/im";

const Footer = ({ data }: { data: TemplateType | null }) => {
  return (
    <footer className="w-full flex flex-col justify-center items-center text-white text-center py-6 border-t-2">
      <div className="flex gap-3 mb-2">
        <a href="https://github.com/christosuster" target="_blank">
          <AiOutlineGithub className="transition-all text-4xl hover:text-yellow-500" />
        </a>
        <a
          href="https://www.linkedin.com/in/christos-uster-biswas/"
          target="_blank"
        >
          <ImLinkedin2 className="transition-all text-4xl hover:text-yellow-500" />
        </a>
        <a href="https://www.instagram.com/his_dankness_chris/" target="_blank">
          <AiFillInstagram className="transition-all text-4xl hover:text-yellow-500" />
        </a>
      </div>
      <h1 className="text-sm my-1">{data?.footer}</h1>
      <h1 className="text-sm">
        Inspired by{" "}
        <a
          className="underline"
          target="_blank"
          href="https://www.mathys-cognefoucault.fr/"
        >
          Mathys&apos; Website
        </a>
      </h1>
    </footer>
  );
};

export default Footer;
