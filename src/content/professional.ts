/**
 * TS port of myportfolio/data/content.js — the Professional mode's content.
 * Kept as a straight port, not a rewrite: names deliberately don't reuse
 * `Project`/`ProjectCategory` from ./types.ts, which is a structurally
 * unrelated (much richer) shape for the Builder-side catalog.
 */

export type ProfessionalProjectEntry = {
  title: string;
  category: string;
  description: string;
  impact: string;
  tags: string[];
  featured?: boolean;
};

export type ProfessionalExperienceEntry = {
  title: string;
  subtitle: string;
  org: string;
  dates: string;
  description: string;
  highlights: string[];
};

export type ProfessionalCommunityEntry = {
  title: string;
  org: string;
  dates: string;
  description: string;
};

export type ProfessionalToolGroup = {
  category: string;
  items: string[];
};

export type ProfessionalStat = { value: string; label: string };

export const NAV_ITEMS = ["Home", "About", "Experience", "Projects", "Community", "Contact"];

export const STATS: ProfessionalStat[] = [
  { value: "$6.5M+", label: "Documented Savings" },
  { value: "10,465", label: "Hours Saved Annually" },
  { value: "12+", label: "Years of Experience" },
  { value: "8", label: "Professional Certifications" },
];

export const BIO: string[] = [
  "Change strategist with 12+ years designing and executing change programs across complex, matrixed financial services environments: translating strategic priorities into actionable plans, aligning stakeholders across business and technology, and building the adoption, training, and communication strategies that make transformation stick. I have owned organizational change management end-to-end, from change impact assessments and stakeholder engagement plans through training strategy, adoption metrics, and post-launch reinforcement.",
  "My current focus extends that discipline into technology-driven environments shaped by Generative AI, building the tools, governance frameworks, and enablement programs that turn AI access into AI adoption. I have generated $6.5 million in documented business value through structured change management, workflow automation, and Lean Six Sigma.",
  "My manager has described me as “a technologist” and “a master of learning new technologies quickly and adapting them for business use.” I hold a Master of Arts in Organizational Leadership from Gonzaga University (4.0 GPA), and I am a Microsoft 365 Copilot Champion (competitive selection) and Certified Six Sigma Green Belt.",
];

