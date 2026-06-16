"use client";

import { useRef } from "react";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import BriefForm from "./components/BriefForm";
import Footer from "./components/Footer";

export default function Home() {
  const briefRef = useRef<HTMLDivElement>(null);

  function scrollToBrief() {
    briefRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <HeroSection onTryClick={scrollToBrief} />
      <FeaturesSection />
      <div ref={briefRef}>
        <BriefForm />
      </div>
      <Footer current="BriefOS" />
    </>
  );
}
