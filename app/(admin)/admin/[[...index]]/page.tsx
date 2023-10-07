"use client";
import config from "@/sanity.config";
import { NextStudio } from "next-sanity/studio";
import React from "react";

function AdminPage() {
  return <NextStudio config={config}></NextStudio>;
}

export default AdminPage;