export const EXPERIENCE: ProfessionalExperienceEntry[] = [
  {
    title: "AI Enablement & Transformation Lead",
    subtitle: "",
    org: "Vanguard | Personal Investor Division",
    dates: "Jun 2025 - Present",
    description:
      "Lead AI enablement and adoption strategy across a Fortune 500 financial services enterprise, partnering with business and technology stakeholders to translate AI initiatives into sustained behavior change. Build AI-powered tools, training platforms, and governance frameworks that close the gap between AI access and AI transformation.",
    highlights: [
      "Led a 3-month cross-functional engagement between two siloed teams (technical IT/development leadership and business-facing staff), building process maps in Figma as a shared source of truth, facilitating RACI alignment, and delivering consolidated future-state recommendations to senior leadership",
      "Serve as Microsoft 365 Copilot Champion, driving AI readiness and adoption and coaching teams on integrating AI-powered workflows into daily operations",
      "Built and govern a centralized repository of 50+ AI skills in GitHub with peer review and quality governance, serving as the AI center of excellence for the entire coaching practice",
      "Designed and built a multi-agent AI system using Copilot Studio, Power Automate, and Dataverse that automates end-to-end project delivery artifacts from a single user prompt",
      "Currently building an AI LLM Skills Hub that gamifies skill contributions, tracks quality at the source, and measures usage and adoption through game mechanics",
      "Built AgileLingo, a gamified training platform as a React application using Claude Code, packaged into PowerApps via Microsoft PAC CLI for enterprise deployment",
      "Built Isaac, an AI-powered CLI tool suite housing a Claude Code Skills Builder, Statusline Generator, MarkItDown file converter, Build Safely security prompt generator, glossary with hoverable Verbose Mode definitions, and an intake system",
      "Designed and delivered How2GitGood, a 22-step interactive Git/GitHub course in one week with mock terminals, live branch visualizations, mock PR pages, and knowledge checks",
      "Developed applications using Google AI Studio, Gemini CLI, and Antigravity CLI, including a native Android application. Leverage Atlassian Rovo for AI-powered flow analytics and discovery",
      "Self-taught SQL and built Tableau and Tableau Prep Flows pipelines. Pioneered data democratization connecting cloud-hosted project data to Power BI and Tableau via Dremio",
    ],
  },
  {
    title: "Senior Change Management & Process Excellence Specialist",
    subtitle: "",
    org: "Vanguard | Personal Investor Division",
    dates: "Apr 2021 - Jun 2025",
    description:
      "Embedded across an entire department as the cross-functional transformation lead: department head, five senior managers, line managers, supervisors, and all crew. Designed change strategies, built adoption plans, delivered training programs, and coached leaders to sustain new ways of working. Delivered $6.5M in documented business value.",
    highlights: [
      "Automated a multi-level evaluation and approval workflow using Power Automate, saving 10,465 hours annually ($984K in value). Led the full change management lifecycle, including readiness assessment, training, and adoption reinforcement, across three distinct stakeholder groups",
      "Designed and delivered a two-week Agile onboarding curriculum for an enterprise program team of senior leaders and specialists, covering Agile delivery, Kanban, Jira, roadmaps, ceremonies, and artifacts. Enabled 800,000+ account transitions",
      "Designed and delivered training on change management frameworks, including SATA (studied under its author, Chris Crosby), system adoption methodology, and strategic value workshops. Built Power BI dashboards for capacity, demand, and performance to track outcomes",
      "Led a subdivision-wide transformation initiative improving organizational maturity by 19.8% across demand, capacity, and environment systems",
      "Achieved $4.9 million in annual waste reduction through senior management consulting on Lean methodologies and operational performance improvement",
      "Single-handedly moved the entire CI function from Excel and OneNote to Jira and Confluence without being asked, conducting roadshows, building intake tools with Atlassian APIs, and driving adoption",
    ],
  },
  {
    title: "Operations Manager, Tax & Regulatory Services",
    subtitle: "",
    org: "Vanguard | Retail Regulatory Operations",
    dates: "Feb 2019 - Apr 2021",
    description:
      "Directed 18 specialists with full supervisory authority in a regulated financial services environment. Led concurrent improvement initiatives and introduced data-driven performance management.",
    highlights: [
      "Led two concurrent DMAIC initiatives delivering $476,350 in combined savings and a 13.2% defect reduction, exceeding the target goal",
      "Implemented strategic KPIs and leader standard work achieving $325,220 in annual cost savings through operational realignment and targeted training",
      "Self-taught Power BI and Power Query, building dashboards that elevated data-driven decision making across the management team",
      "Founded a professional development council for department-wide skill building and career advancement",
    ],
  },
  {
    title: "Financial Services Operations Manager",
    subtitle: "",
    org: "Vanguard | Institutional Investment Group",
    dates: "Jul 2015 - Feb 2019",
    description:
      "Led 24 FINRA-licensed representatives in institutional investment services. Drove licensing program excellence, managed complex stakeholder escalations, and built forecasting tools.",
    highlights: [
      "Drove licensing pass rates to department highs of 85% and 98% in consecutive years through structured training delivery and coaching",
      "Built an Excel/VBA forecasting tool for headcount and licensing needs, enabling data-driven resource planning and budget management",
      "Maintained a perfect de-escalation record managing complex client situations. Coached and mentored 24 team members through performance management and career development",
    ],
  },
  {
    title: "Senior Operations Manager, Multi-Location",
    subtitle: "",
    org: "Hertz Car Rentals",
    dates: "Nov 2012 - Jun 2015",
    description:
      "Managed $2.5M+ annual revenue across multiple geographically distributed locations with full P&L responsibility.",
    highlights: [
      "Led cross-functional operations, fleet strategy, resource management, and business partner development across distributed locations",
      "Built forecasting models in Excel for staffing and inventory planning. Led team onboarding, training, and performance management",
    ],
  },
];

