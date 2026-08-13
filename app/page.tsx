'use client';

import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import BriefForm from './components/BriefForm';
import Footer from './components/Footer';

export default function Home() {
  function scrollToBrief() {
    document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-background">
      <HeroSection onTryClick={scrollToBrief} />
      <FeaturesSection />
      <BriefForm />
      <Footer current="BriefOS" />
    </main>
  );
}
