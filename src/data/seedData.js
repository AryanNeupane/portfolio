// ==========================================================================
// ARYAN NEUPANE — PORTFOLIO CONTENT
//
// Source of truth: Aryan_Neupane_Junior_GRC_Analyst_Resume.pdf (repository root)
// and the public GitHub repositories linked from each entry.
// Nothing here may be embellished beyond those two sources.
// ==========================================================================

export const RESUME_PATH = '/resume/Aryan-Neupane-Resume.pdf';

export const PERSONAL_PROFILE = {
  name: 'Aryan Neupane',
  title: 'Cybersecurity & GRC',
  positioning:
    'Building practical governance, risk and compliance work backed by hands-on security testing.',
  bio: 'Early-career GRC analyst working across ISO/IEC 27001:2022 and NIST CSF 2.0 — risk registers, control documentation, control testing and evidence tracking — with a technical foundation in web application security testing and vulnerability assessment.',
  location: 'Kathmandu, Nepal',
  education: {
    degree: 'Bachelor of Information Management (BIM)',
    institution: 'Tribhuvan University — Oxford College, Butwal',
    location: 'Nepal',
    status: 'Expected graduation November 2026',
  },
  emails: ['official.aryanneupane@gmail.com', 'contact@aryanneupane.com.np'],
  socialLinks: {
    github: 'https://github.com/AryanNeupane',
    linkedin: 'https://www.linkedin.com/in/aryanneupane',
    tryhackme: 'https://tryhackme.com/p/aryanneupane',
  },

  // Verbatim status wording from the resume — do not upgrade these.
  certifications: [
    {
      id: 'isc2-cc',
      title: 'ISC2 Certified in Cybersecurity (CC)',
      issuer: 'ISC2',
      status: 'Exam passed — certification pending',
      description:
        'Security principles, business continuity, access control, network security and security operations fundamentals.',
    },
    {
      id: 'qualys-vmf',
      title: 'Vulnerability Management Foundations',
      issuer: 'Qualys',
      status: 'Issued April 2026',
      description:
        'Vulnerability management lifecycle: asset scoping, scanning, prioritisation and remediation tracking.',
    },
    {
      id: 'cisco-jr-analyst',
      title: 'Junior Cybersecurity Analyst Career Path',
      issuer: 'Cisco Networking Academy',
      status: 'Issued March 2026',
      description:
        'Threat landscape, network defence, endpoint security, and security monitoring fundamentals.',
    },
    {
      id: 'simplilearn-cissp-intro',
      title: 'Introduction to CISSP Security Assessment & Testing and Security Operations',
      issuer: 'Simplilearn',
      status: 'Issued March 2026',
      description:
        'Security assessment and testing concepts, and security operations domain fundamentals.',
    },
  ],

  experience: [
    {
      role: 'GRC Apprentice',
      organization: 'Synthbit Technologies',
      location: 'On-site',
      period: 'Jul 2026 – Aug 2026',
      type: 'Apprenticeship',
      mentor: 'Mentored by Sandeep Sharma, CTO, Synthbit Technologies',
      description:
        'Applied ISO/IEC 27001:2022 and NIST CSF 2.0 concepts to practical GRC scenarios, mapping framework requirements to control and risk documentation.',
      highlights: [
        'Developed and maintained risk registers, control registers, and control ownership matrices supporting risk treatment planning',
        'Performed control testing, evidence tracking and gap identification to assess control effectiveness',
        'Supported internal audit documentation, including audit findings, corrective actions and continual improvement records',
        'Built framework mappings and executive-level GRC reporting connecting risks, controls, evidence and remediation status',
      ],
    },
    {
      role: 'Cybersecurity Intern',
      organization: 'Synthbit Technologies',
      location: 'Butwal, Lumbini, Nepal',
      period: 'May 2026 – Jul 2026',
      type: 'Internship',
      description:
        'Performed web application security testing and vulnerability assessment in controlled lab environments.',
      highlights: [
        'Conducted basic penetration testing to identify and validate common web application weaknesses, including SQL injection testing',
        'Used Nmap, Nikto, Burp Suite and Gobuster for network discovery, web server assessment and directory enumeration in Kali Linux',
        'Documented technical findings and communicated results for security review',
      ],
    },
  ],

  technicalSkills: [
    {
      category: 'Governance, Risk & Compliance',
      skills: [
        'Risk assessment & risk treatment',
        'Security controls & control testing',
        'Evidence management',
        'Internal audit support',
        'CAPA & continual improvement',
        'Executive GRC reporting',
      ],
    },
    {
      category: 'Frameworks',
      skills: [
        'ISO/IEC 27001:2022',
        'ISO/IEC 27002:2022',
        'NIST Cybersecurity Framework 2.0',
        'Statement of Applicability',
        'Annex A control mapping',
        'ISO 27001 ↔ NIST CSF crosswalk',
      ],
    },
    {
      category: 'Technical Security',
      skills: [
        'Vulnerability assessment',
        'Web application security testing',
        'Burp Suite, Nmap, Nikto, Gobuster',
        'Kali Linux',
        'Splunk log analysis (home lab)',
        'Git & GitHub',
      ],
    },
  ],

  // Learning progression — presented as development, not employment.
  progression: [
    {
      step: '01',
      title: 'Technical security foundation',
      detail: 'Linux, networking and Git fundamentals alongside BIM studies at Tribhuvan University.',
    },
    {
      step: '02',
      title: 'Hands-on security practice',
      detail: '80+ TryHackMe labs across red team, blue team and fundamentals; documented CTF and recon write-ups.',
    },
    {
      step: '03',
      title: 'Cybersecurity internship',
      detail: 'Web application security testing and vulnerability assessment at Synthbit Technologies (May–Jul 2026).',
    },
    {
      step: '04',
      title: 'GRC apprenticeship',
      detail: 'Risk registers, control testing and audit documentation under CTO mentorship (Jul–Aug 2026).',
    },
    {
      step: '05',
      title: 'ISO 27001 & NIST CSF practice',
      detail: 'Framework study applied through documented practice repositories and control mappings.',
    },
    {
      step: '06',
      title: 'Enterprise GRC capstone',
      detail: 'VertexOne Digital Services — a simulated end-to-end ISMS implementation and assessment.',
    },
  ],

  practice: [
    {
      title: 'TryHackMe',
      badge: '80+ labs completed',
      description:
        'Hands-on labs across red team, blue team and cybersecurity fundamentals, with selected write-ups published in the practice reports repository.',
      url: 'https://github.com/AryanNeupane/Cyberecurity_Practice_Reports',
    },
    {
      title: 'Splunk SOC home lab',
      badge: 'Brute-force detection',
      description:
        'Windows Server 2022 and Kali Linux lab forwarding Security logs into Splunk Enterprise, using SPL to analyse Event ID 4625 authentication failures generated by a simulated brute-force attack.',
      url: 'https://github.com/AryanNeupane/Cyberecurity_Practice_Reports/blob/main/Splunk_Setup_and_Practice.md',
    },
    {
      title: 'Web & API testing reports',
      badge: 'Functional + security',
      description:
        'Structured test reports covering SSL/TLS configuration, input handling, navigation and performance issues found on live and lab targets.',
      url: 'https://github.com/AryanNeupane/Web_API_Testing_Reports',
    },
    {
      title: 'Reconnaissance reports',
      badge: 'Passive + active recon',
      description:
        'Domain, DNS and infrastructure reconnaissance write-ups produced for learning purposes against public targets.',
      url: 'https://github.com/AryanNeupane/reconnaissance_Reports',
    },
  ],
};

