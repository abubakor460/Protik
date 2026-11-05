/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Experience } from './components/Experience';
import { Portfolio } from './components/Portfolio';
import { WhyChooseMe } from './components/WhyChooseMe';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'experience', 'portfolio', 'why-me', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/25 selection:text-white">
      {/* Sticky Header */}
      <Navbar activeSection={activeSection} />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Experience />
        <Portfolio />
        <WhyChooseMe />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
