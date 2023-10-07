import { poiret } from "@/app/(general)/layout";
import { TemplateType } from "@/types/TemplateType";
import {
  useInView,
  useScroll,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import React, { FormEvent, useRef, useState } from "react";

const Contact = ({ data }: { data: TemplateType | null }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>();
  const [subject, setSubject] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const result = await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  };

  const ref = useRef(null);
  const contactForm = useRef(null);
  const formInView = useInView(contactForm, { once: true });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "0.1 start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [3, 10]);
  const ySpringy = useSpring(y, {
    stiffness: 95,
    damping: 30,
    restDelta: 0.001,
  });
  const x = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const xSpringy = useSpring(x, {
    stiffness: 95,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <div
      id="contact"
      className="min-h-screen px-6 md:px-20 text-white w-full overflow-hidden"
    >
      <div
        ref={ref}
        className={` w-full  h-[170px] flex flex-col justify-end items-start ${poiret.className} `}
      >
        <motion.h1
          className="leading-[13px] origin-bottom-left text-sm md:text-"
          style={{ scale: ySpringy }}
        >
          Contact
        </motion.h1>
      </div>
      <motion.hr
        style={{ scaleX: xSpringy }}
        className="bg-theme h-[2px] border-transparent w-full origin-right"
      />
      <div className="my-24">
        <form
          ref={contactForm}
          style={{
            opacity: formInView ? 1 : 0,
            transform: formInView ? "none" : "translateY(200px)",
            transition: "linear 0.5s",
          }}
          className="flex flex-col justify-center items-center"
        >
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="placeholder-gray-500 bg-transparent my-4 border-b-2 border-theme overflow-y-auto md:w-[500px] w-full focus-visible:border-white p-2 outline-none transition-colors"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="placeholder-gray-500 bg-transparent my-4 border-b-2 border-theme overflow-y-auto md:w-[500px] w-full focus-visible:border-white p-2 outline-none transition-colors"
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
            className="placeholder-gray-500 bg-transparent my-4 border-b-2 border-theme overflow-y-auto md:w-[500px] w-full focus-visible:border-white p-2 outline-none transition-colors"
          />
          <input
            type="text"
            name="message"
            id="message"
            placeholder="Message"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            className="placeholder-gray-500 bg-transparent my-4 border-b-2 border-theme overflow-y-auto md:w-[500px] w-full focus-visible:border-white p-2 outline-none transition-colors h-48 "
          />
          <button
            onClick={handleSubmit}
            className="transition-colors font-bold text-theme hover:text-black hover:bg-theme rounded-xl py-2 px-4 border-2 border-theme "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
