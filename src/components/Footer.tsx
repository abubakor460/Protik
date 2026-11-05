import React from 'react';
import { ArrowUp, Mail, Phone, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Experience', href: '#experience' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Why Me', href: '#why-me' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050507] border-t border-[#171720] text-zinc-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-[#14141c]">
          
          <div className="space-y-2 max-w-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-heading font-bold text-white text-sm">
                P
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>
            <p className="text-xs font-mono text-zinc-400 leading-relaxed">
              Freelance Digital Marketer & Media Buyer — Meta, TikTok & Google Ads Specialist • {PERSONAL_INFO.company}
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-zinc-400">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-cyan-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#121218] border border-[#232332] text-xs font-mono text-zinc-300 hover:text-white hover:border-cyan-500/50 transition-all shrink-0"
            title="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Bottom Tier */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href={PERSONAL_INFO.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={PERSONAL_INFO.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Facebook
            </a>
            <a
              href={PERSONAL_INFO.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              Instagram
            </a>
            <a
              href={PERSONAL_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
