import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowUpRight, 
  Globe, 
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    platform: 'Meta Ads',
    monthlyBudget: '$1,000 - $5,000',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = 'Please provide details about your project or ad account (at least 15 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const whatsappMessage = 
`*New Project Inquiry for Pratik Podder*
• *Name:* ${formData.name}
• *Work Email:* ${formData.email}
• *Platform Focus:* ${formData.platform}
• *Monthly Ad Budget:* ${formData.monthlyBudget}
• *Subject:* ${formData.subject}

*Project Details & Objectives:*
${formData.message}`;

    const whatsappUrl = `https://wa.me/8801608175252?text=${encodeURIComponent(whatsappMessage)}`;

    setIsSubmitted(true);

    // Open WhatsApp directly in a new tab with the prepared message
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Generate mailto link with encoded content as alternative
  const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
    `[Client Inquiry] ${formData.subject || 'Media Buying Consultation'}`
  )}&body=${encodeURIComponent(
    `Hi Pratik,\n\nName: ${formData.name}\nEmail: ${formData.email}\nPrimary Platform: ${formData.platform}\nEstimated Monthly Ad Budget: ${formData.monthlyBudget}\n\nProject Details:\n${formData.message}\n`
  )}`;

  // Generate WhatsApp inquiry link with prefilled message
  const whatsappInquiryUrl = `https://wa.me/8801608175252?text=${encodeURIComponent(
