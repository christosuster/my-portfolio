"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { TemplateType } from "@/types/TemplateType";
import { motion } from "framer-motion";
import React, { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Contact = ({ data }: { data: TemplateType | null }) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState(false);

  const errorRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name == "" || email == "" || subject == "" || message == "") {
      errorRef.current?.classList.remove("invisible");
    } else {
      setSending(true);
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_FORM_KEY,
          name: name,
          email: email,
          subject: subject,
          message: message,
        }),
      });
      const result = await response.json();

      console.log(result);

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");

      if (result.success) {
        errorRef.current?.classList.add("invisible");
        if (buttonRef.current) buttonRef.current.innerHTML = "Email Sent!";
        setTimeout(() => {
          if (buttonRef.current) buttonRef.current.innerHTML = "Submit";
        }, 4000);
      }
      setSending(false);
    }
    router.push("#contact");
  };

  return (
    <div
      id="contact"
      className="min-h-screen w-full overflow-hidden px-6 text-white md:px-12 lg:px-20"
    >
      <SectionHeader label="Contact" />
      <div className="my-24">
        <h1
          ref={errorRef}
          className="invisible text-red-500 text-center"
        >
          Please fill in all the fields
        </h1>
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col justify-center items-center *>"
        >
          <input
            type="hidden"
            name="from_name"
            value="New Portfolio Email"
          ></input>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Your Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="placeholder-white/40 bg-transparent my-4 border-b-2 border-white overflow-y-auto md:w-[500px] w-full focus-visible:border-theme p-2 outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="placeholder-white/40 bg-transparent my-4 border-b-2 border-white overflow-y-auto md:w-[500px] w-full focus-visible:border-theme p-2 outline-none transition-colors"
          />
          <input
            type="text"
            name="subject"
            id="subject"
            placeholder="Subject"
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            className="placeholder-white/40 bg-transparent my-4 border-b-2 border-white overflow-y-auto md:w-[500px] w-full focus-visible:border-theme p-2 outline-none transition-colors"
          />
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="placeholder-white/40 bg-transparent my-4 border-b-2 border-white overflow-y-auto md:w-[500px] w-full focus-visible:border-theme p-2 outline-none transition-colors h-48 resize-none"
          />
          <button
            disabled={sending ? true : false}
            ref={buttonRef}
            onClick={handleSubmit}
            className=" font-bold text-theme hover:text-black hover:bg-theme rounded-xl py-2 px-4 border-2 border-theme transition-all"
          >
            Submit
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
