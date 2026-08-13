import React from 'react';
import { Shield, Mail, Github, Linkedin, ExternalLink, Download } from 'lucide-react';
import { PERSONAL_PROFILE } from '../data/seedData';

export default function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              <Shield size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Aryan Neupane</span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Cybersecurity & Governance, Risk & Compliance (GRC) Portfolio. Practical security governance, risk assessment, and ISO 27001 / NIST CSF 2.0 implementation evidence.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Navigation</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              {['About', 'Portfolio', 'Blog', 'Contact'].map((item) => {
                const path = `/${item.toLowerCase()}`;
                return (
                  <li key={item}>
                    <a
                      href={path}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(path);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
              <li>
                <a 
                  href="/resume/Aryan-Neupane-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  <Download size={12} />
                  <span>Resume (PDF)</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.9rem', marginBottom: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'var(--font-mono)' }}>Verified Channels</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem' }}>
              <li>
                <a href={`mailto:${PERSONAL_PROFILE.emails[0]}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                  <Mail size={13} />
                  <span>{PERSONAL_PROFILE.emails[0]}</span>
                </a>
              </li>
              <li>
                <a href={PERSONAL_PROFILE.socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                  <Github size={13} />
                  <span>GitHub Repository</span>
                  <ExternalLink size={10} />
                </a>
              </li>
              <li>
                <a href={PERSONAL_PROFILE.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                  <Linkedin size={13} />
                  <span>LinkedIn Profile</span>
                  <ExternalLink size={10} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-content" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <div>
            &copy; {new Date().getFullYear()} Aryan Neupane. All rights reserved.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Cybersecurity & GRC Portfolio Platform • ISO 27001 & NIST CSF 2.0 Aligned
          </div>
        </div>
      </div>
    </footer>
  );
}
