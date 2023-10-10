import { poiret } from "@/utils/fonts";
import { TemplateType } from "@/types/TemplateType";
import {
  useInView,
  useScroll,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import React, { FormEvent, ReactHTMLElement, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const Contact = ({ data }: { data: TemplateType | null }) => {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [sending, setSending] = useState(false);

  const ref = useRef(null);
  const contactForm = useRef<any>(null);
  const errorRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);

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
        buttonRef.current.innerHTML = "Email Sent!";
        setTimeout(() => {
          buttonRef.current.innerHTML = "Submit";
          buttonRef.current;
        }, 4000);
      }
      setSending(false);
    }
    router.push("#contact");
  };

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
        className={` w-full  h-[170px] flex flex-col justify-end md:items-start items-center ${poiret.className} `}
      >
        <motion.h1
          className="leading-[13px] md:origin-bottom-left origin-bottom md:text-sm text-[10px]"
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
        <h1
          ref={errorRef}
          className="invisible text-red-500 text-center animate-bounce"
        >
          PLEASE FILL IN ALL THE FIELDS
        </h1>
        <form
          ref={contactForm}
          style={{
            opacity: formInView ? 1 : 0,
            transform: formInView ? "none" : "translateY(200px)",
            transition: "linear 0.5s",
          }}
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
            className="placeholder-gray-500 bg-transparent my-4 border-b-2 border-theme overflow-y-auto md:w-[500px] w-full focus-visible:border-white p-2 outline-none transition-colors"
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
            className="placeholder-gray-500 bg-transparent my-4 border-b-2 border-theme overflow-y-auto md:w-[500px] w-full focus-visible:border-white p-2 outline-none transition-colors h-48"
          />
          <button
            disabled={sending ? true : false}
            ref={buttonRef}
            onClick={handleSubmit}
            className=" font-bold text-theme hover:text-black hover:bg-theme rounded-xl py-2 px-4 border-2 border-theme transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
