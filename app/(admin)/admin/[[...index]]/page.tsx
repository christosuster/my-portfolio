"use client";
import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const basePath = process.env.NEXT_PUBLIC_BASEPATH || "/admin";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const studioPath = `${basePath}/${dataset === "local" ? "local" : "production"}`;

function AdminPage() {
  const pathname = usePathname();
  const router = useRouter();
  const atRoot = pathname === basePath || pathname === `${basePath}/`;

  useEffect(() => {
    if (atRoot) router.replace(studioPath);
  }, [atRoot, router]);

  if (atRoot) return null;

  return <NextStudio config={config}></NextStudio>;
}

export default AdminPage;
