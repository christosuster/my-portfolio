import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Home from "@/components/Home";
import Work from "@/components/Work";
import { getTemplate, getWork } from "@/sanity/sanity-utils";
import { spaceGrotesk } from "@/utils/fonts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [data, work] = await Promise.all([getTemplate(), getWork()]);

  return (
    <main
      className={`flex min-h-screen w-full flex-col items-center justify-between bg-black md:w-[96%] ${spaceGrotesk.className}`}
    >
      <Home data={data} />
      <About data={data} />
      <Work work={work} />
      <Contact data={data} />
      <Footer data={data} />
    </main>
  );
}
