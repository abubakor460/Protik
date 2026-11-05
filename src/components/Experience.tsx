import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, WORKFLOW_STEPS } from '../data/portfolioData';
import { Growth3DVisualization } from './Growth3DVisualization';
import { TrendingUp, Layers, CheckCircle, BarChart3, ShieldCheck } from 'lucide-react';

export const Experience: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    years: 0,
    campaigns: 0,
    spend: 0,
  });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1800;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              years: Math.floor(ease * PERSONAL_INFO.yearsExperience),
              campaigns: Math.floor(ease * PERSONAL_INFO.campaignsCount),
              spend: Math.floor(ease * PERSONAL_INFO.adSpendManaged),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                years: PERSONAL_INFO.yearsExperience,
                campaigns: PERSONAL_INFO.campaignsCount,
                spend: PERSONAL_INFO.adSpendManaged,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-[#0a0a0e] border-t border-[#171720] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#14141c] border border-[#232330] text-xs font-mono text-cyan-400 uppercase tracking-widest">
            03 • Track Record & Delivery
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Experience That Drives Results
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Proven track record managing paid traffic engines across Meta, TikTok, and Google Ads with disciplined data and analytics.
          </p>
        </div>

        {/* 3D Visual + Stat Counter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-20">
          
          {/* Left: 3D Marketing Growth Canvas */}
          <div className="lg:col-span-7">
            <Growth3DVisualization />
            <p className="text-[11px] font-mono text-zinc-500 mt-2 text-center sm:text-left">
              * Abstract 3D interactive performance model showcasing multi-stage ROAS compounding and attribution scaling.
            </p>
          </div>

          {/* Right: Key Verified Metrics & Milestones */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              
              {/* Stat 1: Years */}
              <div className="p-6 rounded-2xl bg-[#111118] border border-[#222230] relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                    {counts.years}+
                  </div>
                  <div className="p-3 rounded-xl bg-[#181824] text-cyan-400">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-zinc-200 mt-2">
                  Years of Media Buying Experience
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Active since 2019, navigating iOS 14.5 attribution shifts, TikTok ads emergence, and AI-driven campaign automation.
                </p>
              </div>

              {/* Stat 2: Campaigns */}
              <div className="p-6 rounded-2xl bg-[#111118] border border-[#222230] relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-4xl sm:text-5xl font-heading font-extrabold text-cyan-400 tracking-tight">
                    {counts.campaigns}+
                  </div>
                  <div className="p-3 rounded-xl bg-[#181824] text-cyan-400">
                    <Layers className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-zinc-200 mt-2">
                  Campaigns Architected & Managed
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Spanning DTC apparel, skincare, electronics, SaaS lead generation, and local high-ticket service acquisition.
                </p>
              </div>

              {/* Stat 3: Budget Managed */}
              <div className="p-6 rounded-2xl bg-[#111118] border border-[#222230] relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                    ${(counts.spend).toLocaleString()}+
                  </div>
                  <div className="p-3 rounded-xl bg-[#181824] text-cyan-400">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                </div>
                <div className="text-sm font-semibold text-zinc-200 mt-2">
                  Advertising Budget Managed
                </div>
                <p className="text-xs text-zinc-400 mt-1">
                  Deployed with strict focus on contribution margin, profit-first scaling, and verifiable conversion return.
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* 5-Step Execution Methodology */}
        <div className="mt-16 pt-12 border-t border-[#1a1a24]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
                Execution Framework
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                The repeatable 5-phase operating procedure applied to every client engagement
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Standardized Quality Protocol</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {WORKFLOW_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 rounded-xl bg-[#121218] border border-[#22222f] hover:border-cyan-500/30 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-cyan-400 font-bold mb-2">
                    PHASE {step.step}
                  </div>
                  <h4 className="font-heading font-semibold text-white text-sm group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  <span>Verified step</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