// ==========================================================================
// PROJECTS
// Artifact content below is drawn from the public capstone repository:
// github.com/AryanNeupane/vertexone-iso27001-isms-implementation
// ==========================================================================

const VERTEXONE_REPO = 'https://github.com/AryanNeupane/vertexone-iso27001-isms-implementation';

export const SEED_PROJECTS = [
  {
    id: 'vertexone-enterprise-grc-assessment',
    title: 'VertexOne Digital Services — Enterprise GRC Assessment',
    slug: 'vertexone-enterprise-grc-assessment',
    isCapstone: true,
    featured: true,
    published: true,
    category: 'GRC — ISO/IEC 27001:2022 & NIST CSF 2.0',
    simulationNotice:
      'Simulated enterprise GRC capstone project. VertexOne Digital Services is a fictional organisation. This is not a real client, consulting engagement, audit or certification.',
    summary:
      'An end-to-end ISO/IEC 27001:2022 ISMS implementation and NIST CSF 2.0 assessment for a simulated ~1,000-person SaaS enterprise, from scope and risk through controls, internal audit and continual improvement.',
    businessContext:
      'VertexOne Digital Services is a fictional technology services organisation of roughly 1,000 people running a customer SaaS platform and public portal on Microsoft Azure and Microsoft 365, with a hybrid workforce across a Singapore headquarters and APAC regional offices.',
    objective:
      'Practise the full ISMS lifecycle: define scope and governance, assess and treat enterprise risk, select and track Annex A controls, assess maturity against NIST CSF 2.0, run an internal audit cycle, and report to executive level.',
    scope:
      'Customer SaaS platform and public portal (production and staging), Azure infrastructure, Microsoft 365, internal ERP and HR systems, Singapore HQ and APAC offices, and third parties with access to in-scope systems. Marketing CMS, decommissioned legacy systems and non-critical disconnected tools are out of scope.',
    methodology:
      'Scope & organisational context → risk assessment and risk register → Statement of Applicability and Annex A control selection → operational control implementation and evidence → internal audit, nonconformities and CAPA → NIST CSF 2.0 current/target profiles → framework integration and executive reporting → continual improvement.',
    frameworks: ['ISO/IEC 27001:2022', 'ISO/IEC 27002:2022', 'NIST CSF 2.0', 'ISO 31000 (principles)'],
    controls: [
      'A.5 Organizational controls',
      'A.6 People controls',
      'A.7 Physical controls',
      'A.8 Technological controls',
      'NIST CSF 2.0 — Govern, Identify, Protect, Detect, Respond, Recover',
    ],
    findings: [
      'Monitoring and detection coverage is the weakest area: a SIEM gap remains on the legacy ERP system and no mean-time-to-detect metric is tracked (GAP-01, Critical).',
      'The incident response plan is documented with a defined escalation path but has never been exercised in a tabletop (GAP-02, High).',
      'Preventive controls are strong: MFA at 100% enrolment, EDR deployed fleet-wide, vulnerability management at 96% SLA compliance, quarterly backup restoration testing passing.',
      'NIST CSF 2.0 position assessed as Tier 2 (Risk Informed), with a 12-month roadmap toward Tier 3.',
    ],
    recommendations: [
      'Extend SIEM coverage to the legacy ERP and define/report MTTD monthly (30 days).',
      'Run an incident response tabletop and evidence lessons learned (90 days).',
      'Complete data mapping for cross-border transfers (90 days).',
      'Finish Phase 2/3 rollout of the remaining SoA controls and deploy shadow-IT discovery tooling (6 months).',
    ],
    lessonsLearned: [
      'A Statement of Applicability is only defensible when every selected control traces back to a specific risk ID — the traceability, not the control list, is what an auditor tests.',
      'Documented controls and operating controls are different claims. Separating design effectiveness from operating effectiveness exposed two controls that looked complete on paper but had never been exercised.',
      'Executive reporting works best when it reduces to a small number of prioritised gaps with owners and dates, rather than a full control inventory.',
    ],
    deliverables: [
      'ISMS Scope Statement',
      'Information Security Policy & RACI matrix',
      'Enterprise Risk Register',
      'Asset Register & Asset Classification Register',
      'Risk Assessment Methodology & Risk Acceptance Criteria',
      'Statement of Applicability (SoA)',
      'Annex A Control Register & Gap Analysis',
      'Control Ownership Matrix',
      'Control Implementation Tracker',
      'Risk Treatment Plan',
      'Internal Audit Plan, Checklist, Report & Findings Register',
      'Nonconformity & CAPA registers',
      'NIST CSF 2.0 current and target profiles',
      'NIST CSF Executive Dashboard & Improvement Roadmap',
      'ISO 27001 ↔ NIST CSF crosswalk and Unified Control Matrix',
      'Continual Improvement Register',
      'Executive Summary — Enterprise GRC Assessment',
    ],
    technologies: ['ISO/IEC 27001:2022', 'NIST CSF 2.0', 'Risk registers', 'Control testing', 'Executive reporting'],
    githubUrl: VERTEXONE_REPO,
    documentationUrl: `${VERTEXONE_REPO}#readme`,
    createdAt: '2026-07',
    updatedAt: '2026-08',

    artifactData: {
      sourceRepo: VERTEXONE_REPO,

      ismsScope: {
        title: 'ISMS Scope Statement',
        clause: 'ISO/IEC 27001:2022 Clause 4.3',
        boundary:
          'The people, processes and technology involved in the design, development, delivery and operation of the customer SaaS platform and public customer portal, including supporting corporate systems, across the Singapore headquarters and APAC regional offices.',
        inScope: [
          'Customer SaaS platform and public portal (production and staging)',
          'Microsoft Azure infrastructure supporting in-scope applications',
          'Microsoft 365 enterprise environment (email, collaboration, identity)',
          'Internal ERP system supporting finance and operations',
          'HR system used for employee lifecycle management',
          'Employees, contractors and authorised third parties with access to in-scope systems',
        ],
        exclusions: [
          'Marketing website CMS (processes no customer or employee PII)',
          'Legacy archived systems decommissioned before ISMS implementation',
          'Non-critical internal tools with no connectivity to in-scope environments',
        ],
        boundaries: [
          { label: 'Physical', value: 'Singapore headquarters and all APAC regional offices' },
          { label: 'Organizational', value: 'All business units supporting the customer SaaS platform' },
          { label: 'Technology', value: 'Azure, Microsoft 365, ERP, HR system and supporting infrastructure' },
          { label: 'Information', value: 'Customer PII, employee data, in-scope financial records, credentials' },
        ],
      },

      riskRegister: [
        { riskId: 'R-001', category: 'Vulnerability Mgmt', asset: 'Customer SaaS Platform', threat: 'Ransomware / unpatched dependencies', inherent: '20 Critical', effectiveness: 'Effective (96% SLA)', residual: '10 Medium', owner: 'Engineering Lead', priority: 'High' },
        { riskId: 'R-002', category: 'Vulnerability Mgmt', asset: 'Public Customer Portal', threat: 'Web application attack / input validation', inherent: '16 High', effectiveness: 'Partially Effective', residual: '10 Medium', owner: 'Engineering Lead', priority: 'High' },
        { riskId: 'R-003', category: 'Cloud Security', asset: 'Azure / AWS Storage', threat: 'Misconfiguration exposure', inherent: '15 High', effectiveness: 'Effective', residual: '8 Medium', owner: 'IT Operations', priority: 'Medium' },
        { riskId: 'R-004', category: 'Identity & Access', asset: 'Identity Provider', threat: 'Credential theft / phishing', inherent: '20 Critical', effectiveness: 'Effective (MFA 100%)', residual: '6 Low', owner: 'CISO', priority: 'Low (was Critical)' },
        { riskId: 'R-005', category: 'Security Awareness', asset: 'Workforce', threat: 'Social engineering', inherent: '12 Medium', effectiveness: 'Improving (89%)', residual: '6 Low', owner: 'HR / GRC Manager', priority: 'Medium' },
        { riskId: 'R-006', category: 'Logging & Monitoring', asset: 'Internal ERP', threat: 'Malware / weak detection', inherent: '16 High', effectiveness: 'Partially Effective', residual: '10 Medium', owner: 'IT Operations', priority: 'Critical' },
        { riskId: 'R-010', category: 'Data Protection', asset: 'Source Code Repository', threat: 'Unauthorised access / IP theft', inherent: '10 Medium', effectiveness: 'Effective', residual: '8 Medium', owner: 'Engineering Lead', priority: 'Low' },
        { riskId: 'R-012', category: 'Third-Party Risk', asset: 'Payment Processing', threat: 'Vendor compromise', inherent: '10 Medium', effectiveness: 'Effective (closed)', residual: '8 Medium', owner: 'Legal / GRC Manager', priority: 'Low' },
        { riskId: 'R-015', category: 'Backup & Recovery', asset: 'Backup / DR System', threat: 'Ransomware encrypting backups', inherent: '15 High', effectiveness: 'Effective (tested)', residual: '6 Low', owner: 'IT Operations', priority: 'Low (was High)' },
        { riskId: 'R-016', category: 'Incident Response', asset: 'Enterprise-wide', threat: 'Untested response plan', inherent: '12 Medium', effectiveness: 'Not Tested', residual: '12 Medium', owner: 'CISO', priority: 'High' },
        { riskId: 'R-017', category: 'Shadow IT', asset: 'Ungoverned cloud resources', threat: 'Unassessed services', inherent: '12 Medium', effectiveness: 'Partially Effective', residual: '9 Medium', owner: 'IT Operations', priority: 'Medium' },
        { riskId: 'R-018', category: 'Business Continuity', asset: 'Enterprise-wide', threat: 'Untested recovery communication', inherent: '9 Medium', effectiveness: 'Partially Effective', residual: '9 Medium', owner: 'IT Operations', priority: 'Medium' },
        { riskId: 'R-019', category: 'Regulatory / Compliance', asset: 'Global customer data', threat: 'Cross-border data transfer exposure', inherent: '12 Medium', effectiveness: 'Partially Effective', residual: '10 Medium', owner: 'Legal / GRC Manager', priority: 'High' },
      ],

      riskTreatment: [
        { priority: 'Critical', item: 'GAP-01 Monitoring coverage', treatment: 'Mitigate — extend SIEM, define MTTD', owner: 'IT Operations', target: '30 days' },
        { priority: 'High', item: 'GAP-02 Untested incident response', treatment: 'Mitigate — run tabletop exercise', owner: 'CISO', target: '90 days' },
        { priority: 'High', item: 'GAP-05 Cross-border data exposure', treatment: 'Mitigate — complete data mapping', owner: 'Legal / GRC Manager', target: '90 days' },
        { priority: 'High', item: 'GAP-06 Patch backlog closure', treatment: 'Mitigate — clear patch backlog', owner: 'IT Operations', target: '30 days' },
        { priority: 'Medium', item: 'GAP-03 Remaining SoA controls', treatment: 'Mitigate — complete Phase 2/3 rollout', owner: 'GRC Manager', target: '6 months' },
        { priority: 'Medium', item: 'GAP-04 Shadow IT discovery', treatment: 'Mitigate — deploy discovery tooling', owner: 'IT Operations', target: '6 months' },
        { priority: 'Low (monitor)', item: 'R-004, R-010, R-012, R-015', treatment: 'Accept / monitor — already effectively treated', owner: 'Respective owners', target: 'Ongoing' },
      ],

      statementOfApplicability: [
        { controlId: 'A.5.15', controlName: 'Access control', selected: true, risks: 'R-004, R-007', justification: 'Governs who can access sensitive systems and data', owner: 'CISO', status: 'In Progress' },
        { controlId: 'A.5.16', controlName: 'Identity management', selected: true, risks: 'R-004', justification: 'Manages identity lifecycle to prevent orphaned or excessive access', owner: 'CISO', status: 'In Progress' },
        { controlId: 'A.5.17', controlName: 'Authentication information', selected: true, risks: 'R-004', justification: 'Governs password and credential handling', owner: 'CISO', status: 'Not Started' },
        { controlId: 'A.5.19', controlName: 'Supplier relationships', selected: true, risks: 'R-012, R-013', justification: 'Addresses missing vendor security clauses and assessments', owner: 'Legal / GRC Manager', status: 'Not Started' },
        { controlId: 'A.5.23', controlName: 'Cloud services security', selected: true, risks: 'R-003, R-004, R-005', justification: 'Defines shared-responsibility expectations for Azure/M365', owner: 'IT Operations', status: 'In Progress' },
        { controlId: 'A.5.24', controlName: 'Incident management planning', selected: true, risks: 'All', justification: 'Establishes response process for any risk that materialises', owner: 'CISO', status: 'Not Started' },
        { controlId: 'A.5.30', controlName: 'ICT readiness for business continuity', selected: true, risks: 'R-015', justification: 'Ensures recovery capability for backup/DR risk', owner: 'IT Operations', status: 'Not Started' },
        { controlId: 'A.6.3', controlName: 'Awareness, education & training', selected: true, risks: 'R-005, R-009', justification: 'Addresses inconsistent regional security awareness', owner: 'HR / GRC Manager', status: 'Not Started' },
        { controlId: 'A.6.5', controlName: 'Responsibilities after termination', selected: true, risks: 'R-007', justification: 'Addresses orphaned account risk from inconsistent offboarding', owner: 'HR', status: 'Not Started' },
        { controlId: 'A.7.2', controlName: 'Physical entry', selected: true, risks: 'R-014', justification: 'Existing badge access control for office premises', owner: 'Facilities', status: 'Implemented' },
        { controlId: 'A.8.1', controlName: 'User endpoint devices', selected: true, risks: 'R-009', justification: 'Standardises endpoint security configuration', owner: 'IT Operations', status: 'In Progress' },
        { controlId: 'A.8.5', controlName: 'Secure authentication', selected: true, risks: 'R-004', justification: 'Enforces MFA to address credential theft risk', owner: 'CISO', status: 'In Progress' },
        { controlId: 'A.8.8', controlName: 'Management of technical vulnerabilities', selected: true, risks: 'R-001, R-002', justification: 'Addresses unpatched dependencies on customer-facing systems', owner: 'Engineering Lead', status: 'In Progress' },
        { controlId: 'A.8.13', controlName: 'Backup', selected: true, risks: 'R-015', justification: 'Ensures data recoverability against ransomware', owner: 'IT Operations', status: 'In Progress' },
        { controlId: 'A.8.16', controlName: 'Monitoring activities', selected: true, risks: 'R-006', justification: 'Improves detection capability on the legacy ERP system', owner: 'IT Operations', status: 'Not Started' },
        { controlId: 'A.8.28', controlName: 'Secure coding', selected: true, risks: 'R-002', justification: 'Directly addresses input validation gaps in the customer portal', owner: 'Engineering Lead', status: 'Not Started' },
        { controlId: 'A.7.4', controlName: 'Physical security monitoring', selected: false, risks: 'R-014', justification: 'R-014 is a formally accepted low residual risk; existing badge control is proportionate', owner: '—', status: 'Not Applicable' },
        { controlId: 'A.7.6', controlName: 'Working in secure areas', selected: false, risks: '—', justification: 'The hybrid office model has no designated secure physical zones', owner: '—', status: 'Not Applicable' },
        { controlId: 'A.8.30', controlName: 'Outsourced development', selected: false, risks: '—', justification: 'All software development is performed in-house', owner: '—', status: 'Not Applicable' },
      ],

      controlOwnership: [
        { control: 'A.8.5 Secure authentication', owner: 'CISO', operator: 'IT Operations', reviewer: 'GRC Manager', evidenceOwner: 'IT Operations' },
        { control: 'A.8.2 Privileged access rights', owner: 'CISO', operator: 'IT Operations', reviewer: 'GRC Manager', evidenceOwner: 'IT Operations' },
        { control: 'A.8.8 Vulnerability management', owner: 'Engineering Lead', operator: 'Engineering Team', reviewer: 'GRC Manager', evidenceOwner: 'Engineering Lead' },
        { control: 'A.8.9 Configuration management', owner: 'IT Operations', operator: 'IT Operations', reviewer: 'GRC Manager', evidenceOwner: 'IT Operations' },
        { control: 'A.8.13 Backup', owner: 'IT Operations', operator: 'IT Operations', reviewer: 'GRC Manager', evidenceOwner: 'IT Operations' },
        { control: 'A.8.25 Secure development life cycle', owner: 'Engineering Lead', operator: 'Engineering Team', reviewer: 'GRC Manager', evidenceOwner: 'Engineering Lead' },
        { control: 'A.5.19 Supplier relationships', owner: 'Legal / GRC Manager', operator: 'GRC Manager', reviewer: 'CISO', evidenceOwner: 'GRC Manager' },
        { control: 'A.6.3 Awareness & training', owner: 'HR / GRC Manager', operator: 'HR', reviewer: 'GRC Manager', evidenceOwner: 'HR' },
        { control: 'A.6.5 Termination responsibilities', owner: 'HR', operator: 'HR / IT Operations', reviewer: 'GRC Manager', evidenceOwner: 'HR' },
        { control: 'A.7.2 Physical entry', owner: 'Facilities', operator: 'Facilities', reviewer: 'GRC Manager', evidenceOwner: 'Facilities' },
      ],

      controlEffectiveness: [
        { control: 'MFA / secure authentication', design: 'Adequate', operating: 'Verified — 100% enrolment', classification: 'Effective' },
        { control: 'Vulnerability management', design: 'Adequate', operating: 'Verified — 96% SLA compliance', classification: 'Effective' },
        { control: 'Backup restoration', design: 'Adequate', operating: 'Verified — quarterly test passing', classification: 'Effective' },
        { control: 'Logging & monitoring', design: 'Adequate', operating: 'Inconsistent — legacy coverage gap', classification: 'Partially Effective' },
        { control: 'Configuration management', design: 'Adequate', operating: 'Manual, not yet automated', classification: 'Partially Effective' },
        { control: 'Incident response plan', design: 'Adequate on paper', operating: 'Never exercised', classification: 'Not Tested' },
        { control: 'Business continuity communication', design: 'Underdeveloped', operating: 'Never exercised', classification: 'Not Tested' },
      ],

      nistCsfProfile: [
        { function: 'GOVERN', status: 'Established', current: 'Policy, RACI and management review formally established; vendor security addenda in place for all critical vendors.', gap: 'No significant gap identified.', target: 'Vendor security risk tiered by criticality; supply chain risk reported at every management review.', priority: 'High' },
        { function: 'IDENTIFY', status: 'Established', current: 'Asset and risk registers complete and reviewed annually; 15 risks assessed (R-001 to R-015).', gap: 'Annual review cadence may require event-driven updates.', target: 'Near-continuous asset discovery including shadow cloud resources.', priority: 'High' },
        { function: 'PROTECT', status: 'Mostly Established', current: 'MFA at 100%, EDR deployed fleet-wide, awareness training at 89%, encryption enabled on customer data at rest.', gap: 'Awareness training remains below 100%.', target: '95%+ sustained awareness completion; automated configuration drift scanning across all cloud environments.', priority: 'High' },
        { function: 'DETECT', status: 'Partially Established', current: 'SIEM deployed with daily alert triage; coverage gap on the legacy ERP; no MTTD metric tracked.', gap: 'Legacy ERP monitoring gap; MTTD not tracked.', target: 'Full monitoring coverage across critical assets; MTTD tracked and reported monthly.', priority: 'Critical' },
        { function: 'RESPOND', status: 'Partially Established', current: 'Incident response plan documented with a defined escalation path; never exercised via tabletop.', gap: 'No tabletop exercise performed to validate response capability.', target: 'Annual tabletop completed; communication plan validated against a simulated scenario.', priority: 'High' },
        { function: 'RECOVER', status: 'Partially Established', current: 'Backup restoration tested quarterly with documented RTO/RPO; recovery communication plan untested.', gap: 'Recovery communication plan has not been tested.', target: 'Recovery communication tested alongside each restoration test; lessons learned logged every cycle.', priority: 'Medium' },
      ],

      csfTier: {
        current: 'Tier 2 — Risk Informed',
        target: 'Tier 3 within 12 months',
        isoStatus: 'Certification-track with 2 minor nonconformities on a tracked closure timeline',
      },

      continualImprovement: [
        { id: 'OFI-001', idea: 'Add resolution-time field to SIEM alert triage log', source: 'External certification body', owner: 'GRC Manager', priority: 'Medium', status: 'Logged, Planned', benefit: 'Improved incident-response measurement' },
        { id: 'OFI-002', idea: 'Tier vendor security questionnaire by criticality', source: 'External certification body', owner: 'Vendor Management', priority: 'Medium', status: 'Logged, Planned', benefit: 'Risk-based supplier assessment' },
        { id: 'OFI-003', idea: 'Automate monthly security operations report generation', source: 'External certification body', owner: 'Security Operations', priority: 'Medium', status: 'Logged, Planned', benefit: 'Reduced manual reporting effort' },
        { id: 'CI-001', idea: 'Extend control ownership matrix to remaining controls as they become operational', source: 'Internal — management review', owner: 'GRC Manager', priority: 'High', status: 'In Progress', benefit: 'Improved accountability and control ownership' },
        { id: 'CI-002', idea: 'Explore automated evidence collection for recurring audit samples', source: 'Internal — GRC Manager', owner: 'GRC Manager', priority: 'Medium', status: 'Proposed', benefit: 'Improved audit efficiency and evidence consistency' },
      ],

      artifactCatalog: [
        { id: 'ismsScope', category: 'GOVERNANCE', title: 'ISMS Scope Statement', framework: 'ISO/IEC 27001:2022 Clause 4.3', type: 'Governance document', purpose: 'Defines ISMS boundaries, exclusions and approval path.', description: 'Organisational, physical, technology and information boundaries for the VertexOne ISMS.', viewable: true, repoPath: '01_ISMS-Foundation/Reports/ISMS Scope Statement.pdf' },
        { id: 'infoSecPolicy', category: 'GOVERNANCE', title: 'Information Security Policy & RACI', framework: 'ISO/IEC 27001:2022 Clause 5.2', type: 'Policy set', purpose: 'Top-management direction, roles and responsibilities for the ISMS.', description: 'Policy, ISMS roles register, RACI matrix, interested parties and security objectives registers.', viewable: false, repoPath: '01_ISMS-Foundation/Reports' },
        { id: 'roadmap', category: 'GOVERNANCE', title: 'NIST CSF Improvement Roadmap', framework: 'NIST CSF 2.0', type: 'Roadmap', purpose: 'Sequences improvement activity over a 12-month horizon.', description: 'Prioritised roadmap moving the programme from Tier 2 toward Tier 3.', viewable: false, repoPath: '07_NIST-CSF/Reports/NIST CSF Improvement Roadmap.pdf' },

        { id: 'riskRegister', category: 'RISK', title: 'Enterprise Risk Register', framework: 'ISO/IEC 27001:2022 Clause 6.1', type: 'Risk register', purpose: 'Records inherent risk, control effectiveness, residual risk and ownership.', description: 'Final consolidated register with inherent vs residual scoring per risk.', viewable: true, repoPath: 'Final-Capstone/Final Enterprise Risk Register.pdf' },
        { id: 'riskTreatment', category: 'RISK', title: 'Risk Treatment Plan', framework: 'ISO/IEC 27001:2022 Clause 6.1.3', type: 'Treatment plan', purpose: 'Maps prioritised gaps to treatment decisions, owners and target dates.', description: 'Mitigate / accept decisions across the six consolidated GRC gaps.', viewable: true, repoPath: 'Final-Capstone/Risk Treatment Plan.pdf' },
        { id: 'assetInventory', category: 'RISK', title: 'Asset Register & Classification', framework: 'ISO/IEC 27001:2022 Annex A.5.9', type: 'Asset register', purpose: 'Catalogues information assets and assigns classification levels.', description: 'Asset register and asset classification register for in-scope systems.', viewable: false, repoPath: '02_Risk_Management/Reports/Asset Register.pdf' },
        { id: 'riskMethodology', category: 'RISK', title: 'Risk Methodology & Acceptance Criteria', framework: 'ISO/IEC 27001:2022 Clause 6.1.2', type: 'Methodology', purpose: 'Defines how risk is scored and when it may be accepted.', description: 'Risk assessment methodology, risk matrix and acceptance criteria.', viewable: false, repoPath: '02_Risk_Management/Reports/Risk Assessment Methodology.pdf' },

        { id: 'soa', category: 'CONTROLS', title: 'Statement of Applicability', framework: 'ISO/IEC 27001:2022 Clause 6.1.3 d)', type: 'SoA', purpose: 'Documents control selection and exclusion with justification and traceability to risk IDs.', description: 'Selected and excluded Annex A controls with owner and implementation status.', viewable: true, repoPath: '03_SoA-Annex-A/Reports/Statement of Applicability (SoA).pdf' },
        { id: 'controlOwnership', category: 'CONTROLS', title: 'Control Ownership Matrix', framework: 'ISO/IEC 27001:2022', type: 'Ownership matrix', purpose: 'Separates control owner, operator, reviewer and evidence owner.', description: 'Accountability model across identity, engineering, HR and facilities controls.', viewable: true, repoPath: '03_SoA-Annex-A/Reports/Control Ownership Matrix.pdf' },
        { id: 'annexAInventory', category: 'CONTROLS', title: 'Annex A Control Register & Gap Analysis', framework: 'ISO/IEC 27001:2022 Annex A', type: 'Control inventory', purpose: 'Tracks Annex A controls and identified gaps.', description: 'Control register, gap analysis and risk-to-control mapping matrix.', viewable: false, repoPath: '03_SoA-Annex-A/Reports/Annex A Control Register.pdf' },
        { id: 'controlTracker', category: 'CONTROLS', title: 'Control Implementation Tracker', framework: 'ISO/IEC 27001:2022', type: 'Implementation tracker', purpose: 'Tracks implementation progress, evidence and target dates per control.', description: 'Operational tracker used to drive the Phase 2/3 control rollout.', viewable: false, repoPath: '03_SoA-Annex-A/Reports/Control Implementation Tracker - VertexOne Digital Services.pdf' },

        { id: 'controlEffectiveness', category: 'ASSESSMENT', title: 'Control Effectiveness Assessment', framework: 'ISO/IEC 27001:2022 Clause 9.1', type: 'Assessment', purpose: 'Separates design effectiveness from operating effectiveness.', description: 'Effective / partially effective / not tested classification per control.', viewable: true, repoPath: 'Final-Capstone/Control Effectiveness Assessment -VertexOne Digital Services.pdf' },
        { id: 'nistAssessment', category: 'ASSESSMENT', title: 'NIST CSF Current & Target Profile', framework: 'NIST CSF 2.0', type: 'Framework assessment', purpose: 'Assesses each CSF function against evidence and defines the target state.', description: 'Current state, key gap, target state and priority for all six functions.', viewable: true, repoPath: '07_NIST-CSF/Reports/NIST_CSF_CURRENT_AND_TARGET_PROFILE.pdf' },
        { id: 'nistDashboard', category: 'ASSESSMENT', title: 'NIST CSF Executive Dashboard', framework: 'NIST CSF 2.0', type: 'Executive dashboard', purpose: 'Communicates CSF posture and tier position to leadership.', description: 'Executive view of function status, gaps and improvement priorities.', viewable: false, repoPath: '07_NIST-CSF/Reports/NIST CSF Executive Dashboard.pdf' },
        { id: 'internalAudit', category: 'ASSESSMENT', title: 'Internal Audit Cycle', framework: 'ISO/IEC 27001:2022 Clause 9.2', type: 'Audit pack', purpose: 'Plans, executes and reports an internal ISMS audit.', description: 'Audit plan, programme, checklist, report, findings register and nonconformity register.', viewable: false, repoPath: '05_Internal-Audit/Reports/INTERNAL AUDIT REPORT.pdf' },
        { id: 'grcSummary', category: 'ASSESSMENT', title: 'GRC Executive Summary', framework: 'ISO/IEC 27001:2022 & NIST CSF 2.0', type: 'Executive report', purpose: 'Consolidates risk, control, gap and roadmap position for executives.', description: 'Headline finding, key gaps GAP-01 to GAP-05, and recommended funding priorities.', viewable: false, repoPath: 'Final-Capstone/Final GRC Assessment Report.pdf' },

        { id: 'continualImprovement', category: 'CONTINUAL_IMPROVEMENT', title: 'Continual Improvement Register', framework: 'ISO/IEC 27001:2022 Clause 10.1', type: 'Improvement register', purpose: 'Tracks opportunities for improvement from audits and management review.', description: 'OFI and CI items with source, owner, priority and expected benefit.', viewable: true, repoPath: '06_Certification-Readiness/Reports/Continual Improvement Register.pdf' },
        { id: 'capa', category: 'CONTINUAL_IMPROVEMENT', title: 'CAPA & Root Cause Registers', framework: 'ISO/IEC 27001:2022 Clause 10.2', type: 'CAPA register', purpose: 'Tracks corrective actions and root cause analysis to closure.', description: 'CAPA tracker, corrective action plan and root cause analysis register.', viewable: false, repoPath: '06_Certification-Readiness/Reports/CAPA_Tracker.pdf' },
      ],
    },
  },

  {
    id: 'splunk-soc-home-lab',
    title: 'Splunk SOC Home Lab — Brute-Force Detection',
    slug: 'splunk-soc-home-lab',
    isCapstone: false,
    featured: true,
    published: true,
    category: 'Security Operations',
    summary:
      'A home lab built to detect credential-based attacks: Windows Server 2022 authentication logs forwarded into Splunk Enterprise, with SPL used to analyse the Event ID 4625 failures generated by a brute-force attack from Kali Linux.',
    businessContext:
      'Personal lab environment built for learning. No production systems or third-party targets were involved.',
    objective:
      'Understand what a credential attack looks like in telemetry: generate it, forward the logs, and analyse them in a SIEM.',
    scope: 'Windows Server 2022 target, Kali Linux attacker, Splunk Enterprise with the Universal Forwarder.',
    methodology:
      'Baseline logging in Event Viewer → brute-force simulation from Kali → identification of Event ID 4625 audit failures → forwarding via Splunk Universal Forwarder → SPL queries and visualisation.',
    frameworks: ['MITRE ATT&CK (credential access)'],
    controls: ['Authentication logging', 'Security monitoring', 'Alerting on failed logon patterns'],
    findings: [
      'Failed logon events (Event ID 4625) captured attacker source IP, attempted usernames, logon type and failure reason.',
      'SPL aggregation made a high-volume brute-force pattern legible where raw Event Viewer output was not.',
    ],
    lessonsLearned: [
      'Detection depends on the log source being configured before the attack — the baseline step matters more than the query.',
      'Reading raw authentication failures made the ISO 27001 A.8.16 monitoring control concrete rather than abstract.',
    ],
    deliverables: ['Lab report with screenshots', 'SPL query notes'],
    technologies: ['Splunk Enterprise', 'Splunk Universal Forwarder', 'Windows Server 2022', 'Kali Linux'],
    githubUrl: 'https://github.com/AryanNeupane/Cyberecurity_Practice_Reports/blob/main/Splunk_Setup_and_Practice.md',
    createdAt: '2026-08',
    updatedAt: '2026-08',
  },

  {
    id: 'web-application-security-testing',
    title: 'Web Application Security Testing & Reconnaissance Reports',
    slug: 'web-application-security-testing',
    isCapstone: false,
    featured: false,
    published: true,
    category: 'Vulnerability Assessment',
    summary:
      'Documented web application and API testing alongside passive/active reconnaissance write-ups, covering TLS configuration, input handling, broken functionality and exposed infrastructure detail.',
    businessContext:
      'Testing performed for learning and internship work, on permitted or publicly reachable targets, with findings written up in a repeatable report format.',
    objective:
      'Produce findings that a developer can act on: reproducible steps, observed versus expected behaviour, and a clear severity call.',
    scope: 'Web and API test reports, and domain/DNS/infrastructure reconnaissance exercises.',
    methodology:
      'Reconnaissance → enumeration → manual verification of candidate weaknesses (including SQL injection testing) → structured reporting with expected vs actual results.',
    frameworks: ['OWASP Top 10'],
    controls: ['Input validation', 'Transport security (TLS)', 'Secure configuration'],
    findings: [
      'Missing/invalid TLS certificate on a tested education-sector site, alongside broken download links and incomplete navigation paths.',
      'Reconnaissance exercises surfaced domain registration, DNS and infrastructure detail useful for scoping an assessment.',
    ],
    lessonsLearned: [
      'A finding without reproduction steps and an expected-result comparison is not actionable for the team receiving it.',
      'Reconnaissance output is only useful once it is reduced to what changes the attack surface.',
    ],
    deliverables: ['Web/API test reports', 'Reconnaissance reports'],
    technologies: ['Burp Suite', 'Nmap', 'Nikto', 'Gobuster', 'Kali Linux'],
    githubUrl: 'https://github.com/AryanNeupane/Web_API_Testing_Reports',
    documentationUrl: 'https://github.com/AryanNeupane/reconnaissance_Reports',
    createdAt: '2026-03',
    updatedAt: '2026-04',
  },

  {
    id: 'grc-learning-implementations',
    title: 'GRC Practice Implementations — Risk, SoA & Control Assessment',
    slug: 'grc-learning-implementations',
    isCapstone: false,
    featured: false,
    published: true,
    category: 'GRC Practice',
    summary:
      'A working repository of smaller GRC exercises: full and scoped risk assessments, ISMS foundation documents, Annex A control work, Statement of Applicability practice, internal audit exercises and control assessments.',
    businessContext:
      'Framework practice against fictional organisations, used to build repeatable GRC artefacts before applying them at capstone scale.',
    objective: 'Practise each ISO 27001 artefact in isolation until the traceability between risk, control and evidence is second nature.',
    scope: 'Risk assessments, ISMS foundation, Annex A controls, SoA, internal audit and security control assessment exercises.',
    methodology: 'Scenario definition → risk identification and scoring → control selection → assessment and evidence → documented outcome.',
    frameworks: ['ISO/IEC 27001:2022', 'NIST CSF 2.0'],
    controls: ['Annex A control selection', 'Control assessment', 'Evidence management'],
    deliverables: ['Risk registers', 'Governance documentation', 'SoA implementations', 'Control assessments', 'Internal audit exercise'],
    technologies: ['ISO/IEC 27001:2022', 'NIST CSF 2.0', 'Risk registers'],
    githubUrl: 'https://github.com/AryanNeupane/GRC-Learning-Implementations',
    documentationUrl: 'https://github.com/AryanNeupane/NovaShield-GRC-Major-Project',
    createdAt: '2026-06',
    updatedAt: '2026-08',
  },
];

