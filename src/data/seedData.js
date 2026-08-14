// ==========================================================================
// ARYAN NEUPANE — PORTFOLIO DATA SEED & SOURCE OF TRUTH
// ==========================================================================

export const PERSONAL_PROFILE = {
  name: "Aryan Neupane",
  title: "Cybersecurity & GRC",
  tagline: "Observing | Absorbing | Outgrowing",
  bio: "Cybersecurity professional with a strong technical foundation in vulnerability assessment, log analysis, and practical security testing, paired with hands-on apprenticeship experience in enterprise GRC frameworks (ISO/IEC 27001:2022 & NIST CSF 2.0). Focused on bridging the gap between technical security controls and executive risk management.",
  education: {
    degree: "Bachelor of Information Management (BIM)",
    institution: "Tribhuvan University",
    location: "Nepal",
    status: "Ongoing Studies"
  },
  emails: [
    "contact@aryanneupane.com.np"
  ],
  socialLinks: {
    github: "https://github.com/AryanNeupane",
    linkedin: "https://linkedin.com/in/aryanneupane",
    twitter: "https://x.com/aryanneupane",
    substack: "https://aryanneupane.substack.com"
  },
  certifications: [
    {
      id: "isc2-cc",
      title: "ISC2 Certified in Cybersecurity (CC)",
      issuer: "ISC2",
      status: "Exam Passed",
      badge: "CC",
      verified: true,
      description: "Fundamental cybersecurity principles, network security, access controls, incident response, and risk management concepts."
    },
    {
      id: "cisco-jr-analyst",
      title: "Junior Cybersecurity Analyst",
      issuer: "Cisco Networking Academy",
      status: "Completed Learning Path",
      badge: "Cisco",
      verified: true,
      description: "Threat intelligence, network monitoring, security operations, and baseline vulnerability management."
    },
    {
      id: "soc-lvl-1",
      title: "SOC Level 1 Learning Path",
      issuer: "TryHackMe / Hands-on Labs",
      status: "Completed Learning Path",
      badge: "SOC L1",
      verified: true,
      description: "Security Operations Center fundamentals, Splunk log analysis, threat hunting, and event investigation."
    }
  ],
  experience: [
    {
      role: "GRC Apprenticeship & Mentorship",
      organization: "Mentored by Sandeep Sharma (CTO, Synthbit Technologies)",
      period: "Practical Learning / Mentorship",
      type: "Mentorship & Practical Exposure",
      description: "Hands-on mentorship focused on enterprise GRC implementation, risk assessment methodologies, control mapping, Statement of Applicability (SoA) creation, and executive reporting across ISO/IEC 27001:2022 and NIST CSF 2.0.",
      highlights: [
        "Structured end-to-end ISMS assessment for simulated enterprise environment",
        "Developed Risk Registers, Statement of Applicability, and Control Implementation Trackers",
        "Mapped technical security controls to ISO 27001 Annex A controls & NIST CSF 2.0 Subcategories",
        "Authored executive governance reports and continual improvement registers"
      ]
    },
    {
      role: "Cybersecurity Intern",
      organization: "Synthbit Technologies",
      location: "Butwal, Nepal",
      period: "Internship",
      type: "Internship",
      description: "Participated in technical security testing, web application assessment fundamentals, vulnerability identifying, and security research in controlled environments.",
      highlights: [
        "Executed web application security assessment against controlled test targets",
        "Identified baseline vulnerabilities and documented remediation steps",
        "Assisted in technical documentation and internal security policy reviews"
      ]
    }
  ],
  technicalSkills: [
    { category: "GRC & Governance", skills: ["ISO/IEC 27001:2022", "NIST CSF 2.0", "Risk Assessment", "Statement of Applicability (SoA)", "Control Ownership Matrix", "Executive Reporting", "CAPA / Continual Improvement"] },
    { category: "Security Operations", skills: ["Splunk", "Log Analysis", "Event Investigation", "SOC Fundamentals", "Detection Analysis"] },
    { category: "Vulnerability & Security Testing", skills: ["Web Application Security", "Vulnerability Assessment", "TryHackMe (40+ Rooms)", "DVWA Security Practice", "Linux", "Python", "Git/GitHub"] }
  ]
};

