import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const CustomCursor = lazy(() => import("@/components/CustomCursor"));
const Header = lazy(() => import("@/components/Header"));
const Hero = lazy(() => import("@/sections/Hero"));
const Catalog = lazy(() => import("@/sections/Catalog"));
const Story = lazy(() => import("@/sections/Story"));
const Footer = lazy(() => import("@/sections/Footer"));

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <div style={{ minHeight: "100vh", background: "#050509" }} />;
  }
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#050509" }} />}>
      <CustomCursor />
      <Header />
      <main style={{ background: "#050509" }}>
        <Hero />
        <Catalog />
        <Story />
        <Footer />
      </main>
    </Suspense>
  );
}
