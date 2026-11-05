import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#08080a]/85 backdrop-blur-md border-b border-[#1f1f28] py-3.5 shadow-xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg overflow-hidden border border-zinc-700/80 group-hover:border-cyan-500/50 transition-colors shadow-inner shrink-0">
            <img
              src={PERSONAL_INFO.profileImage}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-semibold text-zinc-100 text-sm tracking-tight group-hover:text-cyan-400 transition-colors">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-[11px] font-mono text-zinc-400 tracking-wider">
              Media Buyer • Digital Adler
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full px-4 py-1.5 bg-[#121217]/90 border border-[#23232f]/80 shadow-inner">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.label}
                href={link.href}
                className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all rounded-full ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA Button & WhatsApp */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={PERSONAL_INFO.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-zinc-300 hover:text-emerald-400 bg-[#14141c] hover:bg-[#1a1a24] border border-[#262633] rounded-lg transition-colors"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 rounded-lg transition-all shadow-md shadow-cyan-950/20 active:scale-[0.98]"
          >
            <span>Let's Work Together</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#14141c] border border-[#262633] text-zinc-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0c10] border-b border-[#22222d] px-6 py-6 space-y-4 shadow-2xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-zinc-300 hover:text-cyan-400 hover:bg-[#161620] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
            <a
              href={PERSONAL_INFO.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono text-emerald-300 bg-emerald-950/30 border border-emerald-800/50"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Chat on WhatsApp (+880 1608-175252)</span>
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 shadow"
            >
              <span>Let's Work Together</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
