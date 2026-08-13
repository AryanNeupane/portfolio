import React from 'react';
import { ArrowRight, Download, ExternalLink } from 'lucide-react';
import { PERSONAL_PROFILE, RESUME_PATH } from '../data/seedData';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="about-page section">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">About</p>
          <h1>Aryan Neupane</h1>
          <p className="page-lead">{PERSONAL_PROFILE.bio}</p>

          <div className="hero-actions" style={{ marginTop: '2rem', marginBottom: 0 }}>
            <a
              href="/contact"
              className="btn btn-accent"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/contact');
              }}
            >
              <span>Get in touch</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Download size={16} aria-hidden="true" />
              <span>Download resume (PDF)</span>
            </a>
          </div>
        </header>

        <section className="section-divider" style={{ paddingBottom: '3rem', marginBottom: '3rem' }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">Experience</p>
              <h2>Practical experience &amp; mentorship</h2>
            </div>
          </div>

          <div className="work-list">
            {PERSONAL_PROFILE.experience.map((exp) => (
              <article key={exp.role} className="work-item">
                <div className="work-item-meta">
                  <span>{exp.period}</span>
                  <span>{exp.type}</span>
                  {exp.location && <span>{exp.location}</span>}
                </div>
                <h3 className="work-item-title">
                  {exp.role} — {exp.organization}
                </h3>
                <p className="work-item-summary">{exp.description}</p>
                <ul className="tick-list">
                  {exp.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {exp.mentor && (
                  <p className="hero-meta" style={{ marginTop: '1rem' }}>
                    {exp.mentor}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section-divider" style={{ paddingBottom: '3rem', marginBottom: '3rem' }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">Education</p>
              <h2>Academic foundation</h2>
            </div>
          </div>

          <dl className="definition-grid">
            <div>
              <dt>Degree</dt>
              <dd>{PERSONAL_PROFILE.education.degree}</dd>
            </div>
            <div>
              <dt>Institution</dt>
              <dd>{PERSONAL_PROFILE.education.institution}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{PERSONAL_PROFILE.education.status}</dd>
            </div>
          </dl>
        </section>

        <section className="section-divider" style={{ paddingBottom: '3rem', marginBottom: '3rem' }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">Certifications &amp; training</p>
              <h2>Current status</h2>
            </div>
          </div>

          <div className="cert-list">
            {PERSONAL_PROFILE.certifications.map((cert) => (
              <div key={cert.id} className="cert-item">
                <h3>{cert.title}</h3>
                <p className="cert-issuer">
                  {cert.issuer} · {cert.status}
                </p>
                <p>{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="section-head">
            <div>
              <p className="eyebrow">Hands-on practice</p>
              <h2>Labs and documented write-ups</h2>
              <p>Learning environments and permitted targets — not professional engagements.</p>
            </div>
          </div>

          <div className="practice-grid">
            {PERSONAL_PROFILE.practice.map((item) => (
              <div key={item.title} className="card">
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <span className="badge badge-emerald" style={{ marginBottom: '0.85rem' }}>
                  {item.badge}
                </span>
                <p style={{ fontSize: '0.9rem' }}>{item.description}</p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-inline"
                  style={{ fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginTop: '1rem' }}
                >
                  <span>Evidence</span>
                  <ExternalLink size={12} aria-hidden="true" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
