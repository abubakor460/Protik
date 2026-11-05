export interface PersonalInfo {
  name: string;
  role: string;
  location: string;
  company: string;
  yearsExperience: number;
  campaignsCount: number;
  adSpendManaged: number;
  email: string;
  phone: string;
  whatsappLink: string;
  profileImage: string;
  socials: {
    facebook: string;
    instagram: string;
    linkedin: string;
  };
  bioShort: string;
  bioFull: string[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  metrics: string[];
  platforms: string[];
  iconName: string;
}

export interface ScreenshotProof {
  driveFileId: string;
  previewUrl: string;
  originalUrl: string;
  caption: string;
}

export interface SubCampaignItem {
  title: string;
  leads: string;
  costPerLead: string;
  reachOrImpressions?: string;
  spend?: string;
  type?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  platform: 'Meta Ads' | 'TikTok Ads' | 'Google Ads' | 'Multi-Channel' | 'Tracking & CAPI';
  objective: string;
  timeline: string;
  tags: string[];
  overview: string;
  strategy: string[];
  results: {
    label: string;
    value: string;
    change?: string;
    sublabel?: string;
  }[];
  keyTakeaway: string;
  dashboardAccent: string;
  screenshot?: ScreenshotProof;
  subCampaigns?: SubCampaignItem[];
}

export const PERSONAL_INFO: PersonalInfo = {
  name: "Pratik Podder",
  role: "Freelance Digital Marketer & Media Buyer",
  location: "Dhaka, Bangladesh",
  company: "Digital Adler",
  yearsExperience: 5,
  campaignsCount: 200,
  adSpendManaged: 50000,
  email: "podderprotik4@gmail.com",
  phone: "+880 1608-175252",
  whatsappLink: "https://wa.me/8801608175252?text=Hi%20Pratik%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20scaling%20our%20campaigns.",
  profileImage: "/assets/aistudio/Protik4K_1669d4ea.png",
  socials: {
    facebook: "https://www.facebook.com/share/1C3fs6n93x/",
    instagram: "https://www.instagram.com/pratik__podder?stkn=MW1wZDl6ZDFpdnVqbQ==",
    linkedin: "https://www.linkedin.com/in/pratik-podder-1368a53b6?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  bioShort: "Freelance Digital Marketer and Media Buyer specializing in Meta, TikTok, and Google Ads. Turning ad spend into measurable, compounding business growth for modern e-commerce and lead-gen brands.",
  bioFull: [
    "I am a performance-driven Media Buyer based in Dhaka, Bangladesh, working with brands globally through Digital Adler. Over the past 5+ years, I have architected and scaled paid traffic funnels across Meta (Facebook & Instagram), TikTok, and Google Ads.",
    "My methodology focuses on precision data telemetry, rapid creative iteration frameworks, and full-funnel customer acquisition. Rather than relying on guesswork, every dollar of ad spend is backed by deep cohort tracking, conversion API resilience, and rigorous statistical testing.",
    "Whether your business is launching its first ad spend or scaling past $10k/month, I structure accounts for profitable return on ad spend (ROAS), lower customer acquisition costs (CAC), and sustainable revenue."
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: "meta-ads",
    number: "01",
    title: "Meta Ads Mastery",
    subtitle: "Facebook & Instagram Growth Engine",
    description: "End-to-end campaign architecture for high-converting Meta ecosystems. From creative strategy and dynamic catalog setups to broad targeting algorithms and retargeting cascades.",
    deliverables: [
      "Full-Funnel Campaign Structure (TOF, MOF, BOF)",
      "Ad Creative Framework & Hook Testing",
      "Lookalike & Custom Audience Modeling",
      "Dynamic Product Ads (DPA) & Catalog Sales",
      "Weekly ROAS & Contribution Margin Reporting"
    ],
    metrics: ["Lower CAC", "Higher AOV", "Scalable ROAS"],
    platforms: ["Facebook", "Instagram", "Audience Network"],
    iconName: "TrendingUp"
  },
  {
    id: "tiktok-ads",
    number: "02",
    title: "TikTok Ads Scaling",
    subtitle: "Viral Hook & UGC Performance",
    description: "Tapping into TikTok's powerful recommendation algorithm with native UGC style creatives, Spark Ads, smart bidding strategies, and high-velocity creative fatigue management.",
    deliverables: [
      "TikTok Ads Manager Setup & Account Structure",
      "Spark Ads & Influencer Whitelisting Strategy",
      "Smart Performance Campaign (SPC) Deployment",
      "Creative Fatigue Rotation Schedules",
      "Lead Generation & Instant Form Optimization"
    ],
    metrics: ["High CTRs", "Gen-Z Reach", "Rapid Conversions"],
    platforms: ["TikTok", "Pangle"],
    iconName: "Sparkles"
  },
  {
    id: "google-ads",
    number: "03",
    title: "Google Ads & Search Intent",
    subtitle: "Capture High-Intent Demand",
    description: "Dominating search engine results when buyers are actively searching for your solutions. High-converting Search ads, Performance Max (PMax), Shopping feeds, and YouTube retargeting.",
    deliverables: [
      "High-Intent Keyword Architecture & Negative Lists",
      "Performance Max (PMax) Asset Group Strategy",
      "Google Merchant Center Feed Optimization",
      "Responsive Search Ads (RSA) Copywriting",
      "Target CPA & Target ROAS Smart Bidding"
    ],
    metrics: ["High Intent", "Quality Traffic", "Bottom-Funnel Wins"],
    platforms: ["Google Search", "Performance Max", "YouTube", "Shopping"],
    iconName: "Target"
  },
  {
    id: "tracking-analytics",
    number: "04",
    title: "Tracking, Pixels & CAPI",
    subtitle: "Server-Side Data Resilience",
    description: "Modern ad platforms depend on clean data signals. I build server-side tracking, Conversions API (CAPI), and Google Tag Manager containers that bypass iOS privacy blocks.",
    deliverables: [
      "Meta Conversions API (CAPI) Gateway Setup",
      "Google Tag Manager (GTM) Container Architecture",
      "Google Analytics 4 (GA4) Custom Event Models",
      "TikTok Pixel & Events API Implementation",
      "Shopify & WooCommerce Checkout Event Deduplication"
    ],
    metrics: ["100% Event Match", "Zero Signal Loss", "Accurate Attribution"],
    platforms: ["GTM", "GA4", "Meta CAPI", "TikTok Pixel", "Shopify"],
    iconName: "Activity"
  },
  {
    id: "marketing-automation",
    number: "05",
    title: "Marketing Automation",
    subtitle: "ManyChat & Conversational Leads",
    description: "Turn passive ad viewers into immediate conversations and buyers through automated Messenger, Instagram DM, and WhatsApp nurture sequences built for conversion.",
    deliverables: [
      "ManyChat Interactive Flow Design",
      "Instagram DM Auto-Responder & Keyword Triggers",
      "Click-to-WhatsApp Ad Funnels & Chatbot Flow",
      "Lead Qualification & CRM Synchronization",
      "Automated Cart Abandonment & Follow-up Workflows"
    ],
    metrics: ["Instant Response", "Higher Close Rates", "24/7 Lead Capture"],
    platforms: ["ManyChat", "Instagram DM", "WhatsApp Business", "Messenger"],
    iconName: "Bot"
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-tax-lead-gen",
    title: "Tax Preparation & High-Volume Lead Generation",
    category: "Financial Services / Professional Tax",
    platform: "Meta Ads",
    objective: "Generate massive website form leads at an ultra-low CPA during peak tax season.",
    timeline: "High-Volume Scaling Sprints",
    tags: ["Lead Gen", "Meta Ads", "0.01-0.02 CPL", "16,000+ Leads"],
    overview: "Architected a high-converting multi-campaign funnel for professional tax preparation and consultation services. Focused on streamlined mobile landing page forms and instant-intent audience targeting to drive unprecedented volume at just $0.01 – $0.02 per lead.",
    strategy: [
      "Deployed 4 segmented campaign clusters isolating tax prep intent, direct website form submissions, and traffic nurture.",
      "Optimized mobile landing pages for sub-2-second load times and simplified 3-field conversion forms.",
      "Engineered automated ad creative rotation highlighting tax refund guarantees, compliance deadline urgency, and free consultation hooks.",
      "Implemented Meta Pixel and Conversions API (CAPI) event deduplication to ensure zero lead signal drop-off."
    ],
    results: [
      { label: "Total Website Leads", value: "16,098+", change: "Combined" },
      { label: "Lowest Cost Per Lead", value: "$0.01 - $0.02", change: "Unprecedented CPA" },
      { label: "Top Campaign Volume", value: "6,148 Leads", change: "At $0.02 / lead" }
    ],
    subCampaigns: [
      { title: "Tax Preparation Leads", leads: "6,148 website leads", costPerLead: "$0.02 per lead", type: "Website Leads" },
      { title: "Lead Generation Campaign", leads: "5,745 website leads", costPerLead: "$0.02 per lead", type: "Lead Generation" },
      { title: "Website Form Campaign", leads: "4,205 website leads", costPerLead: "$0.01 per lead", type: "Form Submissions" },
      { title: "Traffic Campaign", leads: "215 landing page views", costPerLead: "$0.42 per view", type: "Traffic Funnel" }
    ],
    keyTakeaway: "Zero friction in the lead form coupled with high-urgency seasonal hooks unlocked 16,000+ validated leads at a jaw-dropping $0.01 – $0.02 acquisition cost.",
    dashboardAccent: "#00d2ff",
    screenshot: {
      driveFileId: "1X4g09eWqRlYIpoUPHs60tP09xqSWN0SN",
      previewUrl: "https://drive.google.com/file/d/1X4g09eWqRlYIpoUPHs60tP09xqSWN0SN/preview",
      originalUrl: "https://drive.google.com/file/d/1X4g09eWqRlYIpoUPHs60tP09xqSWN0SN/view",
      caption: "Live Meta Ads Manager Dashboard Proof: Tax Preparation & Lead Generation Campaigns (16,098 Leads @ $0.01 - $0.02 CPL)"
    }
  },
  {
    id: "case-nordic-lead-gen",
    title: "International Lead Generation Campaign (Nordic Market)",
    category: "International Acquisition / European Market",
    platform: "Meta Ads",
    objective: "Penetrate European / Nordic cross-border market and scale qualified lead capture with controlled cost per lead.",
    timeline: "Targeted International Sprint",
    tags: ["International", "Meta Ads", "NOK Currency", "289 Leads"],
    overview: "Executed an international direct-response lead generation initiative targeting the Nordic demographic in local currency (NOK). Reached over 33,000 individuals with 74,152 targeted impressions, producing 289 qualified leads at NOK 33.36 each.",
    strategy: [
      "Engineered cross-border demographic and interest lookalike segments tuned for regional Nordic consumer behavior.",
      "Localized ad copy, value messaging, and currency display (NOK) to maximize trust and conversion rates.",
      "Deployed automated frequency capping to ensure high brand recall without creative fatigue across 74k+ impressions.",
      "Built automated lead notification triggers to route incoming inquiries instantly to sales representatives."
    ],
    results: [
      { label: "People Reached", value: "33,473", change: "Unique Reach" },
      { label: "Impressions Delivered", value: "74,152", change: "Brand Exposure" },
      { label: "Total Leads Generated", value: "289 Leads", change: "At NOK 33.36 CPL" }
    ],
    subCampaigns: [
      { title: "Nordic Lead Generation Campaign", leads: "289 leads", costPerLead: "NOK 33.36 / lead", spend: "NOK 9,639.94 total spend", reachOrImpressions: "33,473 reach / 74,152 impressions" }
    ],
    keyTakeaway: "Accurate regional localization and localized currency calibration resulted in a highly profitable international customer pipeline.",
    dashboardAccent: "#0066ff",
    screenshot: {
      driveFileId: "1F4GBpV-tJbqY_pbERLjpog2nKdb2InKn",
      previewUrl: "https://drive.google.com/file/d/1F4GBpV-tJbqY_pbERLjpog2nKdb2InKn/preview",
      originalUrl: "https://drive.google.com/file/d/1F4GBpV-tJbqY_pbERLjpog2nKdb2InKn/view",
      caption: "Live Meta Ads Dashboard Proof: International Nordic Campaign (33,473 Reach, 74,152 Impressions, 289 Leads @ NOK 33.36)"
    }
  },
  {
    id: "case-construction-services",
    title: "Construction & Commercial Contractor Lead Generation",
    category: "Home & Commercial Services / Construction",
    platform: "Meta Ads",
    objective: "Acquire high-intent inbound inquiries for high-ticket construction and contracting projects under $10 CPA.",
    timeline: "Contractor Scaling Phase",
    tags: ["Construction", "Contractors", "High-Ticket", "121 Leads"],
    overview: "High-ticket home improvement and construction services require established trust and strong social proof. Reached nearly 70,000 local homeowners and property developers, delivering 299,088 impressions and 121 qualified construction project leads at $8.13 per lead.",
    strategy: [
      "Utilized video walk-throughs of completed construction projects as primary thumb-stopping ad creatives.",
      "Created segmented geo-targeting around high-property-value ZIP codes to target qualified homeowners.",
      "Constructed a qualified lead form filtering out renters and inquiries below project minimum budget requirements.",
      "Deployed automated SMS follow-up sequence via WhatsApp and CRM to secure estimate appointments within 15 minutes."
    ],
    results: [
      { label: "People Reached", value: "68,927", change: "Local Market" },
      { label: "Impressions", value: "299,088", change: "High Frequency" },
      { label: "Cost Per Lead", value: "$8.13", change: "121 Total Leads" }
    ],
    subCampaigns: [
      { title: "Campaign A – Construction Services", leads: "121 leads", costPerLead: "$8.13 per lead", spend: "$983.28 total spend", reachOrImpressions: "68,927 reach / 299,088 impressions" }
    ],
    keyTakeaway: "Showcasing tangible project craftsmanship and filtering by project budget generated 121 high-ticket construction project leads at just $8.13 each.",
    dashboardAccent: "#00d2ff",
    screenshot: {
      driveFileId: "1lYWOUFS5lT7jRxrc6TBpi0Ix-yvahOGu",
      previewUrl: "https://drive.google.com/file/d/1lYWOUFS5lT7jRxrc6TBpi0Ix-yvahOGu/preview",
      originalUrl: "https://drive.google.com/file/d/1lYWOUFS5lT7jRxrc6TBpi0Ix-yvahOGu/view",
      caption: "Live Meta Ads Dashboard Proof: Construction Services (68,927 Reach, 299,088 Impressions, 121 Leads @ $8.13)"
    }
  },
  {
    id: "case-jamaica-services",
    title: "Regional Tourism & Specialized Services (Jamaica)",
    category: "Regional Services / Destination & Hospitality",
    platform: "Meta Ads",
    objective: "Drive targeted service bookings and inquiries in Jamaica with a limited initial test budget of under $300.",
    timeline: "Regional Campaign Pilot",
    tags: ["Regional Services", "Meta Ads", "Tourism", "35 Leads"],
    overview: "Executed a lean, targeted regional campaign in Jamaica. On a modest $250.72 ad spend, the campaign reached 21,388 individuals, delivered 43,538 impressions, and generated 35 high-intent booking leads at only $7.16 per lead.",
    strategy: [
      "Focused on destination intent and targeted regional interest keywords for localized traveler and resident segments.",
      "Crafted mobile-first carousel ads highlighting service reliability, competitive rates, and immediate booking availability.",
      "Maintained strict frequency pacing to maximize unique reach across 21,388 individuals.",
      "Integrated instant click-to-chat and instant form capture for immediate response rates."
    ],
    results: [
      { label: "People Reached", value: "21,388", change: "Targeted" },
      { label: "Impressions", value: "43,538", change: "High Engagement" },
      { label: "Cost Per Lead", value: "$7.16", change: "35 Total Leads" }
    ],
    subCampaigns: [
      { title: "Campaign B – Jamaica Services", leads: "35 leads", costPerLead: "$7.16 per lead", spend: "$250.72 total spend", reachOrImpressions: "21,388 reach / 43,538 impressions" }
    ],
    keyTakeaway: "Laser-focused geographical targeting and clear value propositions generated 35 qualified service leads on just $250.72 total ad spend.",
    dashboardAccent: "#10b981",
    screenshot: {
      driveFileId: "1lYWOUFS5lT7jRxrc6TBpi0Ix-yvahOGu",
      previewUrl: "https://drive.google.com/file/d/1lYWOUFS5lT7jRxrc6TBpi0Ix-yvahOGu/preview",
      originalUrl: "https://drive.google.com/file/d/1lYWOUFS5lT7jRxrc6TBpi0Ix-yvahOGu/view",
      caption: "Live Meta Ads Dashboard Proof: Jamaica Services (21,388 Reach, 43,538 Impressions, 35 Leads @ $7.16)"
    }
  },
  {
    id: "case-skincare-tiktok",
    title: "Clean Skincare Brand TikTok Launch",
    category: "Beauty & Personal Care",
    platform: "TikTok Ads",
    objective: "Establish TikTok as a profitable new customer acquisition channel with under $20 CPA.",
    timeline: "60 Days Launch",
    tags: ["TikTok Ads", "UGC Creative", "Spark Ads", "Gen-Z Scale"],
    overview: "An established skincare company was over-reliant on Facebook. We launched their TikTok presence using authentic micro-creator testimonials and Spark Ads to drive viral product adoption.",
    strategy: [
      "Curated 12 creator-led video angles addressing genuine acne and skin barrier pain points.",
      "Leveraged TikTok Spark Ads to amplify top organic viral posts directly from creators' authentic handles.",
      "Set up TikTok Events API with advanced matching parameters for full tracking accuracy.",
      "Deployed Smart Performance Campaigns (SPC) with automated bid strategies for rapid learning exit."
    ],
    results: [
      { label: "Click-Through Rate", value: "3.4%", change: "+140% vs benchmark" },
      { label: "Cost Per Acquisition", value: "$16.80", change: "-22% below target" },
      { label: "Net Revenue Added", value: "$42,000+", change: "New channel" }
    ],
    keyTakeaway: "TikTok rewards raw, non-commercial storytelling. Problem-solution creator videos with fast hooks drive phenomenal sales velocity.",
    dashboardAccent: "#ff007f"
  },
  {
    id: "case-server-side-tracking",
    title: "Omnichannel Tracking & CAPI Reconstruction",
    category: "Multi-Store E-Commerce",
    platform: "Tracking & CAPI",
    objective: "Eliminate iOS 14.5+ attribution blindness and establish 99%+ event match quality across platforms.",
    timeline: "14 Days Implementation",
    tags: ["GTM Server-Side", "Meta CAPI", "GA4", "Event Deduplication"],
    overview: "A multi-currency online merchant lost 35% of ad attribution visibility due to browser ad blockers and iOS privacy restrictions. We migrated their entire analytics stack to a dedicated server-side tracking infrastructure.",
    strategy: [
      "Provisioned custom cloud server-side Google Tag Manager (sGTM) on a first-party subdomain.",
      "Configured Meta Conversions API (CAPI) with browser-server event ID deduplication.",
      "Integrated enhanced eCommerce tracking across product views, add-to-carts, checkout initiations, and purchases.",
      "Implemented GA4 BigQuery raw data streaming for custom attribution modeling."
    ],
    results: [
      { label: "Event Match Quality", value: "9.2 / 10", change: "Top tier" },
      { label: "Recovered Attribution", value: "+32%", change: "Additional tracked sales" },
      { label: "Algorithm Efficiency", value: "+18%", change: "ROAS uplift" }
    ],
    keyTakeaway: "First-party server-side telemetry gives advertising algorithms the complete signal density they need to optimize bidding and identify high-value buyers.",
    dashboardAccent: "#00f0ff"
  }
];

export const WHY_CHOOSE_ME = [
  {
    title: "Data-Driven Strategies",
    description: "Every dollar deployed is backed by cohort analysis, historical conversion metrics, and algorithmic trends rather than intuition or outdated tricks.",
    stat: "100%",
    statLabel: "Data-backed decisions"
  },
  {
    title: "Performance-Focused Campaigns",
    description: "Vanity metrics like likes and impressions don't pay the bills. I build funnels engineered exclusively around ROAS, CAC, and net profit contribution.",
    stat: "3.5x+",
    statLabel: "Average target ROAS"
  },
  {
    title: "Conversion Tracking Expertise",
    description: "Advanced GTM server-side containers and Conversions API (CAPI) guarantee maximum event match quality and zero attribution signal loss.",
    stat: "9.0+",
    statLabel: "Meta Event Match score"
  },
  {
    title: "Continuous Optimization",
    description: "Weekly creative hook testing, automated bid adjustments, and proactive fatigue management protect campaign stability through platform shifts.",
    stat: "Weekly",
    statLabel: "Creative rotation sprints"
  },
  {
    title: "Transparent Communication",
    description: "Clear weekly reports, direct WhatsApp updates, and real-time dashboard visibility. No marketing jargon, just honest business progress.",
    stat: "24h",
    statLabel: "Dedicated response SLA"
  },
  {
    title: "Business-Oriented Marketing",
    description: "I align paid media with your business fundamentals: inventory velocity, unit economics, cash flow cycles, and lifetime customer value (LTV).",
    stat: "$50K+",
    statLabel: "Ad spend managed"
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Full Funnel Audit",
    description: "Deep dive into your ad accounts, pixel health, website conversion rate, and past creative metrics to uncover hidden profit leaks."
  },
  {
    step: "02",
    title: "Infrastructure & Tracking",
    description: "Deploy robust server-side GTM, Meta CAPI, and GA4 tracking to ensure every conversion signal feeds directly back to the bidding algorithm."
  },
  {
    step: "03",
    title: "Creative & Angle Framework",
    description: "Craft high-converting hooks, value proposition angles, and native UGC briefs structured specifically for thumb-stopping feed engagement."
  },
  {
    step: "04",
    title: "Launch & Scientific Testing",
    description: "Deploy campaigns with clean budget allocation, disciplined bidding caps, and systematic statistical testing of copy, audience, and creative."
  },
  {
    step: "05",
    title: "Aggressive & Stable Scaling",
    description: "Scale budgets on verified winning combinations horizontally and vertically while safeguarding profitability and margin."
  }
];