`*New Project Inquiry for Pratik Podder*
• *Name:* ${formData.name}
• *Work Email:* ${formData.email}
• *Platform Focus:* ${formData.platform}
• *Monthly Ad Budget:* ${formData.monthlyBudget}
• *Subject:* ${formData.subject}

*Project Details & Objectives:*
${formData.message}`
  )}`;

  return (
    <section id="contact" className="py-24 bg-[#08080a] border-t border-[#171720] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#14141c] border border-[#232330] text-xs font-mono text-cyan-400 uppercase tracking-widest">
            06 • Direct Inquiries
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight">
            Let's Grow Your Business Together.
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            Have a project in mind or looking to scale your business through paid advertising? Let's discuss how I can help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Channels & Fast WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Highlight Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-[#101915] to-[#0d1210] border border-emerald-800/40 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-950/60 text-emerald-300 border border-emerald-700/50">
                  Fastest Response (~1-2 Hours)
                </span>
                <MessageCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="font-heading text-xl font-bold text-white">
                Direct WhatsApp Channel
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Skip the back-and-forth email delay. Message directly to discuss campaign goals, current account bottlenecks, or immediate audits.
              </p>
              <div className="pt-2">
                <a
                  href={PERSONAL_INFO.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-heading font-semibold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-950/40"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp (+880 1608-175252)</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Email & Phone Cards */}
            <div className="space-y-3">
              {/* Email */}
              <div className="p-4 rounded-xl bg-[#111117] border border-[#20202c] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#181824] text-cyan-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500">Official Email</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-[#181824] text-zinc-400 hover:text-white transition-colors"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone */}
              <div className="p-4 rounded-xl bg-[#111117] border border-[#20202c] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#181824] text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500">Phone / Cellular</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 bg-[#171720] px-2 py-1 rounded">
                  Dhaka, BD (GMT+6)
                </span>
              </div>
            </div>

            {/* Social Network Links */}
            <div className="p-5 rounded-xl bg-[#111117] border border-[#20202c] space-y-3">
              <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                Connect on Professional & Social Networks
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#161622] hover:bg-[#1d1d2c] border border-[#252538] text-xs font-medium text-zinc-200 hover:text-cyan-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>LinkedIn Profile</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#161622] hover:bg-[#1d1d2c] border border-[#252538] text-xs font-medium text-zinc-200 hover:text-cyan-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span>Facebook Profile & Community</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>

                <a
                  href={PERSONAL_INFO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#161622] hover:bg-[#1d1d2c] border border-[#252538] text-xs font-medium text-zinc-200 hover:text-cyan-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500" />
                    <span>Instagram Profile</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Modern Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0f0f15] border border-[#212130] shadow-xl space-y-6">
              
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white">
                      Send a Message
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Fill out the form below to receive a detailed response within 24 hours.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300">
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Michael Vance"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border ${
                          errors.name ? 'border-rose-500' : 'border-[#262638] focus:border-cyan-400'
                        } text-sm text-white placeholder-zinc-600 outline-none transition-colors`}
                      />
                      {errors.name && <p className="text-[11px] font-mono text-rose-400">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300">
                        Work Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border ${
                          errors.email ? 'border-rose-500' : 'border-[#262638] focus:border-cyan-400'
                        } text-sm text-white placeholder-zinc-600 outline-none transition-colors`}
                      />
                      {errors.email && <p className="text-[11px] font-mono text-rose-400">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Primary Platform */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300">
                        Primary Platform Focus
                      </label>
                      <select
                        value={formData.platform}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-[#262638] focus:border-cyan-400 text-sm text-white outline-none transition-colors"
                      >
                        <option value="Meta Ads">Meta Ads (Facebook & Instagram)</option>
                        <option value="TikTok Ads">TikTok Ads Scaling</option>
                        <option value="Google Ads">Google Ads (Search / PMax)</option>
                        <option value="Tracking & CAPI">Tracking, GTM & CAPI Setup</option>
                        <option value="Marketing Automation">ManyChat & Automation</option>
                        <option value="Full Omnichannel">Full Multi-Channel Architecture</option>
                      </select>
                    </div>

                    {/* Estimated Ad Budget */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-zinc-300">
                        Estimated Monthly Ad Spend
                      </label>
                      <select
                        value={formData.monthlyBudget}
                        onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border border-[#262638] focus:border-cyan-400 text-sm text-white outline-none transition-colors"
                      >
                        <option value="< $1,000">Starting Out (Under $1,000 / mo)</option>
                        <option value="$1,000 - $5,000">$1,000 – $5,000 / month</option>
                        <option value="$5,000 - $15,000">$5,000 – $15,000 / month</option>
                        <option value="$15,000+">$15,000+ / month (High Scale)</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">
                      Subject <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Scaling Q4 E-Commerce Meta Funnel"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border ${
                        errors.subject ? 'border-rose-500' : 'border-[#262638] focus:border-cyan-400'
                      } text-sm text-white placeholder-zinc-600 outline-none transition-colors`}
                    />
                    {errors.subject && <p className="text-[11px] font-mono text-rose-400">{errors.subject}</p>}
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-300">
                      Project Details & Objectives <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your product/service, current target ROAS, target CAC, website link, and any past advertising challenges..."
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-[#14141c] border ${
                        errors.message ? 'border-rose-500' : 'border-[#262638] focus:border-cyan-400'
                      } text-sm text-white placeholder-zinc-600 outline-none transition-colors`}
                    />
                    {errors.message && <p className="text-[11px] font-mono text-rose-400">{errors.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-heading font-semibold text-sm text-zinc-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 transition-all shadow-lg shadow-emerald-950/30 active:scale-[0.99] cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-zinc-950" />
                    <span>Submit Project Inquiry</span>
                    <ArrowUpRight className="w-4 h-4 text-zinc-950" />
                  </button>

                  <p className="text-[11px] font-mono text-zinc-400 text-center flex items-center justify-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Opens WhatsApp directly with your pre-filled inquiry details for instant response.</span>
                  </p>
                </form>
              ) : (
                /* Success State with WhatsApp Direct Dispatch */
                <div className="py-6 space-y-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-950/50 border border-emerald-600/50 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading text-2xl font-bold text-white">
                      Opening WhatsApp Conversation...
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                      Thank you, <strong className="text-white">{formData.name}</strong>. Your project details have been formatted and directed to WhatsApp (<strong className="text-emerald-400">+880 1608-175252</strong>).
                    </p>
                  </div>

                  {/* Fallback button if popup blocker was triggered */}
                  <div className="p-4 rounded-xl bg-[#13131c] border border-[#242436] space-y-3 text-left">
                    <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      <span>If WhatsApp did not open automatically:</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <a
                        href={whatsappInquiryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>Click Here to Open WhatsApp Chat</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>

                      <a
                        href={mailtoUrl}
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-[#181824] hover:bg-[#202030] border border-[#2b2b3d] transition-all"
                      >
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Also Send via Email</span>
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        platform: 'Meta Ads',
                        monthlyBudget: '$1,000 - $5,000',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="text-xs font-mono text-zinc-400 hover:text-white underline underline-offset-4"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
