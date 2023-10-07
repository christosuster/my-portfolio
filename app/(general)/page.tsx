"use client";
import About from "@/components/About";
import Home from "@/components/Home";
import Work from "@/components/Work";
import { comfortaa } from "@/utils/fonts";
import { dataContext } from "@/utils/context";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useContext } from "react";

export default function HomePage() {
  const data = useContext(dataContext);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between w-full md:w-[96%] ${comfortaa.className}  bg-black`}
    >
      <Home data={data} />
      <About data={data} />
      <Work />
      <Contact data={data} />
      <Footer data={data} />
    </main>
  );
}
