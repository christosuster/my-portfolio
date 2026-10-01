"use client";
import Navbar from "@/components/Navbar";
import "./globals.css";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { MotionConfig, motion } from "framer-motion";
import { spaceGrotesk } from "@/utils/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="en" className="scroll-smooth transition-all bg-black">
      <head>
        <title>Christos Uster Biswas</title>
      </head>
      <body className={`w-full relative`}>
        <MotionConfig reducedMotion="user">
        {loading ? (
          <Loading />
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className={`relative flex w-full ${spaceGrotesk.className}`}
          >
            <Navbar />
            {children}
          </motion.main>
        )}
        </MotionConfig>
      </body>
    </html>
  );
}
