import React, { useState, useEffect } from 'react';
import { Shield, ChevronRight, Filter, Search, Award } from 'lucide-react';
import { getProjects, getCertifications } from '../services/dataService';

export default function PortfolioPage({ onNavigate }) {
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projData, certData] = await Promise.all([
          getProjects(),
          getCertifications()
        ]);
        setProjects(projData);
        setCertifications(certData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const categories = ['All', 'GRC', 'SOC', 'Vulnerability'];

  const filteredProjects = projects.filter(p => {
    if (selectedCategory === 'All') return true;
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <div className="portfolio-page section">
      <div className="container">
        <div style={{ maxWidth: '850px', marginBottom: '3rem' }}>
          <div className="badge badge-blue" style={{ marginBottom: '1rem' }}>Security Portfolio</div>
          <h1 style={{ marginBottom: '1rem' }}>Projects & GRC Deliverables</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Demonstrating hands-on cybersecurity capabilities, governance framework implementations, and practical risk assessment deliverables.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${selectedCategory === cat ? 'btn-accent' : 'btn-outline'}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'All' ? 'All Projects' : `${cat} Focus`}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              style={{ 
                borderTop: `2px solid ${project.isCapstone ? 'var(--accent-amber)' : 'var(--border-color)'}`,
                background: project.isCapstone ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                padding: '2rem 0'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                    {project.isCapstone && <span className="badge badge-amber">Enterprise Capstone</span>}
                    <span className="badge badge-indigo">{project.category}</span>
                  </div>
                  <h2 style={{ fontSize: '1.75rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>{project.title}</h2>
                </div>

                <button 
                  className="btn btn-sm btn-accent"
                  onClick={() => onNavigate(`/portfolio/${project.slug}`)}
                >
                  <span>Inspect Artifacts</span>
                  <ChevronRight size={16} />
                </button>
              </div>

              <p style={{ marginBottom: '2rem', fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '900px', lineHeight: '1.7' }}>
                {project.summary}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', marginBottom: '2rem', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Frameworks Aligned</span>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600', marginTop: '0.3rem' }}>
                    {project.frameworks ? project.frameworks.join(' • ') : 'N/A'}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Key Deliverables</span>
                  <div style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600', marginTop: '0.3rem' }}>
                    {project.deliverables ? `${project.deliverables.length} Documented Artifacts` : 'Standard Technical Documentation'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {project.technologies?.map((tech, tIdx) => (
                    <span key={tIdx} className="badge">{tech}</span>
                  ))}
                </div>

                <button 
                  style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.95rem' }}
                  onClick={() => onNavigate(`/portfolio/${project.slug}`)}
                >
                  <span>View Project Details & Artifacts</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div style={{ marginTop: '5rem', marginBottom: '2rem' }}>
          <div className="badge badge-emerald" style={{ marginBottom: '1rem' }}>Credentials</div>
          <h2 style={{ marginBottom: '1rem' }}>Professional Certifications</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Verified technical learning paths and professional compliance foundations.
          </p>

          <div className="grid-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <Award size={24} style={{ color: 'var(--accent-primary)' }} />
                  <span className="badge badge-emerald">Verified</span>
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{cert.title}</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
                  {cert.issuer} • {cert.issued}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                  {cert.skills?.map((skill, sIdx) => (
                    <span key={sIdx} className="badge">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
