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
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <BookOpen size={24} style={{ color: 'var(--accent-primary)' }} />
              <span>Academic Foundation</span>
            </h2>
            <div style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderLeft: '3px solid var(--accent-primary)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.3rem', letterSpacing: '-0.02em' }}>{PERSONAL_PROFILE.education.degree}</h3>
                <span className="badge badge-blue">{PERSONAL_PROFILE.education.status}</span>
              </div>
              <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                {PERSONAL_PROFILE.education.institution} • {PERSONAL_PROFILE.education.location}
              </div>
              <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                The BIM program combines information technology, software management, data analysis, and business administration, providing a strong contextual foundation for enterprise GRC governance.
              </p>
            </div>
          </div>

          {/* Experience & Mentorship */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <Shield size={24} style={{ color: 'var(--accent-primary)' }} />
              <span>Practical Experience & Mentorship</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {PERSONAL_PROFILE.experience.map((exp, idx) => (
                <div key={idx} style={{ padding: '1.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.3rem', letterSpacing: '-0.02em' }}>{exp.role}</h3>
                    <span className="badge badge-indigo">{exp.type}</span>
                  </div>
                  <div style={{ fontSize: '1rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                    {exp.organization} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    {exp.description}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {exp.highlights.map((item, hIdx) => (
                      <li key={hIdx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--accent-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Practice */}
          <div style={{ marginBottom: '4rem' }}>
            <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <Award size={24} style={{ color: 'var(--accent-primary)' }} />
              <span>Hands-on Technical Practice</span>
            </h2>

            <div className="grid-2">
              <div style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>TryHackMe Learning Path</h3>
                <span className="badge badge-emerald" style={{ marginBottom: '1rem' }}>40+ Rooms Completed</span>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
                  Completed over 40 structured learning rooms focused on network fundamentals, Linux privilege escalation, web application vulnerabilities, and incident investigation.
                </p>
              </div>

              <div style={{ padding: '1.5rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>DVWA Security Practice</h3>
                <span className="badge badge-blue" style={{ marginBottom: '1rem' }}>Controlled Lab Environment</span>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
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
