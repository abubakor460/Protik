import React, { useState } from 'react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';
import { CaseStudyModal } from './CaseStudyModal';
import { 
  ArrowUpRight, 
  BarChart3, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Layers, 
  FileCheck2,
  ExternalLink
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const filters = ['All', 'Meta Ads', 'TikTok Ads', 'Tracking & CAPI'];

  const filteredStudies = selectedFilter === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter((c) => c.platform === selectedFilter);

  return (
    <section id="portfolio" className="py-24 bg-[#08080a] border-t border-[#171720] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#14141c] border border-[#232330] text-xs font-mono text-cyan-400 uppercase tracking-widest">
              04 • Verified Campaign Results & Proof
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
              Selected Work & Ad Proofs
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              Real advertising campaigns managed by Pratik Podder. Inspect verified ad account metrics, lead volume, CPA, and live dashboard screenshots.
            </p>
          </div>

          {/* Proof Badge Notice */}
          <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-[#111118] border border-[#20202e] text-xs font-mono text-zinc-300 max-w-md shadow-inner">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              All campaign proof records are backed by verified Meta Ads Manager dashboards with screenshot audits.
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                selectedFilter === filter
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-[#121218] text-zinc-400 hover:text-zinc-200 hover:bg-[#181822] border border-[#22222e]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              className="rounded-2xl bg-[#0e0e14] border border-[#20202e] hover:border-cyan-500/40 transition-all duration-300 overflow-hidden flex flex-col justify-between group shadow-xl"
            >
              {/* Card Top: Visual Telemetry Header */}
              <div className="relative p-6 bg-gradient-to-br from-[#13131c] via-[#0f0f16] to-[#0a0a0f] border-b border-[#1f1f2e] overflow-hidden">
                
                {/* Platform Tag & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-cyan-950/40 border border-cyan-800/40 text-cyan-300">
                      {study.platform}
                    </span>
                    {study.screenshot && (
                      <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950/40 border border-emerald-800/40 text-emerald-300">
                        <FileCheck2 className="w-3 h-3 text-emerald-400" />
                        <span>Screenshot Proof</span>
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-zinc-400 truncate max-w-[150px]">
                    {study.category}
                  </span>
                </div>

                {/* Campaign Metric Dashboard Box */}
                <div className="rounded-xl bg-[#09090d] border border-[#222230] p-4 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                      Live Verified Telemetry
                    </span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified
                    </span>
                  </div>

                  {/* 3 Metric Badges */}
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    {study.results.map((res, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#12121a] border border-[#20202d]">
                        <div className="text-[10px] font-mono text-zinc-500 truncate">{res.label}</div>
                        <div className="text-base font-heading font-bold text-white mt-0.5">{res.value}</div>
                        {res.change && <div className="text-[9px] font-mono text-cyan-400">{res.change}</div>}
                      </div>
                    ))}
                  </div>

                  {/* Sub-Campaign pills if present */}
                  {study.subCampaigns && study.subCampaigns.length > 0 && (
                    <div className="pt-2 border-t border-[#181822] space-y-1.5">
                      <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                        Campaign Results Highlights:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {study.subCampaigns.slice(0, 3).map((sub, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 rounded bg-[#13131b] border border-[#21212e] text-[10px] font-mono text-zinc-300 flex items-center gap-1.5"
                          >
                            <span className="text-zinc-400">{sub.title}:</span>
                            <span className="text-emerald-400 font-semibold">{sub.leads}</span>
                            <span className="text-zinc-500 font-sans">({sub.costPerLead})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {study.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed">
                    {study.overview}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded text-[11px] font-mono bg-[#13131a] border border-[#22222e] text-zinc-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action: Exact Required Button Label "Inspect Strategy ↗" */}
                <div className="pt-4 border-t border-[#1a1a24] flex items-center justify-between">
                  <span className="text-xs font-mono text-zinc-500">
                    {study.screenshot ? 'Screenshot Attached' : `Timeline: ${study.timeline}`}
                  </span>
                  
                  <button
                    onClick={() => setActiveModalStudy(study)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md shadow-cyan-950/20 active:scale-[0.98]"
                    aria-label={`Inspect Strategy for ${study.title}`}
                  >
                    <span>Inspect Strategy ↗</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Modal / Lightbox Popup */}
        <CaseStudyModal
          study={activeModalStudy}
          onClose={() => setActiveModalStudy(null)}
        />

      </div>
    </section>
  );
};