export const SEED_PROJECTS = [
  {
    id: "vertexone-enterprise-grc-assessment",
    title: "VertexOne Digital Services — Enterprise GRC Assessment",
    slug: "vertexone-enterprise-grc-assessment",
    isCapstone: true,
    featured: true,
    published: true,
    category: "Enterprise GRC Assessment (Simulated Capstone)",
    summary: "Comprehensive enterprise GRC capstone simulating an ISO/IEC 27001:2022 ISMS implementation and NIST Cybersecurity Framework (CSF) 2.0 assessment for a modern cloud digital services enterprise.",
    businessContext: "VertexOne Digital Services is a simulated high-growth cloud platform provider operating under strict regulatory expectations and customer compliance requirements. The assessment evaluates organizational risk posture, establishes governance policies, and aligns security controls with ISO 27001:2022 and NIST CSF 2.0 standards.",
    objective: "Establish a fully documented, audit-ready Information Security Management System (ISMS) framework and executive governance reporting baseline.",
    scope: "Covers cloud infrastructure operations, client data handling, software development lifecycle (SDLC), employee endpoint security, and third-party vendor management.",
    methodology: "Phased implementation methodology: (1) Scope Definition & Asset Identification -> (2) Risk Assessment & Impact Scoring -> (3) Statement of Applicability (SoA) & Control Selection -> (4) Implementation Tracking & Ownership Assignment -> (5) Executive Governance Reporting & Continual Improvement Plan.",
    frameworks: ["ISO/IEC 27001:2022", "NIST Cybersecurity Framework (CSF) 2.0"],
    controls: ["Annex A.5 Organizational Controls", "Annex A.6 People Controls", "Annex A.7 Physical Controls", "Annex A.8 Technological Controls", "NIST CSF Identify, Protect, Detect, Respond, Recover"],
    risks: [
      "Unsanitized third-party vendor access leading to potential credential compromise",
      "Inadequate database backup encryption resulting in data privacy exposure",
      "Lack of centralized patch management for developer endpoints"
    ],
    findings: [
      "Overall ISO 27001 Annex A control coverage stands at 78% fully implemented, 16% in progress, and 6% planned.",
      "Primary residual risk concentrated in vendor third-party monitoring (A.5.19 - A.5.22).",
      "NIST CSF 2.0 maturity score averaged 3.2 / 4.0 across functions."
    ],
    recommendations: [
      "Implement automated SAML/SSO enforcement for all external contractor access.",
      "Enforce mandatory periodic access reviews every 90 days for core databases.",
      "Integrate Splunk automated log ingestion for detection function enhancement."
    ],
    deliverables: [
      "ISMS Scope Statement",
      "Enterprise Risk Register",
      "Asset Inventory & Classification",
      "Statement of Applicability (SoA)",
      "Annex A Control Inventory",
      "Control Ownership Matrix",
      "Control Implementation Tracker",
      "Risk Treatment Plan",
      "ISO 27001 Implementation Roadmap",
      "NIST CSF Assessment",
      "NIST CSF Executive Dashboard",
      "Executive Control Dashboard",
      "Continual Improvement Register",
      "GRC Executive Summary Report"
    ],
    technologies: ["Excel GRC Trackers", "Markdown Security Policies", "Python Analysis Scripts", "Splunk Log Models"],
    githubUrl: "https://github.com/AryanNeupane/VertexOne-GRC-Assessment",
    documentationUrl: "https://github.com/AryanNeupane/VertexOne-GRC-Assessment/blob/main/README.md",
    createdAt: "2026-02-15",
    updatedAt: "2026-08-10",
    
    // Detailed Artifact Data for Interactive Viewer
    artifactData: {
      ismsScope: {
        title: "ISMS Scope Statement",
        boundary: "All production cloud infrastructure hosted on AWS us-east-1, software development environments, enterprise SaaS data pipelines, customer management portals, and corporate endpoint devices.",
        exclusions: "Legacy physical on-premises hardware (decommissioned Q1 2026).",
        keyObjectives: [
          "Ensure 99.9% availability of core digital services",
          "Protect customer PII and sensitive transactional assets",
          "Maintain compliance readiness for ISO/IEC 27001:2022 certification audit"
        ]
      },
      riskRegister: [
        { riskId: "RSK-001", asset: "Customer Database", threat: "Unauthorized Access / SQL Injection", likelihood: 3, impact: 5, riskScore: 15, riskRating: "High", riskOwner: "Lead Data Engineer", mitigation: "Enforce Parameterized Queries, TLS 1.3 in transit, and DB Audit Logging", status: "Mitigated" },
        { riskId: "RSK-002", asset: "Developer Endpoints", threat: "Malware / Ransomware Infection", likelihood: 3, impact: 4, riskScore: 12, riskRating: "Medium", riskOwner: "IT Operations Manager", mitigation: "Deploy EDR agent, disable local admin rights, enforce bi-weekly OS updates", status: "In Progress" },
        { riskId: "RSK-003", asset: "Cloud API Gateway", threat: "Distributed Denial of Service (DDoS)", likelihood: 2, impact: 4, riskScore: 8, riskRating: "Medium", riskOwner: "Infrastructure Lead", mitigation: "Cloudflare WAF rate limiting and AWS Shield protection", status: "Implemented" },
        { riskId: "RSK-004", asset: "Third-Party SaaS Integrations", threat: "Supply Chain Compromise", likelihood: 4, impact: 4, riskScore: 16, riskRating: "High", riskOwner: "GRC Specialist", mitigation: "Implement Third-Party Risk Management (TPRM) questionnaire & annual SOC 2 review", status: "In Progress" }
      ],
      statementOfApplicability: [
        { controlId: "A.5.1", controlName: "Policies for information security", status: "Included", justification: "Essential for establishing top-management direction and security alignment across enterprise operations." },
        { controlId: "A.5.15", controlName: "Access control", status: "Included", justification: "Mandatory requirement to restrict logical and physical access to sensitive systems." },
        { controlId: "A.5.19", controlName: "Information security in supplier relationships", status: "Included", justification: "High reliance on third-party SaaS vendors and cloud partners." },
        { controlId: "A.7.1", controlName: "Physical security perimeter", status: "Excluded", justification: "VertexOne operates a 100% remote cloud environment with zero physical server rooms." },
        { controlId: "A.8.7", controlName: "Protection against malware", status: "Included", justification: "Critical to prevent endpoint compromise across remote engineering workforce." },
        { controlId: "A.8.16", controlName: "Monitoring activities", status: "Included", justification: "Required to detect anomalous user behavior and unauthorized access attempts." }
      ],
      controlOwnership: [
        { controlDomain: "A.5 Organizational Controls", ownerRole: "Chief Technology Officer / GRC Lead", reviewFrequency: "Quarterly" },
        { controlDomain: "A.6 People Controls", ownerRole: "HR Operations Lead", reviewFrequency: "Bi-Annually" },
        { controlDomain: "A.7 Physical Controls", ownerRole: "Facilities Lead (N/A Remote)", reviewFrequency: "Annually" },
        { controlDomain: "A.8 Technological Controls", ownerRole: "DevSecOps Lead / Infrastructure Team", reviewFrequency: "Monthly" }
      ],
      nistCsfDashboard: [
        { function: "GOVERN (GV)", category: "Organizational Context, Risk Strategy", status: "Established", maturity: 3.5 },
        { function: "IDENTIFY (ID)", category: "Asset Management, Risk Assessment", status: "Established", maturity: 3.8 },
        { function: "PROTECT (PR)", category: "Access Control, Data Security", status: "Optimizing", maturity: 3.4 },
        { function: "DETECT (DE)", category: "Continuous Monitoring, Adverse Events", status: "Developing", maturity: 2.8 },
        { function: "RESPOND (RS)", category: "Incident Management, Analysis", status: "Established", maturity: 3.2 },
        { function: "RECOVER (RC)", category: "Restoration, Lessons Learned", status: "Established", maturity: 3.0 }
      ],
      artifactCatalog: [
        { id: "ismsScope", category: "GOVERNANCE", title: "ISMS Scope Statement", purpose: "Defines ISMS boundaries, exclusions, and strategic security objectives.", framework: "ISO/IEC 27001:2022 Clause 4.3", type: "Governance Document", description: "Organizational and technical boundary definition for the simulated VertexOne ISMS.", viewable: true },
        { id: "riskRegister", category: "RISK", title: "Enterprise Risk Register", purpose: "Documents identified risks with likelihood, impact, ownership, and treatment status.", framework: "ISO/IEC 27001:2022 Clause 6.1", type: "Risk Register", description: "Structured risk entries evaluated using a 5×5 likelihood × impact matrix.", viewable: true },
        { id: "assetInventory", category: "RISK", title: "Asset Inventory & Classification", purpose: "Catalogues information assets and assigns classification levels.", framework: "ISO/IEC 27001:2022 Annex A.5.9", type: "Asset Register", description: "Inventory of cloud infrastructure, data pipelines, endpoints, and SaaS integrations.", viewable: false },
        { id: "riskTreatment", category: "RISK", title: "Risk Treatment Plan", purpose: "Maps risk treatment decisions to controls and accountable owners.", framework: "ISO/IEC 27001:2022 Clause 6.1.3", type: "Treatment Plan", description: "Mitigate, transfer, accept, or avoid decisions for prioritized enterprise risks.", viewable: false },
        { id: "annexAInventory", category: "CONTROLS", title: "Annex A Control Inventory", purpose: "Complete catalog of ISO 27001:2022 Annex A controls with implementation status.", framework: "ISO/IEC 27001:2022 Annex A", type: "Control Inventory", description: "93 Annex A controls tracked with implementation and evidence references.", viewable: false },
        { id: "controlOwnership", category: "CONTROLS", title: "Control Ownership Matrix", purpose: "Assigns accountable roles and review cadence for each control domain.", framework: "ISO/IEC 27001:2022", type: "Ownership Matrix", description: "Domain-level ownership across organizational, people, physical, and technological controls.", viewable: true },
        { id: "controlTracker", category: "CONTROLS", title: "Control Implementation Tracker", purpose: "Tracks control implementation progress, evidence, and target dates.", framework: "ISO/IEC 27001:2022", type: "Implementation Tracker", description: "Operational tracker for 78% implemented, 16% in progress, 6% planned controls.", viewable: false },
        { id: "soa", category: "CONTROLS", title: "Statement of Applicability (SoA)", purpose: "Documents control inclusion/exclusion decisions with justifications.", framework: "ISO/IEC 27001:2022 Clause 6.1.3 d)", type: "SoA", description: "Applicability decisions for Annex A controls with exclusion rationale.", viewable: true },
        { id: "nistAssessment", category: "ASSESSMENT", title: "NIST CSF Assessment", purpose: "Evaluates maturity across NIST CSF 2.0 functions and categories.", framework: "NIST CSF 2.0", type: "Framework Assessment", description: "Structured assessment across Govern, Identify, Protect, Detect, Respond, Recover.", viewable: true },
        { id: "nistDashboard", category: "ASSESSMENT", title: "NIST CSF Executive Dashboard", purpose: "Executive visualization of CSF function maturity and gaps.", framework: "NIST CSF 2.0", type: "Executive Dashboard", description: "Average maturity score of 3.2/4.0 across CSF functions.", viewable: true },
        { id: "controlDashboard", category: "ASSESSMENT", title: "Executive Control Dashboard", purpose: "Summarizes ISO 27001 control coverage for leadership reporting.", framework: "ISO/IEC 27001:2022", type: "Executive Dashboard", description: "Control implementation coverage and residual risk concentration summary.", viewable: false },
        { id: "continualImprovement", category: "CONTINUAL_IMPROVEMENT", title: "Continual Improvement Register", purpose: "Tracks CAPA items, audit findings, and management review actions.", framework: "ISO/IEC 27001:2022 Clause 10", type: "CAPA Register", description: "Corrective and preventive actions from quarterly audit cycles.", viewable: true },
        { id: "grcSummary", category: "ASSESSMENT", title: "GRC Executive Summary", purpose: "Consolidated executive report of assessment findings and recommendations.", framework: "ISO/IEC 27001:2022 & NIST CSF 2.0", type: "Executive Report", description: "High-level summary of risk posture, control gaps, and improvement priorities.", viewable: false },
        { id: "implementationRoadmap", category: "GOVERNANCE", title: "ISO 27001 Implementation Roadmap", purpose: "Phased plan for ISMS implementation and certification readiness.", framework: "ISO/IEC 27001:2022", type: "Roadmap", description: "Multi-phase implementation timeline from scope definition through audit readiness.", viewable: false }
      ]
    }
  },
  {
    id: "splunk-soc-home-lab",
    title: "SOC Operations & Splunk Threat Detection Lab",
    slug: "splunk-soc-home-lab",
    isCapstone: false,
    featured: true,
    published: true,
    category: "Security Operations & Detection",
    summary: "Hands-on SOC home lab environment configured to ingest windows event logs, web server access logs, and network traffic into Splunk Enterprise for threat detection and alert generation.",
    businessContext: "Simulates a security operations center environment analyzing attack telemetry, lateral movement, brute force attempts, and log anomalies.",
    objective: "Master Splunk Search Processing Language (SPL), create custom detection dashboards, and perform root-cause incident analysis.",
    scope: "Windows Server AD logs, Sysmon events, Apache access logs, and PfSense firewall logs.",
    methodology: "Attack Simulation -> Log Ingestion -> SPL Query Authoring -> Alert Thresholding -> Dashboard Visualization.",
    frameworks: ["MITRE ATT&CK Framework"],
    controls: ["Continuous Log Monitoring", "Incident Response Investigation"],
    risks: ["Undetected Credential Stuffing", "Privilege Escalation via PowerShell"],
    findings: ["Successfully detected SSH/RDP brute force patterns within 15 seconds of threshold breach."],
    recommendations: ["Tune SPL alert thresholds to minimize false positive noise by 40%."],
    deliverables: ["Splunk Query Library", "Threat Detection Dashboard", "Incident Investigation Log"],
    technologies: ["Splunk Enterprise", "Sysmon", "Windows Event Viewer", "Linux", "PowerShell"],
    githubUrl: "https://github.com/AryanNeupane/SOC-Splunk-Lab",
    createdAt: "2025-11-10",
    updatedAt: "2026-01-20"
  },
  {
    id: "web-app-security-dvwa-assessment",
    title: "Controlled Web Application Vulnerability Assessment",
    slug: "web-app-security-dvwa-assessment",
    isCapstone: false,
    featured: false,
    published: true,
    category: "Vulnerability Assessment",
    summary: "Controlled vulnerability assessment executed against Damn Vulnerable Web Application (DVWA) to evaluate OWASP Top 10 vulnerabilities including SQL Injection, Cross-Site Scripting (XSS), and Command Injection.",
    businessContext: "Educational security research in controlled lab environment to understand exploit mechanics and recommend developer remediation.",
    objective: "Demonstrate practical understanding of web application vulnerabilities and remediation strategies.",
    scope: "DVWA local lab target configured at Low, Medium, and High security levels.",
    methodology: "Black-box reconnaissance -> Vulnerability Identification -> Manual Proof-of-Concept Exploit -> Remediation Report Authoring.",
    frameworks: ["OWASP Top 10 2021"],
    controls: ["Input Validation", "Parameterized Queries", "Content Security Policy (CSP)"],
    risks: ["SQL Injection leading to database dump", "Stored XSS session hijacking"],
    findings: ["Identified un-sanitized user input parameters allowing Reflected XSS and Error-based SQLi."],
    recommendations: ["Enforce strict input sanitization, HTML entity encoding, and prepared statements."],
    deliverables: ["Web Security Assessment Report", "Vulnerability Remediation Matrix"],
    technologies: ["Burp Suite Community", "OWASP ZAP", "Python", "DVWA Lab"],
    createdAt: "2025-08-15",
    updatedAt: "2025-09-01"
  }
];