export const SEED_BLOG_POSTS = [
  {
    id: 'structuring-enterprise-risk-register-iso-27001',
    title: 'Structuring a Risk Register That Survives an Audit',
    slug: 'structuring-enterprise-risk-register-iso-27001',
    featured: true,
    published: true,
    category: 'ISO 27001',
    tags: ['ISO 27001', 'Risk Register', 'Risk Management'],
    excerpt:
      'What separates a risk register an auditor can test from a spreadsheet of worries: traceability, inherent versus residual scoring, and named ownership.',
    readingTime: '6 min read',
    seoTitle: 'Structuring an ISO 27001 Risk Register',
    seoDescription:
      'Practical structure for an ISO/IEC 27001:2022 risk register: threat/vulnerability pairing, inherent vs residual scoring, control traceability and ownership.',
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    content: `
### Why most risk registers fail their first review

A register that lists "database could fail" gives an auditor nothing to test. There is no asset boundary, no threat, no control, and no one accountable. The fix is structural, not editorial.

### Five fields that make an entry testable

1. **Asset or process** — the thing that carries the risk, named specifically enough to scope evidence against it.
2. **Threat and vulnerability pair** — the scenario *and* the weakness it exploits. "Credential theft / phishing" against an identity provider is testable; "cyber attack" is not.
3. **Inherent and residual scoring** — score before controls, record control effectiveness, then score again. A register with only one score cannot show that treatment worked.
4. **Treatment decision** — mitigate, transfer, avoid or accept, recorded as a decision someone made rather than an aspiration.
5. **Named owner** — a role that appears in the control ownership matrix, not a department.

### Traceability is the actual deliverable

In the VertexOne capstone, every selected Annex A control in the Statement of Applicability references the risk IDs it treats. That linkage is what makes Clause 6.1.3(d) defensible: the control list alone proves nothing, the mapping does.

### Separate design from operation

A control that is documented is not a control that works. Splitting the assessment into design effectiveness and operating effectiveness exposed two controls in the capstone — the incident response plan and business continuity communication — that were adequate on paper and had never been exercised. They stayed classified as *Not Tested* rather than being counted as complete.
`,
  },
  {
    id: 'nist-csf-2-vs-iso-27001-2022',
    title: 'NIST CSF 2.0 and ISO/IEC 27001:2022 Are Not Competing Choices',
    slug: 'nist-csf-2-vs-iso-27001-2022',
    featured: true,
    published: true,
    category: 'Frameworks',
    tags: ['NIST CSF', 'ISO 27001', 'Governance'],
    excerpt:
      'One gives you a certifiable management system, the other gives you language executives already understand. Running them together costs less than choosing between them.',
    readingTime: '5 min read',
    seoTitle: 'NIST CSF 2.0 vs ISO/IEC 27001:2022',
    seoDescription:
      'How ISO/IEC 27001:2022 and NIST CSF 2.0 complement each other, and how a crosswalk keeps one control set serving both.',
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-08',
    content: `
### Different jobs

* **ISO/IEC 27001:2022** provides management system requirements (Clauses 4–10) and the Annex A control set. It is what you certify against.
* **NIST CSF 2.0** organises outcomes into six functions — Govern, Identify, Protect, Detect, Respond, Recover — and expresses maturity as tiers. It is what you report with.

### Where the crosswalk earns its keep

Maintaining two control inventories doubles the evidence burden for no benefit. A crosswalk lets a single control satisfy both: A.8.16 Monitoring Activities is the same operational reality as the CSF Detect function's continuous monitoring outcome, evidenced once.

### Tiers communicate what a control count cannot

Reporting "78% of controls implemented" invites the wrong question. Reporting "Tier 2, Risk Informed, targeting Tier 3 in twelve months, with detection as the limiting function" gives leadership a decision to make. In the VertexOne capstone the detection gap — no monitoring coverage on a legacy system and no mean-time-to-detect metric — set the tier, regardless of how strong identity and backup controls looked.

### Start from the gap, not the framework

Both frameworks will happily generate work. The useful sequence is to assess current state per function, name the single limiting weakness, and let that drive which controls get attention first.
`,
  },
  {
    id: 'from-failed-logons-to-a-monitoring-control',
    title: 'From Failed Logons to a Monitoring Control',
    slug: 'from-failed-logons-to-a-monitoring-control',
    featured: false,
    published: true,
    category: 'Security Operations',
    tags: ['Splunk', 'Log Analysis', 'Home Lab', 'ISO 27001'],
    excerpt:
      'Running a brute-force attack against my own lab and watching Event ID 4625 pile up made the difference between a monitoring control that exists and one that works.',
    readingTime: '5 min read',
    seoTitle: 'Splunk Home Lab: Brute-Force Detection and A.8.16',
    seoDescription:
      'A home lab walkthrough forwarding Windows authentication logs into Splunk, and what it teaches about the ISO 27001 monitoring control.',
    publishedAt: '2026-08-10',
    updatedAt: '2026-08-10',
    content: `
### The lab

A Windows Server 2022 target, a Kali Linux attacker, and Splunk Enterprise receiving Security logs through the Universal Forwarder. Authentication logging was verified in Event Viewer first, to establish a clean baseline before generating anything.

### What the attack looked like in the logs

A high-frequency brute force produced a wall of **Event ID 4625** audit failures. Each entry carried the source IP, the attempted username, the logon type and the failure reason — the same fields a detection rule would key on.

### Why aggregation matters

Thousands of individual failures are unreadable in Event Viewer. Aggregating in SPL by source address and account turns the same data into a pattern with a shape: a small number of source IPs, a large number of accounts, a tight time window.

### The governance connection

ISO/IEC 27001:2022 A.8.16 Monitoring Activities is easy to mark as implemented if you own a SIEM. The lab makes the real questions obvious: is the log source configured, is it actually forwarding, does anyone look at it, and how long does detection take? Those are the questions that turned into the capstone's critical finding — full monitoring coverage and a tracked mean-time-to-detect, not the presence of a tool.
`,
  },
];
