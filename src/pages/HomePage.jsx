import React, { useEffect, useState } from 'react';
import { Shield, ArrowRight, Download, CheckCircle2, Award, Terminal, FileCheck, ExternalLink, ChevronRight, Github, Mail, BookOpen, Layers, AlertTriangle } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/seedData';
import { getProjects, getBlogPosts } from '../services/dataService';

export default function HomePage({ onNavigate }) {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const [projects, posts] = await Promise.all([getProjects(), getBlogPosts()]);
        setFeaturedProjects(projects);
        setRecentPosts(posts.slice(0, 3));
      } catch (err) {
        console.error("Error loading homepage data:", err);
      }
    }
    loadData();
  }, []);

  const capstoneProject = featuredProjects.find(p => p.isCapstone) || featuredProjects[0];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="section" style={{ paddingTop: '5rem', paddingBottom: '5.5rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ maxWidth: '850px' }}>
            <div className="badge badge-blue" style={{ marginBottom: '1.25rem', padding: '0.35rem 0.85rem' }}>
              <Shield size={14} />
              <span>Cybersecurity & Governance, Risk & Compliance</span>
            </div>
            
            <h1 style={{ marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
              Aryan Neupane
            </h1>
            
            <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2.25rem', fontWeight: '300' }}>
              I build practical security governance, risk management, and compliance frameworks backed by technical security fundamentals, vulnerability analysis, and security operations.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <button 
                className="btn btn-accent"
                onClick={() => onNavigate('/portfolio')}
              >
                <span>View My Work</span>
                <ArrowRight size={16} />
              </button>

              <a 
                href="/resume/Aryan-Neupane-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>

              <a 
                href={PERSONAL_PROFILE.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '0.7rem 1rem' }}
                aria-label="GitHub Profile"
              >
                <Github size={16} />
                <span>GitHub</span>
                <ExternalLink size={12} />
              </a>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Located in Nepal • Open to Remote Cybersecurity & GRC Roles
            </div>
          </div>
        </div>
      </section>

      {/* 2. SELECTED WORK PREVIEW */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Portfolio Highlights</div>
              <h2>Selected Security Work</h2>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('/portfolio')}>
              <span>View All Projects</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {featuredProjects.slice(0, 3).map((project) => (
              <div 
                key={project.id} 
                className="card"
                style={{ 
                  border: project.isCapstone ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                  background: 'var(--bg-card)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                      {project.isCapstone && <span className="badge badge-blue">Simulated Enterprise Capstone</span>}
                      <span className="badge badge-indigo">{project.category}</span>
                    </div>
                    <h3 style={{ fontSize: '1.35rem' }}>{project.title}</h3>
                  </div>

                  <button 
                    className="btn btn-sm btn-outline"
                    onClick={() => onNavigate(`/portfolio/${project.slug}`)}
                  >
                    <span>Inspect Project</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                <p style={{ fontSize: '0.95rem', marginBottom: '1.25rem' }}>
                  {project.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {project.frameworks?.map((fw, idx) => (
                    <span key={idx} className="badge">{fw}</span>
                  ))}
                  {project.deliverables?.slice(0, 3).map((d, dIdx) => (
                    <span key={dIdx} className="badge badge-blue">{d}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT / PROFESSIONAL SUMMARY */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '1rem' }}>Professional Narrative</h2>
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              I combine an academic background in Information Management (BIM, Tribhuvan University) with practical cybersecurity experience gained through internship testing, hands-on lab analysis, and structured GRC mentorship. My goal is to build clear, evidence-based security programs that satisfy compliance expectations while reducing operational risk.
            </p>
            <button className="btn btn-outline" onClick={() => onNavigate('/about')}>
              <span>Read Full Journey & Background</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 4. SECURITY + GRC FOCUS AREAS */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2>Focus Areas & Capabilities</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Core disciplines connecting technical security operations with executive governance.</p>
          </div>

          <div className="grid-3">
            {PERSONAL_PROFILE.technicalSkills.map((cat, idx) => (
              <div key={idx} className="card">
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--accent-primary)' }}>
                  {idx === 0 ? <FileCheck size={20} /> : idx === 1 ? <Terminal size={20} /> : <Shield size={20} />}
                </div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>{cat.category}</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={14} style={{ color: 'var(--accent-primary)' }} />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CAREER / LEARNING PROGRESSION PIPELINE */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <div className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Development Pipeline</div>
            <h2>Practical Progression & Growth</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {[
              { step: '01', title: 'Technical Security Foundation', desc: 'Linux, Python, Git, and networking basics.' },
              { step: '02', title: 'Hands-on Security Practice', desc: '40+ TryHackMe rooms, DVWA, and Splunk SOC home lab.' },
              { step: '03', title: 'Cybersecurity Internship', desc: 'Web app security testing fundamentals at Synthbit Technologies.' },
              { step: '04', title: 'GRC Apprenticeship', desc: 'Mentorship under Sandeep Sharma (CTO) on ISO 27001 & NIST CSF.' },
              { step: '05', title: 'Enterprise GRC Capstone', desc: 'Authoring end-to-end ISMS assessment and artifacts for VertexOne.' },
              { step: '06', title: 'Cybersecurity/GRC Career', desc: 'Delivering practical, evidence-based security governance.' }
            ].map((item, idx) => (
              <div key={idx} className="card" style={{ background: 'var(--bg-tertiary)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '700', marginBottom: '0.5rem' }}>
                  STEP {item.step}
                </div>
                <h4 style={{ fontSize: '1.05rem', marginBottom: '0.4rem' }}>{item.title}</h4>
                <p style={{ fontSize: '0.85rem', margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED VERTEXONE CAPSTONE */}
      {capstoneProject && (
        <section className="section" style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
          <div className="container">
            <div className="flagship-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    <span className="badge badge-blue">Flagship GRC Case Study</span>
                    <span className="badge badge-amber">Simulated Enterprise Capstone</span>
                  </div>
                  <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>{capstoneProject.title}</h2>
                </div>

                <button 
                  className="btn btn-accent"
                  onClick={() => onNavigate(`/portfolio/${capstoneProject.slug}`)}
                >
                  <span>Explore Case Study & Artifacts</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem', maxWidth: '900px' }}>
                {capstoneProject.summary}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Frameworks Applied</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    ISO/IEC 27001:2022 & NIST CSF 2.0
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Core Deliverables</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    Risk Register, SoA, Control Ownership, Dashboards
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Evidence Type</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    14 Documented GRC Artifacts
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                * Standard Capstone Taxonomy: VertexOne Digital Services represents a simulated enterprise scenario developed to demonstrate practical GRC execution.
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. CERTIFICATIONS */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2>Verified Certifications & Learning Paths</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Represented strictly according to official status.</p>
          </div>

          <div className="grid-3">
            {PERSONAL_PROFILE.certifications.map((cert) => (
              <div key={cert.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <Award size={24} style={{ color: 'var(--accent-primary)' }} />
                  <span className="badge badge-emerald">{cert.status}</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{cert.title}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                  {cert.issuer}
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {cert.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TECHNICAL FOUNDATION */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ marginBottom: '2.5rem' }}>
            <h2>Technical Security Practice</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Evidence-driven practice in controlled lab environments.</p>
          </div>

          <div className="grid-2">
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>TryHackMe Learning</h3>
              <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>40+ Completed Rooms</span>
              <p style={{ fontSize: '0.9rem' }}>
                Completed over 40 structured rooms covering Linux fundamentals, privilege escalation, web application vulnerabilities, and network analysis.
              </p>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>Splunk SOC & Telemetry Lab</h3>
              <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Log Ingestion & Detection</span>
              <p style={{ fontSize: '0.9rem' }}>
                Ingested Sysmon, Windows Event Logs, and Apache access logs into Splunk Enterprise to author SPL threat queries and build brute-force detection alerts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FEATURED BLOG ARTICLES */}
      <section className="section" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2>Featured Technical Journal</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Practical notes on ISO 27001, NIST CSF 2.0, and security operations.</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => onNavigate('/blog')}>
              <span>View Journal</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid-2">
            {recentPosts.map((post) => (
              <div 
                key={post.id} 
                className="card"
                style={{ cursor: 'pointer' }}
                onClick={() => onNavigate(`/blog/${post.slug}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="badge badge-indigo">{post.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{post.readingTime}</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{post.title}</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>{post.excerpt}</p>
                <div style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <span>Read Article</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CONTACT CTA */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ marginBottom: '1rem' }}>Let's connect.</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Whether discussing GRC opportunities, ISO 27001 assessments, or technical security operations, I welcome professional inquiries.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-accent" onClick={() => onNavigate('/contact')}>
                <Mail size={16} />
                <span>Send Message</span>
              </button>
              <a href="/resume/Aryan-Neupane-Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Download size={16} />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
