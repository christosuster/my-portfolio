"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { motion } from "framer-motion";
import { getTemplate } from "@/sanity/sanity-utils";
import { TemplateType } from "@/types/TemplateType";
import { dataContext } from "@/utils/context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<TemplateType | null>(null);

  useEffect(() => {
    console.log("entered");

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
        <title>Christos Uster Biswas</title>
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
