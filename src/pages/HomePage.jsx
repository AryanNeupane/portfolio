import React, { useEffect, useState } from 'react';
import { ArrowRight, Download, ExternalLink, Github } from 'lucide-react';
import { PERSONAL_PROFILE, RESUME_PATH } from '../data/seedData';
import { getProjects, getBlogPosts } from '../services/dataService';

export default function HomePage({ onNavigate }) {
  const [projects, setProjects] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        const [projectData, postData] = await Promise.all([getProjects(), getBlogPosts()]);
        if (cancelled) return;
        setProjects(projectData);
        setPosts(postData);
      } catch (err) {
        console.error('Error loading homepage content:', err);
      }
    }
    loadData();
    return () => {
      cancelled = true;
    };
  }, []);

  const capstone = projects.find((p) => p.isCapstone);
  const selectedWork = projects.filter((p) => !p.isCapstone).slice(0, 3);
  const featuredPosts = [...posts].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))).slice(0, 3);

  const navigate = (path) => (event) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <div className="home-page">
      {/* 1 — Hero */}
      <section className="hero-section">
        <div className="container">
          <p className="hero-eyebrow">Cybersecurity &amp; GRC</p>
          <h1 className="hero-title">Aryan Neupane</h1>
          <p className="hero-subtitle">Early-career GRC analyst — ISO/IEC 27001:2022 &amp; NIST CSF 2.0</p>
          <p className="hero-statement">{PERSONAL_PROFILE.positioning}</p>

          <div className="hero-actions">
            <a href="/portfolio" className="btn btn-accent" onClick={navigate('/portfolio')}>
              <span>View my work</span>
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Download size={16} aria-hidden="true" />
              <span>Download resume</span>
            </a>
            <a
              href={PERSONAL_PROFILE.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              <Github size={16} aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>

          <p className="hero-meta">{PERSONAL_PROFILE.location} · open to remote cybersecurity &amp; GRC roles</p>
        </div>
      </section>

      {/* 2 — Featured capstone */}
      {capstone && (
        <section className="section section-divider section-alt">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Flagship case study</p>
                <h2>{capstone.title}</h2>
              </div>
              <span className="badge badge-amber">Simulated capstone</span>
            </div>

            <div className="summary-columns">
              <div>
                <p className="page-lead" style={{ marginTop: 0 }}>
                  {capstone.summary}
                </p>
                <a href={`/portfolio/${capstone.slug}`} className="btn btn-accent" onClick={navigate(`/portfolio/${capstone.slug}`)}>
                  <span>Read the case study</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>

              <dl className="definition-grid">
                <div>
                  <dt>Frameworks</dt>
                  <dd>{capstone.frameworks?.slice(0, 2).join(' · ')}</dd>
                </div>
                <div>
                  <dt>Artifacts</dt>
                  <dd>{capstone.deliverables?.length} documented deliverables</dd>
                </div>
                <div>
                  <dt>Lifecycle</dt>
                  <dd>Scope → risk → controls → assessment → treatment → evidence → improvement</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      )}

      {/* 3 — Selected work */}
      {selectedWork.length > 0 && (
        <section className="section section-divider">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>Other projects</h2>
              </div>
              <a href="/portfolio" className="btn btn-outline btn-sm" onClick={navigate('/portfolio')}>
                <span>All projects</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="work-list">
              {selectedWork.map((project) => (
                <a
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="work-item"
                  onClick={navigate(`/portfolio/${project.slug}`)}
                >
                  <div className="work-item-meta">
                    <span>{project.category}</span>
                    <span>{project.createdAt}</span>
                  </div>
                  <h3 className="work-item-title">{project.title}</h3>
                  <p className="work-item-summary">{project.summary}</p>
                  <div className="tag-row">
                    {project.technologies?.slice(0, 5).map((tech) => (
                      <span key={tech} className="badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4 — Professional summary */}
      <section className="section section-divider section-alt">
        <div className="container">
          <div className="summary-columns">
            <div>
              <p className="eyebrow">Professional summary</p>
              <h2 style={{ marginBottom: '1.25rem' }}>Governance work grounded in technical practice</h2>
              <p className="page-lead" style={{ marginTop: 0 }}>
                {PERSONAL_PROFILE.bio}
              </p>
              <a href="/about" className="btn btn-outline" onClick={navigate('/about')}>
                <span>About &amp; background</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <dl className="definition-grid">
              <div>
                <dt>Education</dt>
                <dd>
                  {PERSONAL_PROFILE.education.degree}
                  <br />
                  {PERSONAL_PROFILE.education.institution}
                  <br />
                  {PERSONAL_PROFILE.education.status}
                </dd>
              </div>
              <div>
                <dt>Most recent</dt>
                <dd>
                  {PERSONAL_PROFILE.experience[0].role}
                  <br />
                  {PERSONAL_PROFILE.experience[0].organization}
                  <br />
                  {PERSONAL_PROFILE.experience[0].period}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* 5 — Focus areas */}
      <section className="section section-divider">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Focus</p>
              <h2>Cybersecurity &amp; GRC capabilities</h2>
            </div>
          </div>

          <div className="focus-grid">
            {PERSONAL_PROFILE.technicalSkills.map((group) => (
              <div key={group.category} className="focus-block">
                <h3>{group.category}</h3>
                <ul className="tick-list">
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Progression */}
      <section className="section section-divider section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Progression</p>
              <h2>How the work developed</h2>
              <p>Learning and practice, presented as development rather than employment history.</p>
            </div>
          </div>

          <div className="progression-track">
            {PERSONAL_PROFILE.progression.map((item) => (
              <div key={item.step} className="progression-step">
                <div className="progression-marker" aria-hidden="true">
                  {item.step}
                </div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 — Certifications */}
      <section className="section section-divider">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Certifications &amp; training</p>
              <h2>Stated at official status</h2>
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
        </div>
      </section>

      {/* 8 — Technical foundation */}
      <section className="section section-divider section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Technical foundation</p>
              <h2>Hands-on practice</h2>
              <p>Controlled lab work and documented write-ups. None of this is professional engagement work.</p>
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
        </div>
      </section>

      {/* 9 — Writing */}
      {featuredPosts.length > 0 && (
        <section className="section section-divider">
          <div className="container">
            <div className="section-head">
              <div>
                <p className="eyebrow">Writing</p>
                <h2>Notes on frameworks and practice</h2>
              </div>
              <a href="/blog" className="btn btn-outline btn-sm" onClick={navigate('/blog')}>
                <span>All posts</span>
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>

            <div className="post-list">
              {featuredPosts.map((post) => (
                <a key={post.id} href={`/blog/${post.slug}`} className="post-item" onClick={navigate(`/blog/${post.slug}`)}>
                  <div className="post-item-meta">
                    <span>{post.category}</span>
                    <span>{post.publishedAt}</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="post-item-title">{post.title}</h3>
                  <p>{post.excerpt}</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10 — Evidence / contact */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Open to junior GRC and cybersecurity roles</h2>
              <p>
                Every project on this site links to its source repository — the documentation is the evidence. Happy to
                talk through any of it.
              </p>
            </div>
            <div className="hero-actions" style={{ marginBottom: 0 }}>
              <a href="/contact" className="btn btn-accent" onClick={navigate('/contact')}>
                <span>Get in touch</span>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a
                href={PERSONAL_PROFILE.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <Github size={16} aria-hidden="true" />
                <span>Repositories</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