export const PROFESSIONAL_PROJECTS: ProfessionalProjectEntry[] = [
  {
    title: "Jira Notifications Hub",
    category: "Power Automate / Copilot Studio",
    description:
      "Built a tiered risk-scoring system for Jira epics: pulls every epic, evaluates how long it's been sitting in its current 'in progress' status, and buckets it into a P70/P80/P90 risk tier using a percentile-based aging model instead of a flat day-count threshold. A Power Automate flow sends weekly digests to three audiences — PMs, senior PMs, and team leads — each framed differently for that audience, plus a separate executive digest for the managing director. A Microsoft Copilot Studio AI agent, loaded with the division's specific coaching methodology, assesses each aging epic and generates the insight included in the digest, applying that methodology to judge why an epic is stuck rather than producing a generic summary.",
    impact: "Tiered risk digest system",
    tags: ["Power Automate", "Jira", "Copilot Studio", "AI Agents"],
    featured: true,
  },
  {
    title: "Project Rhytic Study",
    category: "Dynamics 365 / Copilot Studio",
    description:
      "Built a real-time monitoring layer over Dynamics 365, the system that routes client-booked specialist calls without checking capacity against who's actually available — the only signal a specialist previously got was the event appearing on their Outlook calendar. The system polls every specialist's calendar every 30 minutes during active scheduling hours, compares bookings against staffing requirements and real availability, and proactively flags actual availability breaches — not near-misses — in a recurring leadership digest. A Microsoft Copilot Studio agent running on Claude Sonnet 5 takes breach data and generates scheduling recommendations and proposals for leadership. A separate notification flow proactively alerts specialists the moment a new booking comes through, and a model-driven Power App gives leadership and specialists a live view of department-wide scheduling health.",
    impact: "Real-time scheduling integrity",
    tags: ["Dynamics 365", "Power Automate", "Copilot Studio", "Claude Sonnet 5", "Power Apps"],
    featured: true,
  },
  {
    title: "Agentic Project Launcher",
    category: "AI Architecture",
    description:
      "Designed a multi-agent project delivery system using Power Platform where a single user prompt triggers five sequential AI agents (Project Manager, Scrum Master, Copywriter, Professional Coach, QA Reviewer) that collaboratively build a complete project plan, sprint backlog, communications, and coaching artifacts. All outputs stored in Dataverse with full audit logging.",
    impact: "5-agent AI system",
    tags: ["Copilot Studio", "Power Automate", "Dataverse", "AI Agents"],
    featured: true,
  },
  {
    title: "Enterprise Evaluation Workflow Automation",
    category: "Power Automate",
    description:
      "Replaced a labor-intensive manual evaluation and approval workflow with automated conditional logic, multi-level approvals, and real-time notifications using Power Automate. Processing 4,830+ evaluations monthly.",
    impact: "$984K annual value",
    tags: ["Power Automate", "Change Management", "Process Design"],
    featured: true,
  },
  {
    title: "Claude AI Skills Library",
    category: "AI & Developer Tooling",
    description:
      "Built and manage a GitHub-hosted repository of 50+ Claude AI skills purpose-built for Agile and Lean coaches. A recent organizational innovation to scale AI-assisted coaching.",
    impact: "50+ skills deployed",
    tags: ["Claude Code", "GitHub", "AI Architecture"],
  },
  {
    title: "Enterprise Agile Program Onboarding",
    category: "Agile Coaching / Training Design",
    description:
      "Designed, scaffolded, and delivered a comprehensive two-week Agile, Scrum, and Jira curriculum to onboard an entire enterprise program team into agile delivery. The audience included a full Vanguard office and over a dozen senior leaders and their specialists. Curriculum covered agile principles, Scrum ceremonies, Kanban board design, Jira roadmaps, common clocks, sprint planning, and artifact management. This work directly enabled the successful transition of over 800,000 accounts.",
    impact: "800K+ accounts transitioned",
    tags: ["Jira", "Scrum", "Curriculum Design", "Agile Coaching"],
    featured: true,
  },
  {
    title: "Enterprise Integration Architecture",
    category: "Azure / Forge / Dataverse",
    description:
      "Architected a full enterprise integration pipeline connecting Atlassian Jira to Microsoft Dataverse via Azure AD. Designed OAuth application authentication flow, Forge backend functions for server-side API calls, normalized two-table Dataverse schema, and Graph API write operations. Built to support risk scoring data that feeds Power BI dashboards and Power Apps.",
    impact: "Cross-platform data pipeline",
    tags: ["Azure AD", "Graph API", "Jira Forge", "Dataverse"],
  },
  {
    title: "Cross-Functional Process Discovery and Alignment",
    category: "Facilitation / Process Mapping",
    description:
      "Led a 3-month engagement bridging two non-communicating teams, one technical (developers, IT leadership, CTO officers) and one business-facing, that shared overlapping incident management processes. Single-handedly built comprehensive process maps in Figma and presented them as the single source of truth, using that foundation to build the working relationship between teams. Facilitated collaborative RACI charting, designed async collaboration frameworks, and delivered strategic recommendations for consolidated future-state processes to senior management.",
    impact: "3-month enterprise engagement",
    tags: ["Figma", "Process Mapping", "RACI", "Cross-Functional Facilitation"],
    featured: true,
  },
  {
    title: "Jira Forge Risk Scoring App",
    category: "Custom Development",
    description:
      "Built Jira Forge app integrations to manage risk scoring and impact assessments, extending Jira native capabilities with custom tooling for structured decision making.",
    impact: "Enterprise-wide tooling",
    tags: ["Jira Forge", "JavaScript", "Atlassian"],
  },
  {
    title: "Demand & Capacity Frontier",
    category: "Lean / Power BI",
    description:
      "Transformed how demand and capacity were understood and managed across a subdivision, visualizing operational maturity and empowering leaders with actionable data to drive informed resource decisions.",
    impact: "19.8% maturity improvement",
    tags: ["Power BI", "Kanban", "Lean Systems"],
  },
  {
    title: "Enterprise Agile Transition Program",
    category: "Agile Coaching",
    description:
      "Orchestrated end-to-end Agile and Scrum training for a major enterprise platform transition, developing comprehensive Jira training and project boards that enabled the migration of 800,000+ accounts.",
    impact: "800K+ accounts transitioned",
    tags: ["Jira", "Scrum", "Training Design"],
  },
  {
    title: "Agile Practice Data Lakes",
    category: "Data & Analytics",
    description:
      "Self-taught SQL and built Tableau and Tableau Prep Flows pipelines to manage massive operational data lakes used for coaching and performance insights across the practice.",
    impact: "Practice-wide analytics",
    tags: ["SQL", "Tableau", "Data Engineering"],
  },
  {
    title: "Personal Budget Tracking App",
    category: "Full-Stack Development",
    description:
      "Built and shipped a personal finance web app from scratch using vanilla JavaScript, Chart.js, and localStorage. Features include income/expense projection, debt payoff visualization, and a guided onboarding wizard. Subsequently designed a v4.0 React/Zustand redesign with a cyber-neumorphism dark theme, phased build plan, and full JSON round-trip data compatibility.",
    impact: "Shipped to GitHub",
    tags: ["React", "Zustand", "Chart.js", "Claude Code"],
  },
  {
    title: "Financial Process Mapping & Compliance",
    category: "Process Optimization",
    description:
      "Transformed a complex bank attestation process into a clear, actionable framework through stakeholder collaboration and facilitation. Transitioned from consultant to project lead, conducted discovery with senior leaders, led a four-hour collaborative mapping session, and delivered a comprehensive Visio process map with strategic recommendations that earned recognition from regulatory bodies.",
    impact: "Regulatory recognition",
    tags: ["Process Mapping", "Visio", "MURAL", "Compliance"],
  },
  {
    title: "Scientific Method for System Adoption",
    category: "Change Management",
    description:
      "Combined the Scientific Method with human-centered design to create a structured brainstorming model that tackled low system adoption rates. Led iterative development of the model, transitioned it to MS Whiteboard for digital collaboration, and executed an organization-wide observation blitz that validated hypotheses and generated actionable adoption strategies.",
    impact: "Division-wide adoption improvement",
    tags: ["Scientific Method", "Human-Centered Design", "MS Whiteboard"],
  },
  {
    title: "Strategic Value Proposition Development",
    category: "Facilitation",
    description:
      "Designed and facilitated a MURAL-based workshop to help a senior leader and her team in Brokerage and Investments craft a compelling value proposition. Opened with Simon Sinek's Start With Why framework, guided the team through structured brainstorming, and delivered a standardized template that unified diverse perspectives into a shared strategic vision.",
    impact: "Leadership alignment achieved",
    tags: ["MURAL", "Simon Sinek", "Workshop Design", "Facilitation"],
  },
  {
    title: "SATA Change Management Framework Training",
    category: "Training Design",
    description:
      "Designed and delivered a training program introducing the SATA (Sponsor, Advocate, Target, Agent) change management framework to peers and leaders. Drew from direct academic study with the model's author, Chris Crosby, and translated the framework from theory into practical organizational application, positioning it as a complement to existing models like RACI.",
    impact: "Org-wide training delivered",
    tags: ["SATA Framework", "Instructional Design", "Change Management"],
  },
  {
    title: "Process Owner Library Automation",
    category: "Power Automate",
    description:
      "Automated the management of critical contact data for process and product owners, eliminating manual tracking and ensuring real-time accuracy. Built change alert notifications so stakeholders were immediately informed of updates, supporting both day-to-day operational efficiency and crisis readiness across the organization.",
    impact: "Real-time accuracy achieved",
    tags: ["Power Automate", "SharePoint", "Data Automation"],
  },
];

