import React from 'react';
import { ArrowUpRight, ArrowDown, ShieldCheck, Sparkles, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Hero3DScene } from './Hero3DScene';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-auto">
        <Hero3DScene />
      </div>

      {/* Subtle Atmospheric Gradient Overlay (non-blocking for 3D interactions) */}
      <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-[#08080a]/30 via-transparent to-[#08080a]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Value Narrative */}
          <div className="lg:col-span-7 space-y-7">
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#121218]/90 border border-[#252533] text-xs font-mono text-zinc-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-zinc-200">Available for Select Client Engagements</span>
              <span className="text-zinc-500">•</span>
              <span className="text-cyan-400">Dhaka & Remote</span>
            </div>

            {/* Main Editorial Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.08]">
              Turning Ad Spend Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
                Measurable Business Growth.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-zinc-300/90 leading-relaxed max-w-2xl font-normal">
              I'm <strong className="text-white font-medium">Pratik Podder</strong>, a Freelance Digital Marketer and Media Buyer specializing in{' '}
              <span className="text-cyan-300 font-medium">Meta</span>,{' '}
              <span className="text-pink-400 font-medium">TikTok</span>, and{' '}
              <span className="text-sky-400 font-medium">Google Ads</span>. I help businesses scale through strategic advertising, data-driven decisions, and conversion-focused marketing.
            </p>

            {/* Platform Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {[
                { name: 'Meta Ads', desc: 'FB & IG Funnels', color: 'border-blue-500/30 text-blue-300 bg-blue-950/20' },
                { name: 'TikTok Ads', desc: 'Viral Hook Scaling', color: 'border-rose-500/30 text-rose-300 bg-rose-950/20' },
                { name: 'Google Ads', desc: 'High-Intent Search & PMax', color: 'border-sky-500/30 text-sky-300 bg-sky-950/20' },
                { name: 'CAPI & GTM', desc: 'Server-Side Resilience', color: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/20' },
              ].map((pill) => (
                <div
                  key={pill.name}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono ${pill.color}`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="font-semibold">{pill.name}</span>
                  <span className="text-[10px] text-zinc-400 hidden sm:inline">({pill.desc})</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-lg shadow-cyan-950/30 active:scale-[0.98]"
              >
                <span>Let's Work Together</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-heading font-medium text-sm text-zinc-200 hover:text-white bg-[#14141c] hover:bg-[#1b1b24] border border-[#262635] transition-all"
              >
                <span>Explore My Work</span>
                <ArrowDown className="w-4 h-4 text-cyan-400" />
              </a>
            </div>

            {/* Three Impressive Statistics (Requirement 4 & 8) */}
            <div className="pt-6 border-t border-[#1e1e28] grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                  {PERSONAL_INFO.yearsExperience}+
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-cyan-400 tracking-tight">
                  {PERSONAL_INFO.campaignsCount}+
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  Campaigns Managed
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight">
                  ${(PERSONAL_INFO.adSpendManaged / 1000).toFixed(0)}K+
                </div>
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                  Ad Spend Managed
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Editorial Profile Visual Card Placeholder */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Outer decorative glowing border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-sky-500/10 to-transparent blur-md opacity-75" />

              <div className="relative rounded-2xl bg-[#0e0e14] border border-[#232332] p-6 shadow-2xl space-y-5">
                
                {/* Header inside card */}
                <div className="flex items-center justify-between pb-4 border-b border-[#1c1c27]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-cyan-500/30 shrink-0">
                      <img
                        src={PERSONAL_INFO.profileImage}
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold text-white">Pratik Podder</h2>
                      <p className="text-[11px] font-mono text-zinc-400">Digital Adler • Performance Lead</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                    Active
                  </span>
                </div>

                {/* Profile Visual Frame */}
                <div className="relative aspect-[3/3.8] rounded-xl bg-[#09090e] border border-[#272738] overflow-hidden group shadow-2xl">
                  {/* Portrait Photograph */}
                  <img
                    src={PERSONAL_INFO.profileImage}
                    alt="Pratik Podder - Freelance Digital Marketer & Media Buyer"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Atmospheric gradient overlay at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090e] via-[#09090e]/40 to-transparent" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-[11px] font-mono text-emerald-300 font-medium">
                        Accepting Q1/Q2 Growth Projects
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-white text-lg">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs text-zinc-300 font-mono">
                      Meta, TikTok & Google Ads Specialist
                    </p>

                    <div className="pt-1 flex items-center gap-2">
                      <div className="px-2.5 py-1 rounded-md bg-[#161622]/90 border border-[#2a2a3e] text-[10px] font-mono text-cyan-300 flex items-center gap-1.5 backdrop-blur-sm">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Verified Media Buyer</span>
                      </div>
                      <div className="px-2.5 py-1 rounded-md bg-[#161622]/90 border border-[#2a2a3e] text-[10px] font-mono text-zinc-300 backdrop-blur-sm">
                        <span>Digital Adler</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact & Verified Channels */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-[#14141c] hover:bg-[#1a1a26] border border-[#232330] text-zinc-300 hover:text-white transition-colors"
                  >
                    <span>Email Inquiries</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-400" />
                  </a>

                  <a
                    href={PERSONAL_INFO.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 transition-colors"
                  >
                    <span>Direct WhatsApp</span>
                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
