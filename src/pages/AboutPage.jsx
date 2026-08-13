import React from 'react';
import { Shield, BookOpen, Award, CheckCircle2, FileText, ArrowRight, Download, ExternalLink } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/seedData';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="about-page section">
      <div className="container">
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div className="badge badge-blue" style={{ marginBottom: '1rem' }}>Professional Profile</div>
          <h1 style={{ marginBottom: '1.5rem' }}>About Aryan Neupane</h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '2.5rem' }}>
            I am an early-career cybersecurity and GRC practitioner focused on developing practical, evidence-driven governance and risk management capabilities. My approach connects technical security observations with enterprise compliance frameworks.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <button className="btn btn-accent" onClick={() => onNavigate('/contact')}>
              <span>Get in Touch</span>
              <ArrowRight size={16} />
            </button>
            <a href="/resume/Aryan-Neupane-Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Download size={16} />
              <span>Download Resume (PDF)</span>
            </a>
          </div>

          {/* Philosophy Banner */}
          <div className="card" style={{ marginBottom: '3rem', borderLeft: '4px solid var(--accent-primary)', background: 'var(--bg-secondary)' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>Portfolio Philosophy</h3>
            <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: 0 }}>
              "I don't want to simply list cybersecurity skills. I want to show evidence of applying them through structured process, clear artifacts, measurable results, and documented lessons."
            </p>
          </div>

          {/* Academic Foundation */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <BookOpen size={22} style={{ color: 'var(--accent-primary)' }} />
              <span>Academic Foundation</span>
            </h2>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <h3 style={{ fontSize: '1.2rem' }}>{PERSONAL_PROFILE.education.degree}</h3>
                <span className="badge badge-blue">{PERSONAL_PROFILE.education.status}</span>
              </div>
              <div style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                {PERSONAL_PROFILE.education.institution} • {PERSONAL_PROFILE.education.location}
              </div>
              <p style={{ fontSize: '0.925rem' }}>
                The BIM program combines information technology, software management, data analysis, and business administration, providing a strong contextual foundation for enterprise GRC governance.
              </p>
            </div>
          </div>

          {/* Experience & Mentorship */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Shield size={22} style={{ color: 'var(--accent-primary)' }} />
              <span>Practical Experience & Mentorship</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {PERSONAL_PROFILE.experience.map((exp, idx) => (
                <div key={idx} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem' }}>{exp.role}</h3>
                    <span className="badge badge-indigo">{exp.type}</span>
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                    {exp.organization} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  <p style={{ fontSize: '0.925rem', marginBottom: '1rem' }}>
                    {exp.description}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--accent-primary)' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Practice */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Award size={22} style={{ color: 'var(--accent-primary)' }} />
              <span>Hands-on Technical Practice</span>
            </h2>

            <div className="grid-2">
              <div className="card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>TryHackMe Learning Path</h3>
                <span className="badge badge-emerald" style={{ marginBottom: '0.75rem' }}>40+ Rooms Completed</span>
                <p style={{ fontSize: '0.875rem' }}>
                  Completed over 40 structured learning rooms focused on network fundamentals, Linux privilege escalation, web application vulnerabilities, and incident investigation.
                </p>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>DVWA Security Practice</h3>
                <span className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>Controlled Lab Environment</span>
                <p style={{ fontSize: '0.875rem' }}>
                  Conducted manual web security analysis on Damn Vulnerable Web Application to evaluate SQL injection, XSS, and command execution PoCs in isolated settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
