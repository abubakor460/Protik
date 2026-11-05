import React from 'react';
import { WHY_CHOOSE_ME } from '../data/portfolioData';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const WhyChooseMe: React.FC = () => {
  return (
    <section id="why-me" className="py-24 bg-[#0a0a0e] border-t border-[#171720] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#14141c] border border-[#232330] text-xs font-mono text-cyan-400 uppercase tracking-widest">
            05 • Differentiators
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Why Choose Me?
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A partnership built on transparent accountability, analytical rigor, and sustainable profit contribution.
          </p>
        </div>

        {/* 6-Card Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ME.map((item, idx) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-[#111117] border border-[#1f1f2c] hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-zinc-500 font-bold">
                    0{idx + 1}
                  </span>
                  <div className="px-2.5 py-1 rounded-md bg-[#161622] border border-[#262638] text-[11px] font-mono text-cyan-400">
                    {item.stat}
                  </div>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#1a1a24] flex items-center justify-between text-xs font-mono text-zinc-500">
                <span>{item.statLabel}</span>
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#12121c] via-[#101018] to-[#141420] border border-[#232332] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Ready to eliminate ad spend waste and scale predictably?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400">
              Get an objective, no-obligation audit of your existing Meta, TikTok, or Google ad accounts.
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-3 rounded-xl font-heading font-semibold text-xs sm:text-sm text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shrink-0 shadow-lg shadow-cyan-950/20"
          >
            Request Account Audit
          </a>
        </div>

      </div>
    </section>
  );
};
