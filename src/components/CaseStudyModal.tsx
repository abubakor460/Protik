import React, { useState, useEffect } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Eye, 
  Calendar, 
  Maximize2, 
  Minimize2, 
  AlertCircle, 
  RefreshCw, 
  FileText, 
  TrendingUp,
  Image as ImageIcon,
  ArrowUpRight
} from 'lucide-react';
import { CaseStudy } from '../data/portfolioData';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ study, onClose }) => {
  const [activeTab, setActiveTab] = useState<'screenshot' | 'strategy'>('screenshot');
  const [imgLoadError, setImgLoadError] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);
  const [useIframeFallback, setUseIframeFallback] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Reset state when a new study is loaded
  useEffect(() => {
    if (study) {
      setActiveTab('screenshot');
      setImgLoadError(false);
      setImgLoading(true);
      setUseIframeFallback(false);
      setIsZoomed(false);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [study]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!study) return null;

  const screenshot = study.screenshot;
  const driveFileId = screenshot?.driveFileId;
  const directImgUrl = driveFileId ? `https://lh3.googleusercontent.com/d/${driveFileId}` : '';
  const previewIframeUrl = screenshot?.previewUrl || '';
  const originalUrl = screenshot?.originalUrl || `https://drive.google.com/file/d/${driveFileId}/view`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        // Close on clicking backdrop
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0d0d12] border border-[#272738] shadow-2xl overflow-hidden text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#1f1f2e] bg-[#101017]/90 backdrop-blur-sm z-20 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/40 border border-cyan-800/40 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-950/50 text-cyan-300 border border-cyan-800/40 shrink-0">
                  {study.platform}
                </span>
                <span className="text-xs font-mono text-zinc-400 truncate hidden sm:inline">
                  {study.category}
                </span>
              </div>
              <h3 id="modal-headline" className="text-base sm:text-lg font-heading font-bold text-white truncate mt-0.5">
                {study.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-4">
            {screenshot && (
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-cyan-300 hover:text-white bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-800/40 transition-colors shadow-sm"
                title="Open original screenshot on Google Drive in new tab"
              >
                <span>Open Original Screenshot</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-[#181822] hover:bg-[#222230] text-zinc-400 hover:text-white transition-colors border border-[#2c2c3d]"
              aria-label="Close modal (Escape)"
              title="Close modal (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* View Switcher Tabs (Only if screenshot exists) */}
        {screenshot && (
          <div className="flex items-center justify-between px-5 sm:px-7 py-2.5 bg-[#0b0b0f] border-b border-[#1b1b26] text-xs font-mono shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('screenshot')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'screenshot'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#15151e]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Verified Campaign Screenshot</span>
              </button>

              <button
                onClick={() => setActiveTab('strategy')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'strategy'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-[#15151e]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Strategy & Sub-Campaigns</span>
              </button>
            </div>

            {activeTab === 'screenshot' && !imgLoadError && !useIframeFallback && (
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="hidden sm:flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white transition-colors"
                title="Toggle Zoom / Fit"
              >
                {isZoomed ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                <span>{isZoomed ? 'Fit Screen' : 'Zoom 100%'}</span>
              </button>
            )}
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {/* TAB 1: SCREENSHOT LIGHTBOX VIEWER */}
          {screenshot && activeTab === 'screenshot' && (
            <div className="space-y-4">
              {/* Caption Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#14141d] border border-[#242436] text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="font-semibold text-white">Live Ad Account Proof:</span>
                  <span className="text-zinc-400 text-[11px]">{screenshot.caption}</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-mono">
                  Google Drive Verified
                </div>
              </div>

              {/* Main Image Frame */}
              <div className="relative rounded-xl bg-[#08080c] border border-[#232332] overflow-hidden flex items-center justify-center min-h-[340px] sm:min-h-[460px]">
                
                {/* Loading state indicator */}
                {imgLoading && !imgLoadError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a0f]/90 z-10 text-xs font-mono text-zinc-400">
                    <RefreshCw className="w-5 h-5 animate-spin text-cyan-400" />
                    <span>Loading Campaign Proof Screenshot...</span>
                  </div>
                )}

                {/* Primary Mode: Direct Image CDN with fallback */}
                {!useIframeFallback && !imgLoadError ? (
                  <div className={`w-full flex justify-center p-2 sm:p-4 overflow-auto ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`} onClick={() => setIsZoomed(!isZoomed)}>
                    <img
                      src={directImgUrl}
                      alt={screenshot.caption}
                      onLoad={() => setImgLoading(false)}
                      onError={() => {
                        setImgLoading(false);
                        setImgLoadError(true);
                      }}
                      className={`rounded-lg object-contain transition-all duration-200 ${
                        isZoomed 
                          ? 'max-w-none w-[140%] sm:w-[160%]' 
                          : 'max-h-[65vh] w-auto max-w-full'
                      } shadow-2xl`}
                    />
                  </div>
                ) : useIframeFallback ? (
                  /* Secondary Mode: Embedded Google Drive Iframe */
                  <div className="w-full h-[520px] relative">
                    <iframe
                      src={previewIframeUrl}
                      title={screenshot.caption}
                      className="w-full h-full border-0 rounded-lg"
                      allow="autoplay"
                      onLoad={() => setImgLoading(false)}
                    />
                  </div>
                ) : (
                  /* Fallback Mode: When Direct Embedding is restricted by browser security policies */
                  <div className="p-8 text-center space-y-4 max-w-md mx-auto">
                    <div className="w-12 h-12 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 mx-auto flex items-center justify-center">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-heading font-semibold text-white text-base">
                        Protected Google Drive Document
                      </h4>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        Your browser security settings require opening Google Drive attachments directly. Click below to inspect the verified full-resolution dashboard proof.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                      <a
                        href={originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-heading font-semibold text-xs text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md"
                      >
                        <span>Open Original Screenshot ↗</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => {
                          setImgLoadError(false);
                          setUseIframeFallback(true);
                          setImgLoading(true);
                        }}
                        className="px-4 py-2.5 rounded-xl text-xs font-mono text-zinc-300 bg-[#161622] hover:bg-[#1d1d2c] border border-[#28283a] transition-colors"
                      >
                        Try Embedded Drive Frame
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Sub-campaign verified lead metrics connected to this screenshot */}
              {study.subCampaigns && study.subCampaigns.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Verified Campaign Results Shown In Screenshot:</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {study.subCampaigns.map((sub, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-[#12121a] border border-[#21212f] space-y-1">
                        <div className="text-[11px] font-mono text-zinc-400 truncate font-medium">
                          {sub.title}
                        </div>
                        <div className="text-base font-heading font-bold text-white">
                          {sub.leads}
                        </div>
                        <div className="text-xs font-mono text-emerald-400">
                          {sub.costPerLead}
                        </div>
                        {sub.reachOrImpressions && (
                          <div className="text-[10px] font-mono text-zinc-500 pt-1">
                            {sub.reachOrImpressions}
                          </div>
                        )}
                        {sub.spend && (
                          <div className="text-[10px] font-mono text-zinc-500">
                            {sub.spend}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2 or Default: STRATEGY & DEEP DIVE */}
          {(activeTab === 'strategy' || !screenshot) && (
            <div className="space-y-6">
              {/* Campaign Objective Box */}
              <div className="p-4 rounded-xl bg-[#13131c] border border-[#222232] text-xs sm:text-sm text-zinc-200">
                <span className="font-mono text-cyan-400 font-semibold uppercase tracking-wider block sm:inline mr-2">
                  Campaign Objective:
                </span>
                <span>{study.objective}</span>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Campaign Execution Summary
                </h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  {study.overview}
                </p>
              </div>

              {/* Sub-Campaigns List if available */}
              {study.subCampaigns && study.subCampaigns.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                    Segmented Campaign Breakdown
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {study.subCampaigns.map((sub, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#12121a] border border-[#222232] space-y-1.5">
                        <div className="text-xs font-mono text-zinc-400 font-semibold">{sub.title}</div>
                        <div className="text-lg font-heading font-bold text-white">{sub.leads}</div>
                        <div className="text-xs font-mono text-cyan-400 font-medium">{sub.costPerLead}</div>
                        {sub.reachOrImpressions && (
                          <div className="text-[11px] font-mono text-zinc-500 pt-0.5">{sub.reachOrImpressions}</div>
                        )}
                        {sub.spend && (
                          <div className="text-[11px] font-mono text-zinc-500">{sub.spend}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Strategy Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                  Strategic Architecture & Media Buying Execution
                </h4>
                <ul className="space-y-2.5">
                  {study.strategy.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Results Metrics Grid */}
              <div className="p-5 rounded-xl bg-[#111117] border border-[#212130] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Key Performance Indicators
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {study.results.map((res, idx) => (
                    <div key={idx} className="p-3.5 rounded-lg bg-[#161622] border border-[#262638]">
                      <div className="text-xs font-mono text-zinc-400">{res.label}</div>
                      <div className="text-xl sm:text-2xl font-heading font-bold text-white mt-1">
                        {res.value}
                      </div>
                      {res.change && (
                        <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                          {res.change}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Takeaway */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/40 text-xs sm:text-sm text-zinc-300">
                <div className="font-mono text-cyan-300 font-semibold mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Key Media Buying Insight:</span>
                </div>
                <p>{study.keyTakeaway}</p>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-5 sm:px-7 py-4 border-t border-[#1f1f2e] bg-[#101017] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-[11px] font-mono text-zinc-500">
            * Verified ad account proof from Pratik Podder's media buying track record
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {screenshot && (
              <a
                href={originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-mono text-zinc-300 hover:text-white bg-[#171722] hover:bg-[#1e1e2c] border border-[#272738] transition-colors"
              >
                <span>Open Original Screenshot ↗</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href="#contact"
              onClick={onClose}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-zinc-950 bg-gradient-to-r from-cyan-400 to-sky-300 hover:from-cyan-300 hover:to-sky-200 transition-all shadow-md"
            >
              <span>Scale Similar Campaign</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