export const SEED_BLOG_POSTS = [
  {
    id: "structuring-enterprise-risk-register-iso-27001",
    title: "Structuring an Enterprise Risk Register: Practical ISO 27001 Implementation",
    slug: "structuring-enterprise-risk-register-iso-27001",
    featured: true,
    published: true,
    category: "GRC & ISO 27001",
    tags: ["ISO 27001", "Risk Register", "Risk Management", "GRC"],
    excerpt: "A practical guide to building an audit-ready ISO/IEC 27001:2022 Risk Register, calculating risk scores, and assigning actionable control ownership.",
    readingTime: "6 min read",
    seoTitle: "Structuring an ISO 27001 Risk Register | Aryan Neupane",
    seoDescription: "Step-by-step methodology for structuring an ISO/IEC 27001 risk register with threat modeling, likelihood scoring, and control ownership.",
    publishedAt: "2026-04-12",
    updatedAt: "2026-04-12",
    content: `
### Introduction

In ISO/IEC 27001:2022 implementation, the Risk Register serves as the central bridge between technical vulnerabilities and organizational risk treatment. A poorly structured risk register often results in unassigned control responsibilities and audit non-conformities.

### Core Components of an Effective Risk Register

When building an enterprise risk register, every risk entry must capture five fundamental dimensions:

1. **Asset Identification**: Explicitly listing the hardware, software, data, or human asset involved.
2. **Threat & Vulnerability Pair**: Defining the threat scenario (e.g., unauthorized access) and the underlying vulnerability (e.g., missing multi-factor authentication).
3. **Likelihood & Impact Scoring**: Utilizing a standardized 5x5 matrix to calculate pre-mitigation and post-mitigation risk scores.
4. **Risk Treatment Option**: Deciding whether to Mitigate, Transfer, Avoid, or Accept the risk.
5. **Control Mapping & Ownership**: Linking specific Annex A controls (e.g., A.5.15 Access Control) and assigning a named job role as the accountable owner.

### Lessons Learned from Capstone Implementation

During the VertexOne Enterprise GRC project, one key lesson was that risk registers should avoid generic bullet points. Instead of stating *"Database could fail"*, the risk scenario should specify *"Unauthorized SQL injection attempt against the client API endpoint leading to customer PII exfiltration"*. This clarity allows engineers and auditors to evaluate the precise technical control required.
`
  },
  {
    id: "nist-csf-2-vs-iso-27001-2022",
    title: "NIST CSF 2.0 vs ISO/IEC 27001:2022: Complementary Frameworks for Security Governance",
    slug: "nist-csf-2-vs-iso-27001-2022",
    featured: true,
    published: true,
    category: "Security Governance",
    tags: ["NIST CSF", "ISO 27001", "Governance", "Frameworks"],
    excerpt: "Exploring how organizations can leverage NIST CSF 2.0's operational functions alongside ISO 27001's management system structure to achieve comprehensive compliance.",
    readingTime: "5 min read",
    seoTitle: "NIST CSF 2.0 vs ISO 27001:2022 | Aryan Neupane",
    seoDescription: "Comparing NIST CSF 2.0 and ISO/IEC 27001:2022 frameworks and demonstrating how to cross-map their security controls.",
    publishedAt: "2026-05-20",
    updatedAt: "2026-05-20",
    content: `
### Framework Overview

Cybersecurity professionals often debate whether to adopt NIST CSF 2.0 or ISO/IEC 27001:2022. In practice, the two frameworks excel at different aspects of security governance and work best when integrated.

* **ISO/IEC 27001:2022**: Provides the formal management system requirements (Clauses 4-10) and a comprehensive Annex A control catalog. It is ideal for formal third-party certification and audit compliance.
* **NIST CSF 2.0**: Focuses on six core operational functions — **GOVERN, IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER**. It provides an intuitive language for communicating security posture to executive boards and non-technical stakeholders.

### Cross-Mapping Controls for Executive Clarity

By mapping ISO 27001 Annex A controls directly to NIST CSF Subcategories, security teams can maintain ISO compliance while reporting operational maturity using NIST CSF radar charts. For instance, Annex A.8.16 (Monitoring Activities) maps directly to NIST CSF DETECT (DE.CM - Continuous Monitoring).
`
  },
  {
    id: "building-soc-lab-splunk-log-analysis",
    title: "Building a SOC Home Lab: From Log Analysis to Threat Detection with Splunk",
    slug: "building-soc-lab-splunk-log-analysis",
    featured: false,
    published: true,
    category: "SOC & Security Operations",
    tags: ["Splunk", "SOC", "Log Analysis", "Labs", "Threat Detection"],
    excerpt: "A practical guide to setting up a local SOC telemetry laboratory using Splunk Enterprise, Sysmon, and simulated attack traffic.",
    readingTime: "7 min read",
    seoTitle: "Building a SOC Home Lab with Splunk | Aryan Neupane",
    seoDescription: "Tutorial on setting up a SOC home lab with Splunk, Sysmon log collection, and SPL query development.",
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-05",
    content: `
### Hands-on Telemetry Generation

Understanding cybersecurity governance requires firsthand knowledge of how technical logs look when an attack occurs. Building a SOC home lab provides crucial visibility into event logs, privilege escalation alerts, and brute-force indicators.

### Key Telemetry Sources Configured

1. **Windows Event Logs (Security & System)**: Ingesting Event ID 4624 (Successful Logon), 4625 (Failed Logon), and 4672 (Special Privileges Assigned).
2. **Sysmon (System Monitor)**: Ingesting Event ID 1 (Process Creation) to inspect command-line arguments.
3. **Web Server Logs**: Analyzing HTTP status codes (404, 500, 403) for automated scanner activity.
`
  }
];

