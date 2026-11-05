import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Target, 
  Activity, 
  Bot, 
  ChevronDown, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/portfolioData';

export const Services: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>('meta-ads');

  const getIcon = (name: string) => {
    switch (name) {
      case 'TrendingUp': return TrendingUp;
      case 'Sparkles': return Sparkles;
      case 'Target': return Target;
      case 'Activity': return Activity;
      case 'Bot': return Bot;
      default: return TrendingUp;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#08080a] border-t border-[#171720] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#14141c] border border-[#232330] text-xs font-mono text-cyan-400 uppercase tracking-widest">
              02 • Capabilities & Services
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
              What I Do
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg">
              High-impact paid acquisition ecosystems tailored for scalable e-commerce and high-intent lead generation brands.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Full Funnel Execution • No Outsourcing</span>
          </div>
        </div>

        {/* Editorial Numbered Service List */}
        <div className="divide-y divide-[#1e1e2b] border-y border-[#1e1e2b]">
          {SERVICES.map((service: ServiceItem) => {
            const Icon = getIcon(service.iconName);
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className="group py-6 sm:py-8 transition-colors duration-200"
              >
                {/* Main Row / Trigger */}
                <div
                  onClick={() => setExpandedId(isExpanded ? '' : service.id)}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
                >
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-lg sm:text-xl text-zinc-500 font-semibold group-hover:text-cyan-400 transition-colors">
                      {service.number}
                    </span>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="font-heading text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {service.title}
                        </h3>
                        <div className="p-1 rounded bg-[#181822] text-zinc-400 group-hover:text-cyan-400 hidden sm:block">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-xs sm:text-sm font-mono text-zinc-400 mt-1">
                        {service.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right: Platforms & Expand Toggle */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 mt-2 lg:mt-0 pl-12 sm:pl-0">
                    <div className="flex flex-wrap gap-1.5">
                      {service.platforms.map((plat) => (
                        <span
                          key={plat}
                          className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#14141c] border border-[#242432] text-zinc-300"
                        >
                          {plat}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
                        {isExpanded ? 'Collapse' : 'Details'}
                      </span>
                      <div className={`w-8 h-8 rounded-full border border-[#2b2b3a] flex items-center justify-center text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-cyan-400 border-cyan-500/50 bg-cyan-950/20' : 'group-hover:border-zinc-500'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Drawer Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-[#1a1a24] pl-12 sm:pl-16 space-y-6">
                    <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {/* Deliverables */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                          Key Deliverables
                        </div>
                        <ul className="space-y-2">
                          {service.deliverables.map((deliv, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{deliv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Primary Metrics Impact */}
                      <div className="space-y-3 bg-[#111117] p-5 rounded-xl border border-[#1f1f2c]">
                        <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                          Target Core Metrics
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {service.metrics.map((metric, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-cyan-300 bg-cyan-950/30 border border-cyan-800/40"
                            >
                              ★ {metric}
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-zinc-400 leading-normal pt-2">
                          Configured with customized dashboard telemetry and weekly performance reviews.
                        </p>
                        <div className="pt-2">
                          <a
                            href="#contact"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-cyan-300 font-semibold transition-colors"
                          >
                            <span>Book Consultation For This Service</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
