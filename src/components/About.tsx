import React from 'react';
import { Target, BarChart3, Cpu, Users, Award, ShieldAlert, CheckCircle, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: Target,
      title: 'Strategic Thinking',
      description: 'Understanding the customer journey from cold feed interruption to high-frequency repurchase before setting up a single ad group.'
    },
    {
      icon: BarChart3,
      title: 'Performance-Driven Advertising',
      description: 'Focusing exclusively on bottom-line contribution margin, verified ROAS, and sustainable customer acquisition costs.'
    },
    {
      icon: Cpu,
      title: 'Data & Tracking Resilience',
      description: 'Implementing server-side GTM and Meta CAPI to counter iOS privacy rollouts and restore complete attribution signal density.'
    },
    {
      icon: Users,
      title: 'Client Communication & Transparency',
      description: 'Clear, jargon-free bi-weekly reporting, proactive creative audits, and direct WhatsApp channel access for continuous alignment.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-[#0a0a0d] border-t border-[#171720] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#14141c] border border-[#232330] text-xs font-mono text-cyan-400 uppercase tracking-widest">
            01 • Background & Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            A Little About Me
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            I believe that profitable advertising is not magic or intuition — it is disciplined statistical engineering, rapid creative iteration, and deep audience psychology.
          </p>
        </div>

        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Long-form Story */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed font-normal">
            <p className="text-lg text-zinc-200">
              {PERSONAL_INFO.bioFull[0]}
            </p>
            <p>
              {PERSONAL_INFO.bioFull[1]}
            </p>
            <p>
              {PERSONAL_INFO.bioFull[2]}
            </p>

            {/* Editorial Profile Quote Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#111118] border border-[#222230] flex flex-col sm:flex-row items-center gap-5 my-6">
              <div className="w-20 h-24 sm:w-24 sm:h-28 rounded-xl overflow-hidden border border-cyan-500/30 shrink-0 shadow-lg">
                <img
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="text-xs font-mono text-cyan-400 font-medium">
                  {PERSONAL_INFO.role} • {PERSONAL_INFO.company}
                </div>
                <div className="text-base sm:text-lg font-heading font-bold text-white">
                  {PERSONAL_INFO.name}
                </div>
                <p className="text-xs sm:text-sm text-zinc-400 italic">
                  "Scaling paid traffic isn't about spending more—it's about engineering resilient conversion pathways and continuous creative testing."
                </p>
              </div>
            </div>

            {/* Quick credentials card */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#111117] border border-[#1f1f2a]">
                <div className="text-xs font-mono text-zinc-500 uppercase">Agency Unit</div>
                <div className="text-sm font-semibold text-white mt-1">{PERSONAL_INFO.company}</div>
                <div className="text-xs text-zinc-400 mt-0.5">Media Buying Division</div>
              </div>

              <div className="p-4 rounded-xl bg-[#111117] border border-[#1f1f2a]">
                <div className="text-xs font-mono text-zinc-500 uppercase">Headquarters</div>
                <div className="text-sm font-semibold text-white mt-1">{PERSONAL_INFO.location}</div>
                <div className="text-xs text-zinc-400 mt-0.5">Global Client Delivery</div>
              </div>

              <div className="p-4 rounded-xl bg-[#111117] border border-[#1f1f2a]">
                <div className="text-xs font-mono text-zinc-500 uppercase">Ad Spend Record</div>
                <div className="text-sm font-semibold text-cyan-400 mt-1">${(PERSONAL_INFO.adSpendManaged).toLocaleString()}+</div>
                <div className="text-xs text-zinc-400 mt-0.5">Across 200+ Campaigns</div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <span>View Full Scope of Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right: 4 Core Pillars Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-[#121218] border border-[#20202c] hover:border-cyan-500/30 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-[#181824] border border-[#272738] text-cyan-400 group-hover:text-cyan-300 transition-colors shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-white text-base">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