export const COMMUNITY: ProfessionalCommunityEntry[] = [
  {
    title: "ABLE CRG - Arizona Site Lead / Enterprise Operations",
    org: "Vanguard",
    dates: "2023 - Present",
    description:
      'Planned and executed the "ABLE Summit: Empowering All Abilities," a global event emphasizing accessibility and empowerment. Led cross-departmental teams and collaborated with the Managing Director and Chief Diversity Officer.',
  },
  {
    title: "Girls JV Flag Football Head Coach",
    org: "Sandra Day O'Connor High School",
    dates: "2025 - Present",
    description:
      "Building culture, developing athletic confidence, and creating an inclusive competitive environment for student-athletes.",
  },
  {
    title: "Community Digital Engagement Volunteer",
    org: "SDO Wrestling",
    dates: "2022 - Present",
    description:
      "Manage websites, online storefronts, digital marketing, and fundraising campaigns for the school wrestling program and club team.",
  },
  {
    title: "Career Coach and Mentor",
    org: "Vanguard AZ Career Development",
    dates: "2017 - Present",
    description:
      "Leadership coaching, interview preparation, networking strategy, and career growth guidance for participants across the organization.",
  },
];

export const TOOLS: ProfessionalToolGroup[] = [
  { category: "AI Platforms", items: ["Claude Code (Anthropic)", "Google AI Studio", "Gemini CLI", "Antigravity CLI", "Microsoft Copilot", "Copilot Studio", "Atlassian Rovo", "AI Prompt Engineering", "Multi-Agent System Design"] },
  { category: "Automation & Platform", items: ["Power Automate", "Power Apps", "Copilot Studio", "Dataverse", "Azure AD", "Microsoft Graph API", "PAC CLI", "SharePoint"] },
  { category: "Development", items: ["React", "Vite", "Next.js", "Kotlin (Android)", "Tailwind CSS", "JavaScript", "Jira Forge", "GitHub", "Vercel"] },
  { category: "Data & Analytics", items: ["Tableau", "Tableau Prep Flows", "SQL", "Power BI", "Power Query", "Excel (Advanced)", "VBA", "Python", "Minitab"] },
  { category: "Design & Facilitation", items: ["Figma", "FigJam", "MURAL", "MIRO", "Microsoft Whiteboard", "Visio", "Adobe Creative Suite"] },
  { category: "Project & Delivery", items: ["Jira (Admin, Kanban, Scrum, Roadmaps, Forge, Rovo)", "Confluence", "ActionableAgile"] },
];

// Not currently rendered — About shows the /professional/certs.png strip
// instead, matching myportfolio's own (pre-existing) behavior. Ported as-is
// for parity, not fixed here.
export const CERTS: string[] = [
  "Copilot Champion",
  "PL-900 (Microsoft)",
  "PSM (Scrum.org)",
  "PSPO (Scrum.org)",
  "PSK (Scrum.org)",
  "SPS (Scrum.org)",
  "CSSGB (ASQ)",
  "LUMA Facilitator",
];
