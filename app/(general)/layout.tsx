"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import {
  Montserrat,
  Poiret_One,
  Comfortaa,
  Zen_Loop,
  Alumni_Sans_Pinstripe,
} from "next/font/google";
import { createContext, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import { getTemplate } from "@/sanity/sanity-utils";
import { TemplateType } from "@/types/TemplateType";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
});

export const zen = Zen_Loop({
  subsets: ["latin"],
  weight: ["400"],
});

export const alumni = Alumni_Sans_Pinstripe({
  subsets: ["latin"],
  weight: ["400"],
});

export const poiret = Poiret_One({
  subsets: ["latin-ext"],
  weight: "400",
});

export const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const dataContext = createContext<TemplateType | null>(null);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TemplateType | null>(null);

  useEffect(() => {
    getTemplate()
      .then((e) => setData(e[0]))
      .then(() => {
        setTimeout(() => {
          setLoading(false);
        }, 5000);
      });
  }, []);
  return (
    <html lang="en" className="scroll-smooth transition-all bg-black">
      <head>
        <title>Christos Uster Biswas | Developer</title>
      </head>
      <body className={`w-full relative`}>
        {loading ? (
          <Loading />
        ) : (
          <motion.main
            initial={{ opacity: 0, y: "200" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 1 }}
            className="flex w-full relative"
          >
            <Navbar />
            <dataContext.Provider value={data}>{children}</dataContext.Provider>
          </motion.main>
        )}
      </body>
    </html>
  );
}