export const SEED_CERTIFICATIONS = [
  {
    id: "soc-lvl-1-thm",
    title: "SOC Level 1 Certificate",
    issuer: "TryHackMe",
    issued: "May 2026",
    expires: "May 2029",
    credentialId: "THM-UFWN7SISSE",
    skills: ["Splunk", "SIEM"],
    verificationUrl: "https://tryhackme.com/certificate/THM-UFWN7SISSE",
    featured: true
  },
  {
    id: "cisco-cyber-defense",
    title: "Cybersecurity Defense Analyst Career Path",
    issuer: "Cisco",
    issued: "2026",
    expires: "",
    credentialId: "de7f35c3-0b1e-4028-9e97-253131523cb8",
    skills: ["Splunk"],
    verificationUrl: "",
    featured: true
  },
  {
    id: "tata-cyber-forage",
    title: "Tata - Cybersecurity Analyst Job Simulation",
    issuer: "Forage",
    issued: "April 2026",
    expires: "",
    credentialId: "ddzyBasfWM9MGZJgY",
    skills: ["Cybersecurity"],
    verificationUrl: "",
    featured: false
  },
  {
    id: "qualys-compliance",
    title: "Compliance Foundations",
    issuer: "Qualys",
    issued: "April 2026",
    expires: "",
    credentialId: "",
    skills: ["Compliance"],
    verificationUrl: "",
    featured: false
  },
  {
    id: "qualys-vuln-mgmt",
    title: "Vulnerability Management Foundations",
    issuer: "Qualys",
    issued: "April 2026",
    expires: "",
    credentialId: "",
    skills: ["Vulnerability Management"],
    verificationUrl: "",
    featured: false
  },
  {
    id: "simplilearn-cissp-intro",
    title: "Introduction to CISSP Security Assessment & Testing and Security Operations",
    issuer: "Simplilearn",
    issued: "March 2026",
    expires: "",
    credentialId: "9970413",
    skills: ["Security Assessment", "Security Operations"],
    verificationUrl: "",
    featured: false
  },
  {
    id: "cisco-jr-cyber",
    title: "Junior Cybersecurity Analyst Career Path",
    issuer: "Cisco",
    issued: "March 2026",
    expires: "",
    credentialId: "74d12366-0c28-4a59-b582-d4cb8715642d",
    skills: ["Linux", "Firewalls", "Networking"],
    verificationUrl: "",
    featured: true
  }
];
